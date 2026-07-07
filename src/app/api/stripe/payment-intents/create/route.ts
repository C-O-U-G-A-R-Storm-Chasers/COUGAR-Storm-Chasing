"use server";

import { StripeResponseCodes } from "@/_Enums/Stripe/StripeResponseCodes";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Reference: https://docs.stripe.com/api/payment_intents/create
 */
export async function POST(request: NextRequest) {
    if (!process.env.STRIPE_KEY) {
        console.error("Missing process.env.STRIPE_KEY");

        return NextResponse.json({
            status: StripeResponseCodes.SERVER_ERR_00,
            msg: "Error: Missing process.env.STRIPE_KEY"
        });
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

        NextResponse.json({
            status: StripeResponseCodes.BAD_REQ,
            msg: error.message
        });
    }
}