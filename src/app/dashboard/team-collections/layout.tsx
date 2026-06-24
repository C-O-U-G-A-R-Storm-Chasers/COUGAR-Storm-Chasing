"use client";

import Col from "@/components/Col";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import { ReactNode, useEffect, useState } from "react";
import Row from "@/components/Row";
import Cookies from "js-cookie";
import { User } from "@/_Interfaces/Users/User";
import CollectionsPageSidebar from "./Sidebar/CollectionsPageSidebar";

export default function MediaDashboardLayout({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userRaw = Cookies.get("user");

        setUser(userRaw ? JSON.parse(userRaw) : null);
    }, []);

    return (
        <Col
            className="
                w-full
                items-start
                p-2
                
                gap-2
            "
        >
            <InfoPageTitle textContent="COUGAR Collections" />

            <Row className="w-full">
                <CollectionsPageSidebar user={user} />

                {children}
            </Row>
        </Col>
    );
}