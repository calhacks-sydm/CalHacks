'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface LoginProps {
    // Define any props you need here
}

const LoginPage: React.FC<LoginProps> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle login logic here

    };

    return (
        <div className='grid grid-cols-2'>
            <div className='bg-white h-screen'>

                <div className='flex flex-col rounded-lg p-10 m-20 h-2/3 border-1 border-black'>

                    <h1 className='font-bold text-3xl'>Erudite</h1>
                    <h2 className='font-bold mb-40'>Simplified revisions, Elevated results</h2>
                    <form onSubmit={handleSubmit} >
                        <Input className='w-3/5 my-4' type='text' placeholder='Username' value={username} onChange={handleUsernameChange}/>

                        <Input className='w-3/5 my-4' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
                        
                        <Button type='submit' className='text-white w-40 bg-green-500 hover:bg-green-400' asChild>
                            <Link href="/dashboard">Login</Link>
                        </Button>
                    </form>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default LoginPage;
