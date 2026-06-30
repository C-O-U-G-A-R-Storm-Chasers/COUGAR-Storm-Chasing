"use client";

import Col from "@/components/Col";
import { ArrowUpTrayIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { User } from "@/_Interfaces/Users/User";
import { PermissionLevels } from "@/_Enums/PermissionLevels";
import CollectionsPageSidebarButtonStandard from "./CollectionsPageSidebarButtonStandard";
import CollectionsPageSidebarSection from "./CollectionsPageSidebarSection";

export default function CollectionsPageSidebar({ user }: { user: User | null }) {
    return (
        <Col
            className="
                min-w-[130px]
                items-center
                p-0
                pr-1

                gap-2
            "
        >
            {
                (user && user.perm_level <= PermissionLevels.LEAD_MOD) &&
                <CollectionsPageSidebarSection label="Admin Controls">
                    <CollectionsPageSidebarButtonStandard href="/dashboard/team-collections/upload">
                        <ArrowUpTrayIcon className="w-3 aspect-square text-primary-1" />
                        <p className="text-2xs md:text-xs text-primary-1">Create Collection</p>
                    </CollectionsPageSidebarButtonStandard>
                </CollectionsPageSidebarSection>
            }
            <CollectionsPageSidebarSection label="C.O.U.G.A.R.">
                <CollectionsPageSidebarButtonStandard href="/dashboard/team-collections/">
                    <VideoCameraIcon className="w-3 aspect-square text-primary-1" />
                    <p className="text-2xs md:text-xs text-primary-1">View Our Collections</p>
                </CollectionsPageSidebarButtonStandard>
            </CollectionsPageSidebarSection>
        </Col>
    );
}