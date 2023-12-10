import { selectedContestTabState } from '@/atoms/selectedContestTabAtom';
import React from 'react';
import { useRecoilState } from 'recoil';

type ContestNavBelowProps = {
    
};

const ContestNavBelow:React.FC<ContestNavBelowProps> = () => {

    const [selectedContestTab, setSelectedContestTab] = useRecoilState(selectedContestTabState);

    const handleContestTabClick = (tab: string) => {
      setSelectedContestTab(tab);
    };
    
    return (
        <nav className='relative flex h-[56px] w-full shrink-0 items-center justify-between px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
            <div className="flex w-full items-center justify-start max-w-[1200px] mx-auto border-b-2 ">
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedContestTab === 'problems' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleContestTabClick('problems')}
              >
                Problems
              </p>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedContestTab === 'leaderboard' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleContestTabClick('leaderboard')}
              >
                Leaderboard
              </p>
		    </div>
        </nav> 
    )
}
export default ContestNavBelow;