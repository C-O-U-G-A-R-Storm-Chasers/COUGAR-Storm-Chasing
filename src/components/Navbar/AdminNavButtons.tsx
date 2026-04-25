"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import NavbarButtonStandard from "./NavbarButtonStandard";
import { ArrowUpTrayIcon, PresentationChartLineIcon, TruckIcon } from "@heroicons/react/24/solid";

export default async function AdminNavButtons() {
    const { success: adminSuccess, data: admin } = await signinValidation(PermissionLevels.ADMIN);

    if (adminSuccess && admin) return (
        <>
            <NavbarButtonStandard href="/media/upload">
                <ArrowUpTrayIcon className="w-5 h-5" />
                <p className="text-xs font-semibold">Upload Media</p>
            </NavbarButtonStandard>

            <NavbarButtonStandard href="/chases/plan">
                <TruckIcon className="w-5 h-5" />
                <p className="text-xs font-semibold">Plan Our Chases</p>
            </NavbarButtonStandard>

            <NavbarButtonStandard href="/chases/plan">
                <PresentationChartLineIcon className="w-5 h-5" />
                <p className="text-xs font-semibold">Submit New Outlook</p>
            </NavbarButtonStandard>
        </>
    );
}