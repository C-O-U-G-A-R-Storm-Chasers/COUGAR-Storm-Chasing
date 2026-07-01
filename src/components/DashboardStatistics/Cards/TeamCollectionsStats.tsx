"use server";

import Row from "@/components/Row";
import StatisticsCard from "../StatisticsCard";
import Col from "@/components/Col";
import { countTeamCollections } from "@/lib/database/statistics/team-collections/countTeamCollections";
import { countTeamCollectionFiles } from "@/lib/database/statistics/team-collections/countTeamCollectionFiles";
import { fetchTopFiveCollectionsByFileCount } from "@/lib/database/statistics/team-collections/fetchTopFiveCollectionsByFileCount";
import { fetchTopFiveMostRecentCollections } from "@/lib/database/statistics/team-collections/fetchTopFiveMostRecentCollections";
import StatisticsCardSectionLabel from "../StatisticsCardSectionLabel";
import Link from "next/link";
import StatisticsCardNumberBlock from "../StatisticsCardNumberBlock";

export default async function TeamCollectionStats() {
    const teamCollectionsCount = await countTeamCollections();
    const teamCollectionFilesCount = await countTeamCollectionFiles();
    const topFiveCollectionsByFileCount = await fetchTopFiveCollectionsByFileCount();
    const topFiveMostRecentCollections = await fetchTopFiveMostRecentCollections();

    return (
        <StatisticsCard title="Collections">
            <Row className="w-full flex-wrap gap-1">
                <StatisticsCardNumberBlock
                    count={teamCollectionsCount}
                    label="collections"
                />
                <StatisticsCardNumberBlock
                    count={teamCollectionFilesCount}
                    label="media"
                />
            </Row>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Most Recent Collections" />
                {
                    (topFiveMostRecentCollections.length > 0) ?
                    topFiveMostRecentCollections.map(collection => (
                        <Link
                            key={collection.id}
                            href={`/dashboard/team-collections/${collection.id}`}
                            className="text-xs hover:underline"
                        >
                            {collection.title}
                        </Link>
                    ))
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Top Collections by Media Count" />
                {
                    (topFiveCollectionsByFileCount.length > 0) ?
                    topFiveCollectionsByFileCount.map(collection => (
                        <Link
                            key={collection.id}
                            href={`/dashboard/team-collections/${collection.id}`}
                            className="text-xs hover:underline"
                        >
                            {collection.title}
                        </Link>
                    ))
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>
        </StatisticsCard>
    );
}