import { userSession } from '@/libs/userSession'
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { data } = await userSession();
    if (data.session) {
        return redirect('/');
    }
    return (
        <div className='flex items-center justify-center h-full'>
            {children}
        </div>
    )
}

export default Layout