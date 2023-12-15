import NoCard from '@/components/Cards/NoCard';
import ContestNavAbove from '@/components/Navbar/ContestNavAbove';
import ContestNavBelow from '@/components/Navbar/ContestNavBelow';
import ProblemsTable from '@/components/ProblemsTable/ProblemsTable';
import Topbar from '@/components/Topbar/Topbar';
import ProblemsMain from '@/pages/problemsMain';
import { useRouter } from 'next/router';
import React from 'react';

type indexProps = {
    
};

const Index: React.FC<indexProps> = () => {
    const { classId } = useRouter().query;
    return (
        <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen '>
            <Topbar />
            <ContestNavAbove classId={classId} />
            <ContestNavBelow />
            <div className='overflow-auto'>
                <ProblemsMain isContest={true} />
            </div>
        </main>
    );
};

export default Index;
