"use client";

import Image from "next/image";
import Row from "../Row";
import NavbarSection from "./NavbarSection";
import NavbarButtonStandard from "./NavbarButtonStandard";
import { ArrowRightEndOnRectangleIcon, BookmarkIcon, PresentationChartLineIcon, UserGroupIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import config from "../../lib/cougar-config.json";

export default function Navbar() {
    return (
        <Row
            id="navbar-wrapper"
            className="
                w-full
                justify-between
                items-center
                p-1
                px-3

                bg-sky-900
                text-slate-50

                gap-2
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
                            className="w-10 h-10 bg-slate-200 rounded-md"
                        />
                    </Row>
                    
                    <p className="text-xl font-semibold">C.O.U.G.A.R. Storm Chasers</p>
                </Link>
            </NavbarSection>

            <NavbarSection>
                <NavbarButtonStandard href="/outlooks">
                    <PresentationChartLineIcon className="w-5 h-5" />
                    <p className="text-xs font-semibold">Current Outlooks</p>
                </NavbarButtonStandard>

                <NavbarButtonStandard href="/chases">
                    <VideoCameraIcon className="w-5 h-5" />
                    <p className="text-xs font-semibold">Our Media</p>
                </NavbarButtonStandard>

                <NavbarButtonStandard href="/team">
                    <UserGroupIcon className="w-5 h-5" />
                    <p className="text-xs font-semibold">Our Team</p>
                </NavbarButtonStandard>

                <NavbarButtonStandard href="/scheduled-chases">
                    <BookmarkIcon className="w-5 h-5" />
                    <p className="text-xs font-semibold">Upcoming Chases</p>
                </NavbarButtonStandard>
            </NavbarSection>

            <NavbarSection>
                <NavbarButtonStandard href="/account/signin">
                    <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                    <p className="text-xs font-semibold">Existing Member? Sign in</p>
                </NavbarButtonStandard>
            </NavbarSection>
        </Row>
    );
}