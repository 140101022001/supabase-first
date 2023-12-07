"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6)
}).refine((data) => data.password == data.passwordConfirm, {
    message: 'Password do not match!',
    path: ["passwordConfirm"]
})

const SignUp = () => {
    const {
        handleSubmit,
        formState,
        register
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        }
    })
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const res = await axios.post('/api/sign-up', values);
        console.log(res)
    }
    return (
        <div className='flex flex-col justify-center w-2/3 md:w-1/3 bg-slate-300/30 py-5 px-4 rounded-md shadow-md '>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 w-full text-center">
                    <span className="text-2xl font-semibold">Sign Up</span>
                </div>
                <div className="flex flex-col gap-y-3">
                    <div className='flex flex-col'>
                        <label htmlFor="email" className="text-2xl">Email</label>
                        <input className="mt-1 py-3 px-5 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md" id="email" {...register("email")}/>
                        {formState.errors.email && <p className='text-red-500 mt-1'>{formState.errors.email.message}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className="text-2xl">Password</label>
                        <input type="password" className="mt-1 py-3 px-5 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md" id="password" {...register("password")} />
                        {formState.errors.password && <p className='text-red-500 mt-1'>{formState.errors.password.message}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="passwordConfirm" className="text-2xl">Password Confirmation</label>
                        <input type="password" className="mt-1 py-3 px-5 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md" id="passwordConfirm" {...register("passwordConfirm")} />
                        {formState.errors.passwordConfirm && <p className='text-red-500 mt-1'>{formState.errors.passwordConfirm.message}</p>}
                    </div>
                    <div className="flex flex-col gap-y-4 justify-center">
                        <span>You already have an account?<Link href='/signin' className='hover:underline text-indigo-600'>Sign In</Link></span>
                        <button className="bg-indigo-400 text-white p-3 rounded-md w-full">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp