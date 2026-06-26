"use server";

import { BookmarkIcon, HomeIcon, PresentationChartLineIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Col from "../Col";
import SidebarButtonStandard from "../Sidebar/SidebarButtonStandard";
import SidebarSection from "./SidebarSection";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";

export default async function Sidebar() {
    const { data: user } = await signinValidation();

    return (
        <Col
            className="
                w-1/6
                items-center
                p-1
                pl-0
                pr-2
                
                bg-neutral-900

                border-r-1
                border-neutral-500

                gap-2
            "
        >
            <SidebarSection label="C.O.U.G.A.R.">
                <SidebarButtonStandard href="/dashboard">
                    <HomeIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-md text-primary-1">Home</p>
                </SidebarButtonStandard>

                <SidebarButtonStandard href="/dashboard/outlooks">
                    <PresentationChartLineIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-md text-primary-1">Outlooks</p>
                </SidebarButtonStandard>

                <SidebarButtonStandard href="/dashboard/chases">
                    <BookmarkIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-md text-primary-1">Storm Chases</p>
                </SidebarButtonStandard>

                <SidebarButtonStandard href="/dashboard/team-collections">
                    <VideoCameraIcon className="w-5 h-5 text-primary-1" />
                    <p className="text-md text-primary-1">Collections</p>
                </SidebarButtonStandard>
            </SidebarSection>

            {
                user &&
                <SidebarSection label="My Stuff">
                    <SidebarButtonStandard href="/dashboard/account/edit">
                        <UserIcon className="w-5 h-5 text-primary-1" />
                        <p className="text-md text-primary-1">My Profile</p>
                    </SidebarButtonStandard>
                </SidebarSection>
            }
        </Col>
    );
}