"use client";

import { FormEvent,  useEffect,  useState } from "react";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { User } from "@/_Interfaces/Users/User";
import InputDropdown from "@/components/Inputs/InputDropdown";
import InputNumber from "@/components/Inputs/InputNumber";
import { APICheckoutSessionData } from "@/app/api/stripe/checkout/route";

export default function CreatePaymentForm({ currentUser }: { currentUser: User | null }) {
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<APICheckoutSessionData | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.status === 200 && result.url !== undefined && result.url !== null) {
                const url = result.url;

                // Add delay so it's not so abrupt
                const timeout = setTimeout(() => {
                    router.push(url);
                }, 3000);

                return () => clearTimeout(timeout);
            }
        }
    }, [result, uploading, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setUploading({ submitted: true, pending: true });
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                body: formData
            });

            setResult(await response.json());
        } finally {
            setUploading({ submitted: true, pending: false });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                flex
                flex-col
                items-center
                w-full
                md:w-2/3
                p-2

                rounded-md
                
                gap-2
            "
        >
            <InfoHeader textContent="Donate or Pay for Storn Chasing Tour" />

            <Col className="w-full gap-2">

            <input
                type="hidden"
                name="user"
                value={currentUser?.uid ?? "guest"}
            />

                <Col>
                    <label htmlFor="payment-type" className="text-xs">Payment Type [Donation or Tour]</label>
                    <InputDropdown
                        name="payment-type"
                        defaultValue="donation"
                    >
                        <option value="donation">Donation</option>
                        <option value="tour">Storm Chasing Tour</option>
                    </InputDropdown>
                </Col>

                <Col className="w-full">
                    <label htmlFor="amount-usd" className="text-xs">Amount USD (Minimum $1.00 to cover processing fees)</label>
                    <Row className="items-center">
                        <p className="p-1 px-3 text-md border-l-1 border-t-1 border-b-1 border-slate-50/20 bg-neutral-800">$</p>
                        <InputNumber
                            name="amount-usd"
                            min="1.00"
                            step="0.01"
                            placeholder="0.00"
                            aria-label="Amount in USD"
                            defaultValue="5.00"
                        />
                    </Row>
                </Col>

                {
                    (uploading.submitted && !uploading.pending && result) &&
                    <>
                        {
                            // Error
                            result.status !== 200 &&
                            <>
                                <ErrorMessage description={result.statusText ?? "Unknown Error"} />
                            </>
                        }
                        {
                            // Success
                            result.status === 200 &&
                            <SuccessMessage description={"Success! Please wait..."} />
                        }
                    </>
                }

                <Col className="w-full">
                    {
                        uploading.submitted && uploading.pending ?
                        <LoadingSpinner loadingText="Processing payment, please wait..." /> :
                        <>
                            <FormSubmitButton>Make Payment</FormSubmitButton>
    
                            <Row>
                                <FormResetButton />
                            </Row>
                        </>
                    }
                </Col>

            </Col>
        </form>
    );
}