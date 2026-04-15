"use client";

import Image from "next/image";
import Row from "../Row";
import NavbarSection from "./NavbarSection";
import NavbarButtonStandard from "./NavbarButtonStandard";
import { PresentationChartLineIcon, UserGroupIcon, VideoCameraIcon } from "@heroicons/react/24/solid";

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
                <Row id="navbar-home-icon">
                    <Image
                        src=""
                        alt="Navbar Home Icon for COUGAR Storm Chasing"
                        width={512}
                        height={512}
                        className="w-10 h-10 bg-slate-200 rounded-md"
                    />
                </Row>
                
                <p className="text-xl font-semibold">C.O.U.G.A.R. Storm Chasers</p>
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
            </NavbarSection>
        </Row>
    );
}