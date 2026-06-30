"use server";

import Col from "@/components/Col";
import Row from "@/components/Row";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { ReactNode } from "react";
import ControlBarButton from "./ControlBarButton";
import { ArrowUpTrayIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { PermissionLevels } from "@/_Enums/PermissionLevels";

export default async function TeamCollectionsLayout({ children }: { children: ReactNode }) {
    const { data: currentUser } = await signinValidation();

    return (
        <Col className="w-full h-full overflow-y-auto">
            <Col className="w-full p-2">
                <InfoPageTitle textContent="COUGAR Collections" />

                <Row className="w-full">
                    {
                        (currentUser && currentUser.perm_level < PermissionLevels.LEAD_MOD) &&
                        <ControlBarButton href="/dashboard/team-collections/upload">
                            <ArrowUpTrayIcon className="w-3 aspect-square text-primary-1" />
                            <p className="text-2xs sm:text-xs md:text-md text-primary-1">Create Collection</p>
                        </ControlBarButton>
                    }

                    <ControlBarButton href="/dashboard/team-collections/">
                        <VideoCameraIcon className="w-3 aspect-square text-primary-1" />
                        <p className="text-2xs sm:text-xstext-xs md:text-md text-primary-1">View Our Collections</p>
                    </ControlBarButton>
                </Row>
            </Col>

            <Col className="w-full">
                {children}
            </Col>
        </Col>
    );
}