"use client";

import { PlannedChase } from "@/_Interfaces/Chases/PlannedChase";
import Col from "../Col";
import { unixToDate } from "@/lib/utils/unixToDate";

export default function ChaseRecord({ chase }: { chase: PlannedChase }) {
    return (
        <Col className="items-start gap-2">
            <Col>
                <p className="text-xl text-semibold">{chase.title}</p>
                <p className="text-xs">Plan created: {unixToDate(chase.created_timestamp)}</p>
                <p className="text-xs">Plan updated: {unixToDate(chase.updated_timestamp)}</p>
                <p className="text-sm">Assigned to {chase.chasers.join(", ")}</p>
            </Col>

            <Col>
                <p className="text-xs">Starts {chase.start_date}</p>
                <p className="text-xs">Ends {chase.end_date}</p>
            </Col>

            <p className="text-sm">{chase.description}</p>
            
        </Col>
    );
}