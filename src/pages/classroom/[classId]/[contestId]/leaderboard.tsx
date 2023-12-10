import ContestNavAbove from '@/components/Navbar/ContestNavAbove';
import ContestNavBelow from '@/components/Navbar/ContestNavBelow';
import Topbar from '@/components/Topbar/Topbar';
import React from 'react';

type leaderboardProps = {
    
};

const leaderboard:React.FC<leaderboardProps> = () => {
    
    return (<main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen '>
        <Topbar />
        <ContestNavAbove/>
        <ContestNavBelow/>
        <div className='overflow-auto'>
        
        </div>
    </main>
    )
}
export default leaderboard;