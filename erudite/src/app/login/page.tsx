'use client'

import React, { useState, createContext } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';

interface LoginProps {
    // Define any props you need here
}

export interface ILoginContext {
    email: string;
    password: string;
}

export const LoginContext = createContext<ILoginContext>({email: "", password: ""});

const LoginPage: React.FC<LoginProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle login logic here

    };

    return (
        <LoginContext.Provider value={{ email: email, password: password}}>
        <div className='grid grid-cols-2'>
            <div className='bg-white h-screen'>
                <Image src='/eruditelogin.jpg' width={500} height={500} alt={'logo'} className='ml-24 mt-[25%]' />
                <div className='flex flex-col rounded-lg p-10 mb-20 ml-20 h-2/3 border-1 border-black'>
                    {/* <h2 className='font-bold text-xl'>Simplified revisions, Elevated results</h2> */}
                    <form onSubmit={handleSubmit} >
                        <Input className='w-3/5 my-4' type='text' placeholder='Email' value={email} onChange={handleEmailChange}/>
                        <Input className='w-3/5 my-4' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
                        <Button type='submit' className='text-white w-40 bg-green-500 hover:bg-green-400' asChild>
                            <Link href="/dashboard">Login</Link>
                        </Button>
                    </form>
                </div>
            </div>
            <div className='bg-green-500'>
                
            </div>
        </div>
        </LoginContext.Provider>
    );
};

export default LoginPage;
