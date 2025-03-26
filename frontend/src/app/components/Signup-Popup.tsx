"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp, SignUpProfileSchema } from "@/utils/models/sign-up/sign-up.model";
import { postSignIn } from "@/utils/models/sign-in/sign-in.action";
import { Status } from '@/utils/interfaces/Status'
import { DisplayStatus } from "@/components/display-status";
import { DisplayError } from "@/components/display-error";
import { postSignUp } from "@/utils/models/sign-up/sign-up.action";
import {v7 as uuid} from 'uuid'

const SignupPopup = ({ closePopup }: { closePopup: () => void }) => {
    const [isVisible, setIsVisible] = useState(true); // Popup visibility
    const [status, setStatus] = useState<Status | null>(null);
    const [checkEmail, setCheckEmail] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const defaultValues: SignUp = {
        profileEmail: '',
        profilePassword: '',
        profileUsername: 'DefaultUsername', // Default username value,
        profileId: uuid() // Default UUID value,
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SignUp>({
        resolver: zodResolver(SignUpProfileSchema),
        defaultValues,
        mode: 'onBlur'
    });

    // define what happens onSubmit
    const fireServerAction = async (data: SignUp) => {
        try {
            // call to the postSignUp server action
            const response = await postSignUp(data);
            if (response.status === 200) {
                // if status object returned from express is 200 (successful) resetForm
                setCheckEmail(true);
            }
            // use setStatus to display status from express
            setStatus(response);
        } catch (error) {
            // if an error occurs let user know to try later
            setStatus({ status: 500, message: 'sign up request failed try again', data: undefined });
        }
    }

    /* "NoThanks" press */
    const handleNoThanks = () => {
        setIsVisible(false);
        closePopup(); // Close the popup when the user chooses "No Thanks"
    };

    /* If popup is hidden, removes the popup */
    if (!isVisible) return null;

    return (
        <>
            {/* Blurred background */}
            <div
                className="w-full h-full fixed top-0 left-0 pointer-events-auto bg-black/50 backdrop-blur z-10"
                onClick={closePopup} // Close the popup when the background is clicked
            />

            <div className="fixed inset-0 flex items-center justify-center text-white z-20">
                <div className="bg-bgcolor p-8 w-96 text-center shadow-lg rounded-md relative">
                    {/* Close Button (X) */}
                    <button
                        onClick={handleNoThanks}
                        className="absolute right-3 top-3 text-white text-2xl"
                    >
                        ✖
                    </button>
                    {
                        !checkEmail ? (
                            <>
                                <form onSubmit={handleSubmit(fireServerAction)} className="flex flex-col mx-auto gap-5">
                                    <h1 className="text-3xl font-bold">Welcome To AnimeRec.</h1>
                                    <div>
                                        <div className="mb-2 block">
                                            <label htmlFor="email1">Your email</label>
                                        </div>
                                        <input
                                            autoComplete="email"
                                            {...register('profileEmail')}
                                            id="email1"
                                            type="email"
                                            name="profileEmail"
                                            placeholder="Enter your email"
                                            className="mt-2 w-full p-2 border rounded-md text-black bg-white"
                                            aria-invalid={errors.profileEmail ? 'true' : 'false'}
                                        />
                                        <DisplayError error={errors?.profileEmail?.message} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <label htmlFor="email1">Your username</label>
                                        </div>
                                        <input
                                            autoComplete="email"
                                            {...register('profileUsername')}
                                            id="username1"
                                            type="text"
                                            name="profileUsername"
                                            placeholder="Enter your username"
                                            className="mt-2 w-full p-2 border rounded-md text-black bg-white"
                                            aria-invalid={errors.profileUsername ? 'true' : 'false'}
                                        />
                                        <DisplayError error={errors?.profileUsername?.message} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <label htmlFor="password1">Your password</label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                autoComplete="current-password"
                                                {...register('profilePassword')}
                                                name="profilePassword"
                                                id="password1"
                                                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                                                placeholder="Enter your password"
                                                className="mt-2 w-full p-2 border rounded-md text-black bg-white"
                                                aria-invalid={errors.profilePassword ? 'true' : 'false'}
                                            />
                                            {/* Show password toggle */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-2 text-lg text-gray-500"
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        <DisplayError error={errors?.profilePassword?.message} />
                                    </div>
                                    <div className="flex my-2">
                                        <button className="mr-1" color="info" type="submit">Submit</button>
                                        <button className="ml-1" color="failure" type="reset">Reset</button>
                                    </div>
                                </form>
                                <DisplayStatus status={status} />
                            </>
                        ) : (
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">Check your email for a confirmation link.</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};
export default SignupPopup;
