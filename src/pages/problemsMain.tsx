import React, { useState } from 'react';
import ProblemsTable from '@/components/ProblemsTable/ProblemsTable';
import ContestProblemTable from '@/components/ProblemsTable/ContestProblemTable';

type ProblemsMainProps = {
  isContest?: boolean;
};

const ProblemsMain: React.FC<ProblemsMainProps> = ({ isContest }) => {
  console.log("isContest:", isContest); // Log the value
  const [loadingProblems, setLoadingProblems] = useState(true);
  return (
    <div>
      <div className='relative overflow-x-auto mx-auto px-6 py-10'>
        {loadingProblems && (
          <div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
            {[...Array(10)].map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        )}
        <table className='text-sm font-medium dark:font-normal text-left text-dark-layer-1 dark:text-gray-400 sm:w-10/12 w-full max-w-[1200px] mx-auto'>
          {!loadingProblems && (
            <thead className='text-md text-gray-700 uppercase dark:text-gray-400 border-b border-dark-gray-7 dark:border-white '>
              <tr>
              {!isContest ? (
              <>
              <th scope='col' className='px-1 py-3 w-0 font-medium'>
                  Status
                </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Title
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Difficulty
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Category
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Solution
              </th>
              </>
              ):(
                <>
                <th scope='col' className='px-1 py-3 w-0 font-medium'>
                  Sr. No
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Title
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Difficulty
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Category
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Points
                </th>
                </>
              )}
              </tr>
            </thead>
          )}
          <ContestProblemTable setLoadingProblems={setLoadingProblems} isContest={isContest} />
        </table>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className='flex items-center space-x-12 mt-4 px-6'>
      <div className='w-6 h-6 shrink-0 rounded-full bg-dark-gray-7 dark:bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52  w-32  rounded-full bg-dark-gray-7 dark:bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52  w-32 rounded-full bg-dark-gray-7 dark:bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52 w-32 rounded-full  bg-dark-gray-7 dark:bg-dark-layer-1'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default ProblemsMain;
