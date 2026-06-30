"use client";

import { BookmarkIcon, ChartBarSquareIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, DevicePhoneMobileIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Col from "../Col";
import SidebarButtonStandard from "../Sidebar/SidebarButtonStandard";
import SidebarSection from "./SidebarSection";
import { User } from "@/_Interfaces/Users/User";
import { useEffect, useState } from "react";

export default function Sidebar({ currentUser }: { currentUser: User | null }) {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        setCollapsed(isMobile);
    }, []);

    return (
        <Col
            className={`
                ${
                    collapsed ?
                    "w-auto"
                    :
                    "w-40 md:w-55 lg:w-70"
                }
                flex-shrink-0
                h-full
                
                items-center
                
                bg-neutral-900

                border-r-1
                border-neutral-500

                gap-2
            `}
        >
            <div
                className="
                    flex
                    flex-row
                    justify-end
                    w-full

                    border-b-1
                    border-neutral-500
                "
            >
                {
                    collapsed ?
                    <div
                        title="Expand Sidebar"
                        className="
                            flex
                            flex-row
                            items-center
                            p-1
                            
                            text-primary-1

                            hover:bg-neutral-200/50

                            cursor-pointer
                        "
                        onClick={() => setCollapsed(false)}
                    >
                        <ChevronDoubleRightIcon className="w-5 h-5" />
                    </div>
                    :
                    <div
                        title="Collapse Sidebar"
                        className="
                            flex
                            flex-row
                            items-center
                            p-1
                            
                            text-primary-1

                            hover:bg-neutral-200/50

                            cursor-pointer
                        "
                        onClick={() => setCollapsed(true)}
                    >
                        <ChevronDoubleLeftIcon className="w-3 h-3" />
                        <DevicePhoneMobileIcon className="w-5 h-5" />
                    </div>
                }
            </div>

            {
                !collapsed &&
                <>
                    <SidebarSection label="C.O.U.G.A.R." collapsed={collapsed}>
                        {
                            currentUser &&
                            <>
                                <SidebarButtonStandard href="/dashboard/statistics">
                                    <ChartBarSquareIcon className="w-5 aspect-square text-primary-1" />
                                    <p className="text-xs md:text-md text-primary-1">Statistics</p>
                                </SidebarButtonStandard>

                                <SidebarButtonStandard href="/dashboard/chases">
                                    <BookmarkIcon className="w-5 aspect-square text-primary-1" />
                                    <p className="text-xs md:text-md text-primary-1">Storm Chases</p>
                                </SidebarButtonStandard>
                            </>
                        }

                        <SidebarButtonStandard href="/dashboard/team-collections">
                            <VideoCameraIcon className="w-5 aspect-square text-primary-1" />
                            <p className="text-xs md:text-md text-primary-1">Collections</p>
                        </SidebarButtonStandard>
                    </SidebarSection>

                    {
                        currentUser &&
                        <SidebarSection label="My Stuff" collapsed={collapsed}>
                            <SidebarButtonStandard href="/dashboard/account/edit">
                                <UserIcon className="w-5 aspect-square text-primary-1" />
                                <p className="text-xs md:text-md text-primary-1">My Profile</p>
                            </SidebarButtonStandard>
                        </SidebarSection>
                    }
                </>
            }
        </Col>
    );
}