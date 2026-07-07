"use server";

import { StripeResponseCodes } from "@/_Enums/Stripe/StripeResponseCodes";
import { UUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import config from "../../../../lib/cougar-config.json";
import { USDToCents } from "@/lib/utils/USDToCents";

export interface APICheckoutSessionData {
  url?: string | null,
  statusText?: string,
  status?: StripeResponseCodes
}

/**
 * Create a Stripe Checkout and let Stripe do all of the heavy lifting.
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
        const userID = data.get("user") as string | UUID;
        const paymentType = data.get("payment-type") as string; // "donation" or "tour"
        const amountRaw = data.get("amount-usd") as string;
        const amountUSCents = USDToCents(amountRaw);

        // Create payment intent
        const stripe = new Stripe(process.env.STRIPE_KEY);
        const baseURL = process.env.NODE_ENV === "development" ? config["dev-hostname"] : config["prod-hostname"];
        const productDataName = paymentType === "donation" ? "Donation to C.O.U.G.A.R. Storm Chasers" : "C.O.U.G.A.R. Storm Chasers Storm Chasing Tour Payment";
        const successURL = `${baseURL}/payments/thanks?session_id={CHECKOUT_SESSION_ID}`;
        const cancelURL = `${baseURL}/dashboard`;

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            client_reference_id: userID,
            metadata: { paymentType: paymentType },
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: productDataName },
                        unit_amount: amountUSCents,
                    },
                    quantity: 1
                }
            ],
            success_url: successURL,
            cancel_url: cancelURL
        });
        
        return NextResponse.json({ 
            status: StripeResponseCodes.OK, 
            url: session.url 
        });
    } catch (error: any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
        console.error("Stripe Error:", error);

        return NextResponse.json(
            { statusText: error.message },
            { status: StripeResponseCodes.BAD_REQ }
        );
    }
}