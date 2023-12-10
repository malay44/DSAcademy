import Topbar from '@/components/Topbar/Topbar';
import React from 'react';
import CreateClassButton from '../../../../components/Buttons/CreateClassButton';
import Link from 'next/link';
import NoCard from '@/components/Cards/NoCard';
import ContestNavAbove from '@/components/Navbar/ContestNavAbove';


type ContestProps = {

};

const Contest: React.FC<ContestProps> = () => {

    return (<main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
        <Topbar />
        <ContestNavAbove/>
        <div className='flex-1 h-full max-w-[1200px] mx-auto flex items-center justify-center'>
            <NoCard cardHeading='Contest has not started' cardDescription='' cardButton={true} />
        </div>
    </main>
    )
}
export default Contest;