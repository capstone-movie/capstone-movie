"use client";
import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignIn, SignInProfileSchema} from "@/utils/models/sign-in/sign-in.model";
import {postSignIn} from "@/utils/models/sign-in/sign-in.action";
import { Status } from '@/utils/interfaces/Status'
import {DisplayStatus} from "@/components/display-status";
import {DisplayError} from "@/components/display-error";

const LoginPopup = ({closePopup}: { closePopup: () => void }) => {
    const [isVisible, setIsVisible] = useState(true); // Popup visibility
    const [status, setStatus] = useState<Status|null>(null)

    const defaultValues : SignIn = {
        profileEmail: '',
        profilePassword: ''
    }

    const {register, handleSubmit, reset, formState:{errors}} = useForm<SignIn>({
        resolver: zodResolver(SignInProfileSchema),
        defaultValues,
        mode:'onBlur'
    })

    // define what happens onSubmit
    const fireServerAction = async (data: SignIn) => {
        try {
            // call to the postSignIn server action
            const response = await postSignIn(data)
            if (response.status === 200) {
                // if status object returned from express is 200 (successful) resetForm
                reset()
                closePopup()
            }
            // use setStatus to display status from express
            setStatus(response)
        } catch (error) {
            // if an error occurs let user know to try later
            setStatus({status: 500, message: 'sign in request failed try again', data:undefined})
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
                    <>
                        <form onSubmit={handleSubmit(fireServerAction)} className="flex flex-col mx-auto gap-5">
                            <h1 className="text-3xl font-bold">Welcome back.</h1>
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="email1" >Your email</label>
                                </div>
                                <input
                                    autoComplete='email'

                                    {...register('profileEmail')}
                                    id="email1"
                                    type="email"
                                    name="profileEmail"
                                    placeholder={'Enter your email'}
                                    className="mt-2 w-full p-2 border rounded-md text-black bg-white"
                                    aria-invalid={errors.profileEmail? 'true' : 'false'}
                                />
                                <DisplayError error={errors?.profileEmail?.message} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="password1" >Your password</label>
                                </div>
                                <input
                                    autoComplete='current-password'
                                    {...register('profilePassword')}
                                    name="profilePassword"
                                    id="password1"
                                    type="password"
                                    placeholder={'Enter your password'}
                                    className="mt-2 w-full p-2 border rounded-md text-black bg-white"
                                    aria-invalid={errors.profilePassword ? 'true' : 'false'}
                                />
                                <DisplayError error={errors?.profilePassword?.message} />
                            </div>
                            <div className="flex my-2">
                                <button className={'mr-1'} color={'info'} type="submit">Submit</button>
                                <button className='ml-1' color={'failure'} type={'reset'}>Reset</button>
                            </div>
                        </form>
                        <DisplayStatus  status={status} />
                    </>
                </div>
            </div>
        </>
    );
};
export default LoginPopup;
