"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import Col from "@/components/Col";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import Row from "@/components/Row";
import FormResetButton from "@/components/Buttons/FormResetButton";
import InputText from "@/components/Inputs/InputText";
import InputTextarea from "@/components/Inputs/InputTextarea";
import config from "../../../lib/cougar-config.json";
import InputDropdown from "@/components/Inputs/InputDropdown";
import { Chaser } from "@/_Interfaces/Chasers/Chaser";
import { PlanChaseAction } from "@/_Actions/Chases/PlanChaseAction";

export default function PlanChaseForm() {
    const [serverState, action] = useActionState(PlanChaseAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const [selectedChasers, setSelectedChasers] = useState<string[]>();

    const chasers: Chaser[] = Object.entries(config.team_members).map(([id, member]) => ({
        id,
        ...member
    }));

    useEffect(() => {
        if (!serverState.success && serverState.msg) {
            setError(serverState.msg);
        }
    }, [serverState]);

    const handleChaserChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectedChasers(Array.from(e.target.selectedOptions).map(option => option.value));

    return (
        <form
            action={action}
            className="
                flex
                flex-col
                items-center
                w-2/3
                p-2
                
                bg-sky-700

                border-1
                border-sky-500

                rounded-md
                
                gap-2
            "
        >
            <InfoHeader textContent="Plan A Chase" />

            <Col className="w-full gap-2">

                {error && <ErrorMessage description={error} />}

                <Col>
                    <label htmlFor="title" className="text-xs font-semibold">Chase Title</label>
                    <InputText name="title" id="title" placeholder="John" required />
                </Col>

                <Col>
                    <label htmlFor="description" className="text-xs font-semibold">Chase Description</label>
                    <InputTextarea name="description" id="description" placeholder="John" required />
                </Col>

                <Col>
                    <label htmlFor="chasers" className="text-xs font-semibold">Chasers Scheduled</label>
                    <InputDropdown
                        name="chasers"
                        value={selectedChasers}
                        onChange={(e) => handleChaserChange(e)}
                        multiple
                    >
                        {chasers.map(chaser => <option key={chaser.id} value={chaser.id}>{chaser.name} [{chaser.primary_title}]</option>)}
                    </InputDropdown>
                </Col>

                <Row className="w-full justify-center gap-2">
                    <Col className="w-1/2 p-1 border-1 border-white rounded-md">
                        <label htmlFor="start-date" className="text-xs font-semibold">Start Date</label>
                        <input type="date" name="start-date" id="start-date" required/>
                    </Col>

                    <Col className="w-1/2 p-1 border-1 border-white rounded-md">
                        <label htmlFor="end-date" className="text-xs font-semibold">End Date</label>
                        <input type="date" name="end-date" id="end-date" required/>
                    </Col>
                </Row>

                <Row className="justify-between">
                    <FormResetButton />
                    <FormSubmitButton>Create Plan</FormSubmitButton>
                </Row>

            </Col>
        </form>
    );
}