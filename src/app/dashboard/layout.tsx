import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode } from "react";
import Row from "@/components/Row";
import Col from "@/components/Col";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Row className="w-full min-h-screen">
            <Sidebar />
            
            <Col className="w-full text-primary-1 textured-background-1">
                {children}
            </Col>
        </Row>
    );
}