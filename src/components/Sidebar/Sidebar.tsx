"use client";

import { BookmarkIcon, HomeIcon, PresentationChartLineIcon, UserGroupIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Col from "../Col";
import SidebarButtonStandard from "../Sidebar/SidebarButtonStandard";
import SidebarSection from "./SidebarSection";

export default function Sidebar() {
    return (
        <Col
            className="
                w-1/6
                items-center
                p-1
                px-2
                
                bg-neutral-900

                border-r-1
                border-neutral-500

                gap-2
            "
        >
            <SidebarSection label="C.O.U.G.A.R.">
                <SidebarButtonStandard href="/dashboard">
                    <HomeIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-xs text-primary-1">Home</p>
                </SidebarButtonStandard>

                <SidebarButtonStandard href="/team">
                    <UserGroupIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-xs text-primary-1">Our Team</p>
                </SidebarButtonStandard>

                <SidebarButtonStandard href="/dashboard/outlooks">
                    <PresentationChartLineIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-xs text-primary-1">Current Outlooks</p>
                </SidebarButtonStandard>

                <SidebarButtonStandard href="/dashboard/chases">
                    <BookmarkIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-xs text-primary-1">Upcoming Chases</p>
                </SidebarButtonStandard>

                <SidebarButtonStandard href="/dashboard/media">
                    <VideoCameraIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-xs text-primary-1">Our Media</p>
                </SidebarButtonStandard>
            </SidebarSection>

            <SidebarSection label="My Stuff">

            </SidebarSection>
        </Col>
    );
}