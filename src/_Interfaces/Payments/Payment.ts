import { UUID } from "crypto";

export interface Payment {
    internalID: UUID,
    stripeSessionID: string,
    userID: string | UUID | null,
    timestamp: number,
    updateTimestamp?: number,
    paymentType: string | "donation" | "tour" | undefined,
    amountUSCents: number | null
}