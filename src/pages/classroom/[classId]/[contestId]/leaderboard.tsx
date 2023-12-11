import LeaderboardTable from '@/components/Contest/LeaderboardTable';
import ContestNavAbove from '@/components/Navbar/ContestNavAbove';
import ContestNavBelow from '@/components/Navbar/ContestNavBelow';
import Topbar from '@/components/Topbar/Topbar';
import { useRouter } from 'next/router';
import React from 'react';

type leaderboardProps = {
    
};

const leaderboard:React.FC<leaderboardProps> = () => {
    const { classId } = useRouter().query;
    const tableData = [
        { id: 1, name: 'Malay', solved: 7, points: 70 },
        { id: 2, name: 'Kushal', solved: 6, points: 60 },
        { id: 3, name: 'Neel', solved: 5, points: 50 },
      ];
    return (<main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen '>
        <Topbar />
        <ContestNavAbove classId={classId} />
        <ContestNavBelow/>
        <div className='overflow-auto flex-1 w-full max-w-[1200px] mx-auto py-5'>
            <LeaderboardTable data={tableData} />
        </div>
    </main>
    )
}
export default leaderboard;