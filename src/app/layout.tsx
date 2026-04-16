"use server";

import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export default async function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full bg-slate-50 text-slate-950">
            <head>
                <meta charSet="UTF-8" />
                <link rel="shortcut icon" href="/assets/icon.jpg" type="image/x-icon"/>
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
                min-h-screen
            ">
                <Navbar />

                {children}
            </body>
        </html>
    );
}