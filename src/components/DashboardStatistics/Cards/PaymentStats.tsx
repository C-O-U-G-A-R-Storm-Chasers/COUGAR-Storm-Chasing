"use server";

import Row from "@/components/Row";
import StatisticsCard from "../StatisticsCard";
import Col from "@/components/Col";
import StatisticsCardSectionLabel from "../StatisticsCardSectionLabel";
import Link from "next/link";
import StatisticsCardNumberBlock from "../StatisticsCardNumberBlock";
import { countDonations } from "@/lib/database/statistics/payments/countDonations";
import { countTours } from "@/lib/database/statistics/payments/countTours";
import { fetchTotalDonationsUSDCents } from "@/lib/database/statistics/payments/fetchTotalDonationsUSDCents";
import { fetchTotalTourRevenueUSDCents } from "@/lib/database/statistics/payments/fetchTotalTourRevenueUSDCents";
import StatisticsCardStringBlock from "../StatisticsCardStringBlock";
import { USCentsToUSD } from "@/lib/utils/USCentsToUSD";
import { fetchLatestFiveDonations } from "@/lib/database/statistics/payments/fetchLatestFiveDonations";
import { fetchLatestFiveTours } from "@/lib/database/statistics/payments/fetchLatestFiveTours";

export default async function PaymentStats() {
    const donationsCount = await countDonations();
    const toursCount = await countTours();
    const totalDonationsUSDCents = await fetchTotalDonationsUSDCents();
    const totalToursUSDCents = await fetchTotalTourRevenueUSDCents();
    const latestDonations = await fetchLatestFiveDonations();
    const latestTours = await fetchLatestFiveTours();

    return (
        <StatisticsCard title="Donations & Tours">
            <Row className="w-full flex-wrap gap-1">
                <StatisticsCardNumberBlock
                    count={donationsCount}
                    label="donations"
                />

                <StatisticsCardStringBlock
                    string={USCentsToUSD(totalDonationsUSDCents)}
                    label="in donations"
                />

                <StatisticsCardNumberBlock
                    count={toursCount}
                    label="tours"
                />

                <StatisticsCardStringBlock
                    string={USCentsToUSD(totalToursUSDCents)}
                    label="tours revenue"
                />
            </Row>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Most Recent Donators" />
                {
                    (latestDonations.length > 0) ?
                    latestDonations.map(payment => {
                        if (payment.user) return (
                            <Link
                                key={payment.internalID}
                                href={`/dashboard/account/${payment.user.uid}`}
                                className="text-xs hover:underline"
                            >
                                {payment.user.username}
                            </Link>
                        );

                        return <p key={payment.internalID + "-0"} className="text-xs hover:underline">Guest</p>;
                    })
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Most Recent Tour Clients" />
                {
                    (latestTours.length > 0) ?
                    latestTours.map(payment => {
                        if (payment.user) return (
                            <Link
                                key={payment.internalID}
                                href={`/dashboard/account/${payment.user.uid}`}
                                className="text-xs hover:underline"
                            >
                                {payment.user.username}
                            </Link>
                        );

                        return <p key={payment.internalID + "-0"} className="text-xs hover:underline">Guest</p>;
                    })
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>
        </StatisticsCard>
    );
}