"use server";

import { Outlook } from "@/_Interfaces/Outlooks/Outlook";
import Link from "next/link";
import Image from "next/image";
import { fetchLatestValidOutlook } from "@/lib/database/outlooks/fetchLatestValidOutlook";
import { fetchLatestOutlook } from "@/lib/database/outlooks/fetchLatestOutlook";
import Col from "@/components/Col";

export default async function OutlookDayLink({ outlookDay }: { outlookDay: Outlook["outlookDay"] }) {
    let outlook = null;
    const validOutlook = await fetchLatestValidOutlook(outlookDay);

    if (validOutlook) outlook = validOutlook;
    else outlook = await fetchLatestOutlook(outlookDay);

    return (
        <Col className="p-1 bg-white text-slate-900 border-1 border-slate-400 rounded-sm">
            {
                outlook ?
                <Col>
                    <p className="font-semibold text-sm">Day {outlookDay}</p>
                    {
                        validOutlook ?
                        <p className="font-semibold text-xs">Valid Until {outlook.validUntil}</p> :
                        <p className="font-semibold text-xs text-red-500">Valid Until {outlook.validUntil} (Outdated)</p>
                    }

                    <Link
                        href={`/outlooks/day/${outlookDay}`}
                        title={`View Our Day ${outlookDay} Outlook`}
                    >
                        {
                            (outlook.media && outlook.media.length > 0) &&
                            <Image
                                alt={`outlook-${outlookDay}-thumbnail`}
                                src={outlook.media[0].webPath}
                                width={190}
                                height={190}
                                className={`${!validOutlook && "border-4 border-red-500"}`}
                            />
                        }
                    </Link>
                </Col>
                :
                <p className="font-semibold text-sm">No Outlooks for Day {outlookDay}</p>
            }
        </Col>
    );
}