import { PermissionLevels } from "@/_Enums/PermissionLevels";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import OutlookDayLink from "./OutlookDayLink";

export default async function OutlooksPage() {
    const { success } = await signinValidation(PermissionLevels.MEM);

    if (!success) return <ErrorMessage description="You must be a member to access this feature!" />;

    await updateWebVisits();

    return (
        <Col className="w-full h-full items-center justify-center">
            <Col
                className="
                    flex
                    flex-col
                    items-start
                    w-1/3
                    p-2
                    
                    bg-sky-700

                    border-1
                    border-sky-500

                    rounded-md
                    
                    gap-2
                "
            >
                <InfoHeader textContent="Current Outlooks" />

                <p className="text-xs">Disclaimer: All of our outlooks are based on our own forecasting, and are not to be considered 100% accurate. We try our best to be as accurate as possible, but we can easily make mistakes. For official outlook information, please view the current <a href="https://www.spc.noaa.gov/products/outlook/" className="underline">Storm Prediction Center outlooks</a>.</p>

                <Col className="gap-2">
                    <OutlookDayLink outlookDay={1} />
                    <OutlookDayLink outlookDay={2} />
                    <OutlookDayLink outlookDay={3} />
                    <OutlookDayLink outlookDay={4} />
                </Col>
            </Col>
        </Col>
    );
}