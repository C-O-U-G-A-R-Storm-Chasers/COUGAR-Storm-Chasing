"use server";

import Row from "@/components/Row";
import StatisticsCard from "../StatisticsCard";
import Col from "@/components/Col";
import StatisticsCardSectionLabel from "../StatisticsCardSectionLabel";
import Link from "next/link";
import StatisticsCardNumberBlock from "../StatisticsCardNumberBlock";
import { countPosts } from "@/lib/database/statistics/posts/countPosts";
import { countMediaFiles } from "@/lib/database/statistics/posts/countMediaFiles";
import { fetchTopFivePostsByFileCount } from "@/lib/database/statistics/posts/fetchTopFivePostsByFileCount";
import { fetchTopFiveMostRecentPosts } from "@/lib/database/statistics/posts/fetchTopFiveMostRecentCollections";

export default async function TeamCollectionStats() {
    const postsCount = await countPosts();
    const mediaFilesCount = await countMediaFiles();
    const topFiveMostRecentPosts = await fetchTopFiveMostRecentPosts();
    const topFivePostsByFileCount = await fetchTopFivePostsByFileCount();

    return (
        <StatisticsCard title="Posts">
            <Row className="w-full flex-wrap gap-1">
                <StatisticsCardNumberBlock
                    count={postsCount}
                    label="posts"
                />
                <StatisticsCardNumberBlock
                    count={mediaFilesCount}
                    label="media"
                />
            </Row>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Most Recent Posts" />
                {
                    (topFiveMostRecentPosts.length > 0) ?
                    topFiveMostRecentPosts.map(post => (
                        <Link
                            key={post.id}
                            href={`/dashboard/posts/${post.id}`}
                            className="text-xs hover:underline"
                        >
                            {`${post.body.slice(0, 16)}...`}
                        </Link>
                    ))
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>

            <Col className="w-full p-1 bg-neutral-700 rounded-sm gap-1">
                <StatisticsCardSectionLabel label="Top Posts by Media Count" />
                {
                    (topFivePostsByFileCount.length > 0) ?
                    topFivePostsByFileCount.map(post => (
                        <Link
                            key={post.id}
                            href={`/dashboard/posts/${post.id}`}
                            className="text-xs hover:underline"
                        >
                            {`${post.body.slice(0, 16)}...`}
                        </Link>
                    ))
                    :
                    <p className="text-xs">Nothing to show</p>
                }
            </Col>
        </StatisticsCard>
    );
}