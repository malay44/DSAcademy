import Link from 'next/link';
import React from 'react';
import JoinClassButton from '../Buttons/JoinClassButton';
import CreateClassButton from '../Buttons/CreateClassButton';
import LoginForm from '../Modals/LoginForm';

type ClassroomNavProps = {
    
};

const LoginNavbar:React.FC<ClassroomNavProps> = () => {
    
    return (
        <>
        <nav className='relative flex h-[56px] w-full shrink-0 items-center px-10  dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
            <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}>
                <Link style={{fontSize:'23px', font:'Source Code Pro', color: '#3466F6'}}  href='/' className='h-[22px] flex-1'>
                <p className="font-bold"> &lt;DSAcademy/&gt; </p>
                </Link>
            </div>
        </nav>
        </>
    )
}
export default LoginNavbar;