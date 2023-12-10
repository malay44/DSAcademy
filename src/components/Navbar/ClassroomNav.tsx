import Link from 'next/link';
import React from 'react';
import JoinClassButton from '../Buttons/JoinClassButton';
import CreateClassButton from '../Buttons/CreateClassButton';

type ClassroomNavProps = {
    
};

const ClassroomNav:React.FC<ClassroomNavProps> = () => {
    
    return <nav className='relative flex h-[56px] w-full shrink-0 items-center px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
    <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto `}>
        <Link style={{font: 'Source Code Pro', color: '#767676'}}  href='/classroom' className='h-[22px] flex-1'>
			<p className="font-semibold text-xl"> Classroom </p>
		</Link>

        <div className='flex gap-14 space-x-4 '>
            <div className="flex gap-4">
                <input className="h-10 min-w-[12rem] rounded-lg border border-dark-layer-7  bg-dark-gray-10 indent-4 text-dark-layer-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-b3" type="string" placeholder="Enter Class Code" />
                <JoinClassButton/>
            </div>
            <CreateClassButton/>
        </div>
    </div>
    </nav>
}
export default ClassroomNav;