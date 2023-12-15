import React from 'react';
import Link from 'next/link';
import { selectedClassTabState } from '@/atoms/selectedClassTabAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

type ClassNavBelowProps = {};

const ClassNavBelow: React.FC<ClassNavBelowProps> = () => {
  const router = useRouter();
  const [selectedClassTab, setSelectedClassTab] = useRecoilState(selectedClassTabState);

  const handleClassTabClick = (tab: string) => {
    setSelectedClassTab(tab);
  };

  const currentPath = router.asPath;
  const classId = currentPath.split('/')[2];
    
    return (
        <nav className='relative flex h-[56px] w-full shrink-0 items-center justify-between px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
			{/* <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>

            </div> */}
            <div className="flex w-full items-center justify-start max-w-[1200px] mx-auto border-b-2 ">
              <Link href={`/classroom/${classId}`}>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'stream' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('stream')}
              >
                Stream
              </p>
              </Link>
              <Link href={`/classroom/${classId}/classwork`}>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'classwork' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('classwork')}
              >
                Classwork
              </p>
              </Link>
             <Link href={`/classroom/${classId}/people`}>
             <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'people' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('people')}
              >
                People
              </p>
             </Link>
              <Link href={`/classroom/${classId}/discussion`}>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'discussion' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('discussion')}
              >
                Discussion
              </p>
              </Link>
              <Link href={`/classroom/${classId}/grades`}>
              <p
                className={`py-1 px-3 cursor-pointer ${
                  selectedClassTab === 'grades' ? 'text-blue-500 border-b-4 border-blue-500' : ''
                }`}
                onClick={() => handleClassTabClick('grades')}
              >
                Grades
              </p>
              </Link>
              
		    </div>
        </nav> 
    )
}
export default ClassNavBelow;


