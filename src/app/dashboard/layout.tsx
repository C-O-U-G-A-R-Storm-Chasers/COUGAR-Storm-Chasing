"use server";

import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode } from "react";
import Row from "@/components/Row";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const { data: currentUser } = await signinValidation();

    return (
        <Row className="w-full min-h-screen overflow-hidden text-primary-1">
            <Sidebar currentUser={currentUser} />
            
            {children}
        </Row>
    );
}