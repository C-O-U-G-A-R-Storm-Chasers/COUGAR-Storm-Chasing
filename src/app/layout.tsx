"use server";

import { ReactNode } from "react";
import "./globals.css";
import Row from "@/components/Row";
import Navbar from "@/components/Navbar/Navbar";
import Col from "@/components/Col";

export default async function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full bg-slate-50 text-slate-950">
            <head>
                <meta charSet="UTF-8" />
                <link rel="shortcut icon" href="/assets/icon_v1.png" type="image/x-icon"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>C.O.U.G.A.R. Storm Chasers</title>
            </head>
            <body className="
                flex
                flex-col
                w-full
                h-full
                max-w-screen
                max-h-screen
            ">
                <Col>
                    <Navbar />

                    {children}
                </Col>
            </body>
        </html>
    );
}