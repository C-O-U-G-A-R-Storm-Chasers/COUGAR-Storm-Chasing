"use server";

import Image from "next/image";
import Row from "../Row";
import NavbarSection from "./NavbarSection";
import NavbarButtonStandard from "./NavbarButtonStandard";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import { ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import config from "../../lib/cougar-config.json";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import UserNavButton from "./UserNavButton";

export default async function Navbar() {
    const { data: user } = await signinValidation();

    return (
        <Row
            id="navbar-wrapper"
            className="
                w-full
                justify-center
                items-center

                bg-primary-11
                text-cyan-400

                border-b-2
                border-cyan-200/50

                gap-2
            "
        >
            <Row
                id="navbar-wrapper"
                className="
                    w-1/2
                    justify-between
                    items-center
                    p-1
                    px-3
                    flex-wrap

                    gap-4
                "
            >
                <NavbarSection>
                    <Link href="/" className="flex flex-row items-center gap-2">
                        <Row id="navbar-home-icon">
                            <Image
                                src={config["navbar-home-icon"]}
                                alt="Navbar Home Icon for COUGAR Storm Chasing"
                                width={512}
                                height={512}
                                className="w-6 h-6 bg-slate-200 rounded-md"
                            />
                        </Row>
                        
                        <p className="text-sm">Cyclone Observation Unit for General Atmospheric Research</p>
                    </Link>
                </NavbarSection>

                <NavbarSection>
                    {
                        user ?
                        <>
                            <UserNavButton user={user} />

                            <NavbarButtonStandard href="/dashboard">
                                <HomeModernIcon className="w-5 h-5 text-primary-1" />
                                <p className="text-xs text-primary-1">Dashboard</p>
                            </NavbarButtonStandard>

                            <NavbarButtonStandard href="/dashboard/account/signout">
                                <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-primary-1" />
                                <p className="text-xs font-semibold text-primary-1">Signout</p>
                            </NavbarButtonStandard>
                        </>
                        :
                        <NavbarButtonStandard href="/dashboard/account/signin">
                            <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-primary-1" />
                            <p className="text-xs">Existing Member? Sign in</p>
                        </NavbarButtonStandard>
                    }
                </NavbarSection>
            </Row>
        </Row>
    );
}