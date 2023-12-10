import NoCard from '@/components/Cards/NoCard';
import ContestNavAbove from '@/components/Navbar/ContestNavAbove';
import ContestNavBelow from '@/components/Navbar/ContestNavBelow';
import ProblemsTable from '@/components/ProblemsTable/ProblemsTable';
import AttemptProblems from '@/components/ProblemsTable/attemptProblems';
import Topbar from '@/components/Topbar/Topbar';
import Problems from '@/pages/problemsMain';
import React from 'react';

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    
    return (<main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen '>
        <Topbar />
        <ContestNavAbove/>
        <ContestNavBelow/>
        {/* <div className='flex-1 h-full mt-3 flex items-center justify-center  bg-lime-200'>
            <NoCard cardHeading='Contest has not started' cardDescription='' cardButton={true} />
            
        </div> */}
        <div className='overflow-auto'>
        <AttemptProblems isContest={true} />
        </div>
    </main>
    )
}
export default index;