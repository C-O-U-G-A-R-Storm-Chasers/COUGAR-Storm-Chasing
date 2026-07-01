"use server";

import Row from "@/components/Row";
import StatisticsCard from "../StatisticsCard";
import Col from "@/components/Col";
import { countUsers } from "@/lib/database/statistics/users/countUsers";
import { fetchTopFiveOldestUsers } from "@/lib/database/statistics/users/fetchTopFiveOldestUsers";
import StatisticsCardSectionLabel from "../StatisticsCardSectionLabel";
import Link from "next/link";
import { fetchTopFiveNewestUsers } from "@/lib/database/statistics/users/fetchTopFiveNewestUsers";
import StatisticsCardNumberBlock from "../StatisticsCardNumberBlock";

export default async function UserStats() {
    const userCount = await countUsers();
    const topFiveOldestUsers = await fetchTopFiveOldestUsers();
    const topFiveNewestUsers = await fetchTopFiveNewestUsers();

    return (
        <StatisticsCard title="Users">
            <Row className="w-full flex-wrap gap-1">
                <StatisticsCardNumberBlock
                    count={userCount}
                    label="users"
                />
            </Row>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Oldest Accounts" />
                {
                    (topFiveOldestUsers.length > 0) ?
                    topFiveOldestUsers.map(user => (
                        <Link
                            key={user.uid}
                            href={`/dashboard/account/${user.uid}`}
                            className="text-xs hover:underline"
                        >
                            {user.username}
                        </Link>
                    ))
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Newest Accounts" />
                {
                    (topFiveNewestUsers.length > 0) ?
                    topFiveNewestUsers.map(user => (
                        <Link
                            key={user.uid}
                            href={`/dashboard/account/${user.uid}`}
                            className="text-xs hover:underline"
                        >
                            {user.username}
                        </Link>
                    ))
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>
        </StatisticsCard>
    );
}