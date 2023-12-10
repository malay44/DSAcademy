import ContestNavAbove from '@/components/Navbar/ContestNavAbove';
import ContestNavBelow from '@/components/Navbar/ContestNavBelow';
import Topbar from '@/components/Topbar/Topbar';
import React from 'react';

type dummycontestProps = {
    
};

const dummycontest:React.FC<dummycontestProps> = () => {
    
    return (<main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
        <Topbar />
        <ContestNavAbove/>
        <ContestNavBelow/>
        <div className='flex-1 h-full max-w-[1200px] mx-auto flex items-center justify-center'>
            
        </div>
    </main>
    )
}
export default dummycontest;