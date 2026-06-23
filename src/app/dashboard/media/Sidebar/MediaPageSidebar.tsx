"use client";

import Col from "@/components/Col";
import { ArrowUpTrayIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import MediaPageSidebarButtonStandard from "./MediaPageSidebarButtonStandard";
import MediaPageSidebarSection from "./MediaPageSidebarSection";
import { User } from "@/_Interfaces/Users/User";
import { PermissionLevels } from "@/_Enums/PermissionLevels";

export default function MediaPageSidebar({ user }: { user: User | null }) {
    return (
        <Col
            className="
                w-1/6
                items-center
                p-1
                pl-0
                pr-2

                gap-2
            "
        >
            {
                (user && user.perm_level <= PermissionLevels.LEAD_MOD) &&
                <MediaPageSidebarSection label="Admin Controls">
                    <MediaPageSidebarButtonStandard href="/dashboard/media/upload">
                        <ArrowUpTrayIcon className="w-5 h-5 text-primary-1" />
                        <p className="text-md text-primary-1">Upload Media</p>
                    </MediaPageSidebarButtonStandard>
                </MediaPageSidebarSection>
            }
            <MediaPageSidebarSection label="C.O.U.G.A.R.">
                <MediaPageSidebarButtonStandard href="/dashboard/media">
                    <VideoCameraIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-md text-primary-1">View Our Media</p>
                </MediaPageSidebarButtonStandard>
            </MediaPageSidebarSection>
        </Col>
    );
}