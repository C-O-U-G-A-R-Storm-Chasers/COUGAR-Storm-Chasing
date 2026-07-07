"use server";

import { StripeResponseCodes } from "@/_Enums/Stripe/StripeResponseCodes";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Reference: https://docs.stripe.com/api/payment_intents/create
 * 
 * NOTE: Not in use yet. This is here in case we upgrade to fully utilizing the Stripe API later.
 */
export async function POST(request: NextRequest) {
    if (!process.env.STRIPE_KEY) {
        console.error("Missing process.env.STRIPE_KEY");

        return NextResponse.json(
            { statusText: "Error: Missing process.env.STRIPE_KEY" },
            { status: StripeResponseCodes.BAD_REQ }
        );
    }

    try {
        // Get payment info
        const data = await request.formData();
        const amountRaw = data.get("amount-cents") as string;
        const amountUSCents = parseInt(amountRaw);

        // Create payment intent
        const stripe = new Stripe(process.env.STRIPE_KEY);

        const intent = await stripe.paymentIntents.create({
            amount: amountUSCents,
            currency: "USD",
            automatic_payment_methods: { enabled: true }
        });
        
        return NextResponse.json({ clientSecret: intent.client_secret });
    } catch (error: any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
        console.error("Stripe Error:", error);

        return NextResponse.json(
            { statusText: error.message },
            { status: StripeResponseCodes.BAD_REQ }
        );
    }
}