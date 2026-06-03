import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { fetchLatestValidOutlook } from "@/lib/database/outlooks/fetchLatestValidOutlook";
import { fetchLatestOutlook } from "@/lib/database/outlooks/fetchLatestOutlook";
import { unixToUTC } from "@/lib/utils/unixToUTC";
import Image from "next/image";
import Link from "next/link";

export default async function OutlookDayPage({ params }: { params: Promise<{ day: string }> }) {
    const { day } = await params;

    const { success } = await signinValidation(PermissionLevels.MEM);

    if (!success) return <ErrorMessage description="You must be a member to access this feature!" />;

    await updateWebVisits();

    const outlookDay = parseInt(day);
    let outlook = null;
    const validOutlook = await fetchLatestValidOutlook(outlookDay);

    if (validOutlook) outlook = validOutlook;
    else outlook = await fetchLatestOutlook(outlookDay);

    const now = new Date();
    const datePart = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    }).format(now);
    const hour = String(now.getUTCHours()).padStart(2, "0");

    return (
        <Col className="w-full h-full items-center justify-center">
            <Col
                className="
                    flex
                    flex-col
                    items-start
                    w-full
                    p-2
                    
                    bg-sky-700

                    border-1
                    border-sky-500

                    rounded-md
                    
                    gap-2
                "
            >
                <Col className="w-full items-start p-1 bg-white text-slate-900 rounded-sm">
                    <Link
                        href={`/outlooks/day/${outlookDay}`}
                        className="
                            p-0.5
                            bg-sky-500
                            text-slate-100

                            underline

                            rounded-xs
                        "
                        title={`Refresh Day ${outlookDay} Outlook`}
                    >
                        Refresh
                    </Link>

                    {
                        outlook ?
                        <>
                            <p className="text-2xl font-semibold">{datePart} {hour}00 UTC Day {outlookDay} Convective Outlook</p>
                            <p className="text-xs">Updated {unixToUTC(outlook.createdUnixTimestamp)}</p>

                            <Col className="w-full items-start">
                                {
                                    (outlook.media && outlook.media.length > 0) && outlook.media.map((media, i) => (
                                        <Image
                                            key={`outlook-${outlookDay}-media-${i}`}
                                            alt={`outlook-${outlookDay}-media-${i}`}
                                            src={media.webPath}
                                            width={815}
                                            height={815}
                                            className={`${!validOutlook ? "border-4 border-red-500" : "border-1 border-black"}`}
                                        />
                                    ))
                                }

                                <p className="w-full p-0.5 text-xs font-semibold bg-slate-950 text-white">Forecast Discussion</p>
                                <p className="text-xs font-semibold font-['Courier_New'] whitespace-pre-wrap">{outlook.discussion}</p>
                            </Col>
                            
                        </>
                        :
                        <p className="font-semibold text-sm">No Outlooks for Day {outlookDay}</p>
                    }
                </Col>
            </Col>
        </Col>
    );
}