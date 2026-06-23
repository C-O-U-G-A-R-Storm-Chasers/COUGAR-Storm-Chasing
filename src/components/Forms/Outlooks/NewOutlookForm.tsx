"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import Col from "@/components/Col";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import Row from "@/components/Row";
import FormResetButton from "@/components/Buttons/FormResetButton";
import InputTextarea from "@/components/Inputs/InputTextarea";
import InputDropdown from "@/components/Inputs/InputDropdown";
import MediaUploadForm from "../Media/Upload/ProfileImageUploadForm";
import { UploadedFile } from "@/_Interfaces/Files/UploadedFile";
import { FileUploadPaths } from "@/_Enums/Files/FileUploadPaths";
import { ThreatTypes } from "@/_Enums/Threats/ThreatTypes";
import { NewOutlookAction } from "@/_Actions/Outlooks/NewOutlookAction";

export default function NewOutlookForm() {
    const [serverState, action] = useActionState(NewOutlookAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const [outlookDay, setOutlookDay] = useState<number>(1);
    const [riskLvl, setRiskLvl] = useState<number>(0);
    const [primaryThreat, setPrimaryThreat] = useState<string>(Object.keys(ThreatTypes).filter(key => isNaN(Number(key)))[0]);
    const [secondaryThreat, setSecondaryThreat] = useState<string>(Object.keys(ThreatTypes).filter(key => isNaN(Number(key)))[0]);
    const [uploadedMedia, setUploadedMedia] = useState<UploadedFile[]>();

    useEffect(() => {
        if (!serverState.success && serverState.msg) {
            setError(serverState.msg);
        }
    }, [serverState]);

    useEffect(() => {
        console.log("Uploaded media:", uploadedMedia)
    }, [uploadedMedia]);

    const handleOutlookDayChange = (e: ChangeEvent<HTMLSelectElement>) => setOutlookDay(parseInt(e.target.value));

    const handleRiskLvlChange = (e: ChangeEvent<HTMLSelectElement>) => setRiskLvl(parseInt(e.target.value));

    const handlePrimaryThreatChange = (e: ChangeEvent<HTMLSelectElement>) => setPrimaryThreat(e.target.value);

    const handleSecondaryThreatChange = (e: ChangeEvent<HTMLSelectElement>) => setSecondaryThreat(e.target.value);

    return (
        <form
            action={action}
            className="
                flex
                flex-col
                items-center
                w-2/3
                p-2
                
                bg-primary-10

                border-1
                border-primary-9

                rounded-md
                
                gap-2
            "
        >
            <InfoHeader textContent="New Outlook" />

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}

                <input type="hidden" name="attached-media" value={JSON.stringify(uploadedMedia)?? []} />

                <Col className="w-full items-center">
                    <MediaUploadForm
                        title="Upload Outlook Media"
                        desiredPath={FileUploadPaths.OUTLOOK_MEDIA}
                        setParentUploadedMedia={setUploadedMedia}
                    />
                </Col>

                <Col>
                    <label htmlFor="outlook-day" className="text-xs font-semibold">Day of Outlook (1-4)</label>
                    <InputDropdown
                        name="outlook-day"
                        value={outlookDay}
                        onChange={handleOutlookDayChange}
                    >
                        <option value={1}>Day 1</option>
                        <option value={2}>Day 2</option>
                        <option value={3}>Day 3</option>
                        <option value={4}>Day 4</option>
                    </InputDropdown>
                </Col>

                <Col>
                    <label htmlFor="risk-level" className="text-xs font-semibold">Overall Risk Level</label>
                    <InputDropdown
                        name="risk-level"
                        value={riskLvl}
                        onChange={handleRiskLvlChange}
                    >
                        <option value={0}>0 - Tstms</option>
                        <option value={1}>1 - Marginal</option>
                        <option value={2}>2 - Slight</option>
                        <option value={3}>3 - Enhanced</option>
                        <option value={4}>4 - Moderate</option>
                        <option value={5}>5 - High</option>
                    </InputDropdown>
                </Col>

                <Row className="w-full gap-2">
                    <Col className="w-1/2">
                        <label htmlFor="primary-threat" className="text-xs font-semibold">Primary Threat</label>
                        <InputDropdown
                            name="primary-threat"
                            value={primaryThreat}
                            onChange={handlePrimaryThreatChange}
                        >
                            {Object.keys(ThreatTypes).filter(key => isNaN(Number(key))).map(key => <option key={key} value={key}>{key}</option>)}
                        </InputDropdown>
                    </Col>

                    <Col className="w-1/2">
                        <label htmlFor="secondary-threat" className="text-xs font-semibold">Secondary Threat</label>
                        <InputDropdown
                            name="secondary-threat"
                            value={secondaryThreat}
                            onChange={handleSecondaryThreatChange}
                        >
                            {Object.keys(ThreatTypes).filter(key => isNaN(Number(key))).map(key => <option key={key} value={key}>{key}</option>)}
                        </InputDropdown>
                    </Col>
                </Row>

                <Col>
                    <label htmlFor="discussion" className="text-xs font-semibold">Discussion Text</label>
                    <InputTextarea name="discussion" id="description" placeholder="Discussion text..." required />
                </Col>

                <Row className="justify-between">
                    <FormResetButton />
                    <FormSubmitButton>Submit Updated Outlook for Day {outlookDay}</FormSubmitButton>
                </Row>

            </Col>
        </form>
    );
}