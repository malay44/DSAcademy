import React from 'react';
import Link from 'next/link';
import {selectedClassTabState} from '@/atoms/selectedClassTabAtom';
import { useRecoilState } from 'recoil';

type ClassNavBelowProps = {
    
};

const ClassNavBelow:React.FC<ClassNavBelowProps> = () => {
    const [selectedClassTab, setSelectedClassTab] = useRecoilState(selectedClassTabState);

    const handleClassTabClick = (tab: string) => {
      setSelectedClassTab(tab);
    };
    
    return (
        <nav className='relative flex h-[56px] w-full shrink-0 items-center justify-between px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
			{/* <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>

            </div> */}
            <div className="flex w-full items-center justify-start max-w-[1200px] mx-auto border-b-2 ">
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'stream' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('stream')}
              >
                Stream
              </p>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'classwork' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('classwork')}
              >
                Classwork
              </p>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'people' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('people')}
              >
                People
              </p>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'discussion' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('discussion')}
              >
                Discussion
              </p>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'grades' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('grades')}
              >
                Grades
              </p>
              
		    </div>
        </nav> 
    )
}
export default ClassNavBelow;


