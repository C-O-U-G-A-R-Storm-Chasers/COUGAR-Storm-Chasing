"use server";

import { StripeResponseCodes } from "@/_Enums/Stripe/StripeResponseCodes";
import { UUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { unixToDate } from "@/lib/utils/unixToDate";
import { insertPayment } from "@/lib/database/payments/insertPayment";
import { Payment } from "@/_Interfaces/Payments/Payment";
import { safeUUID } from "@/lib/crypto/crypto";

/**
 * This webook catches data from Stripe Checkouts from the Stripe Dashboard, when they're made.
 */
export async function POST(request: NextRequest) {
    if (!process.env.STRIPE_KEY) {
        console.error("Missing process.env.STRIPE_KEY");

        return NextResponse.json(
            { statusText: "Error: Missing process.env.STRIPE_KEY" },
            { status: StripeResponseCodes.BAD_REQ }
        );
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.error("Missing process.env.STRIPE_WEBHOOK_SECRET");

        return NextResponse.json(
            { statusText: "Error: Missing process.env.STRIPE_WEBHOOK_SECRET" },
            { status: StripeResponseCodes.BAD_REQ }
        );
    }

    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig) {
        console.error("Missing stripe-signature header");

        return NextResponse.json(
            { statusText: "Missing stripe-signature header" },
            { status: StripeResponseCodes.BAD_REQ }
        );
    }

    // Handle the event
    try {
        const event: Stripe.Event = Stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                // Extract the goodies we passed in during Step 1
                const userID = session.client_reference_id; // Your DB User ID
                const amountUSCents = session.amount_total; // e.g., 5000 ($50.00)
                const timestamp = session.created * 1000; // Stripe uses Unix timestamps (seconds), JS uses milliseconds
                const paymentType = session.metadata?.payment_type; // "donation" or "tour"

                if (process.env.NODE_ENV === "development") {
                    console.log("Payment Succeeded for User:", userID);

                    console.log({
                        amount: `$${(amountUSCents || 0) / 100}`,
                        type: paymentType,
                        timestamp: `${timestamp} (${unixToDate(timestamp)})`
                    });
                }

                // Insert payment into database
                const payment: Payment = {
                    internalID: safeUUID() as UUID,
                    stripeSessionID: session.id,
                    userID: userID,
                    timestamp,
                    paymentType,
                    amountUSCents: amountUSCents
                };

                const insertPaymentResult = await insertPayment(payment);

                if (!insertPaymentResult) console.warn("Warning: Could not insert payment into database!");

                break;
            }
            default: console.log("Unhandled event type:", event.type);
        }
    } catch (error: any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
        console.error(`Webhook Signature Verification Failed: ${error.message}`);

        NextResponse.json(
            { statusText: `Webhook Error: ${error.message}` },
            { status: StripeResponseCodes.BAD_REQ }
        );
    }

    return NextResponse.json(
        { received: true },
        { status: StripeResponseCodes.OK }
    );
}