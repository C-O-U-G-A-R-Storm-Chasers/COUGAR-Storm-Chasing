"use client";

import { FormEvent,  useEffect,  useState } from "react";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import InputTextMain from "@/components/Inputs/InputText";
import InputPasswordMain from "@/components/Inputs/InputPassword";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";
import Col from "@/components/Col";
import Row from "@/components/Row";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import Link from "next/link";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import ProfileImageUploadForm from "./ProfileImageUploadForm";
import { BasicResult } from "@/_Interfaces/BasicResult";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { RegistrationResponses } from "@/_Enums/Registration/RegistrationResponses";

export default function RegisterForm() {
    const [uploading, setUploading] = useState<{ submitted: boolean, pending: boolean }>({ submitted: false, pending: false });
    const [result, setResult] = useState<BasicResult | null>(null);
    const [edited, setEdited] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // Form submitted & finished processing
        if (uploading.submitted && !uploading.pending) {
            if (result?.success && result?.data) {
                // Add delay so it's not so abrupt
                const timeout = setTimeout(() => {
                    router.push("/dashboard");
                    router.refresh();
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
            const response = await fetch("/api/users/register", {
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
            <InfoHeader textContent="Register" />

            <p className="text-xs">Already have an account? <Link href="/dashboard/account/signin" className="underline">Sign in instead</Link>.</p>

            <Col className="w-full gap-2">
                
                <ProfileImageUploadForm defaultValue={null} />

                <Col>
                    <label htmlFor="first" className="text-xs">First Name</label>
                    <InputTextMain
                        name="first"
                        id="first"
                        placeholder="John"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="last" className="text-xs">Last Name</label>
                    <InputTextMain
                        name="last"
                        id="last"
                        placeholder="Doe"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="username" className="text-xs">Desired Username</label>
                    <InputTextMain
                        name="username"
                        id="username"
                        placeholder="John Doe 01"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="email" className="text-xs">Email Address</label>
                    <InputTextMain
                        name="email"
                        id="email"
                        placeholder="johndoe@gmail.com"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="password" className="text-xs">Desired Password</label>
                    <InputPasswordMain
                        name="password"
                        id="password"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                <Col>
                    <label htmlFor="rpt-password" className="text-xs">Repeat Password</label>
                    <InputPasswordMain
                        name="rpt-password"
                        id="rpt-password"
                        onChange={() => setEdited(true)}
                        required
                    />
                </Col>

                {
                    (uploading.submitted && !uploading.pending && result) &&
                    <>
                        {
                            // Error
                            !result.success &&
                            <>
                                <ErrorMessage description={
                                    result.data === RegistrationResponses.USERNAME_IN_USE ?
                                        "Username is already in use! Please choose a different username." :
                                    result.data === RegistrationResponses.EMAIL_IN_USE ?
                                        "Email address is already in use! Please choose a different email address." :
                                    result.data === RegistrationResponses.INVALID_PASS ?
                                        "Password is invalid! Please review the password requirements." :
                                    result.data === RegistrationResponses.PASS_MISMATCH ?
                                        "Passwords must match!" :
                                    result.data === RegistrationResponses.TECHNICAL_ERROR ?
                                        "A technical error occurred creating the user. Please try again, or contact an administrator for assistance." :
                                    result.data === RegistrationResponses.TECHNICAL_ERROR ?
                                        result.msg! :
                                        "Unknown result"
                                } />

                                {
                                    (result.data === RegistrationResponses.USERNAME_IN_USE || result.data === RegistrationResponses.EMAIL_IN_USE) &&
                                    <Row className="p-2 text-xs bg-blue-500 rounded-sm gap-1">
                                        <p className="text-xs">Already have an account?</p>
                                        <Link href="/dashboard/account/signin" className="text-xs underline">Sign in instead.</Link>
                                    </Row>
                                }

                                {
                                    result.data === RegistrationResponses.INVALID_PASS &&
                                    <Col className="p-2 text-xs bg-blue-500 rounded-sm gap-1">
                                        <p className="text-sm font-semibold">Password must:</p>
                                        <p className="text-xs">- Be at least 9 characters long</p>
                                        <p className="text-xs">- Contain at least 1 uppercase letter</p>
                                        <p className="text-xs">- Not use the same special character twice</p>
                                        <p className="text-sm font-semibold">Allowed characters:</p>
                                        <p className="text-xs">- Alphanumerics [a-Z] [0-9]</p>
                                        <p className="text-xs">- Special Characters [! * & ^ % # @]</p>
                                    </Col>
                                }
                            </>
                        }
                        {
                            // Success
                            result.success &&
                            <SuccessMessage description={"You've successfully created an account! Please wait..."} />
                        }
                    </>
                }

                <Col className="w-full">
                    {
                        uploading.submitted && uploading.pending ?
                        <LoadingSpinner loadingText="Creating account, please wait..." /> :
                        edited &&
                        <>
                            <FormSubmitButton>Create New Account</FormSubmitButton>
    
                            <Row onClick={() => setEdited(false)}>
                                <FormResetButton />
                            </Row>
                        </>
                    }
                </Col>

            </Col>
        </form>
    );
}