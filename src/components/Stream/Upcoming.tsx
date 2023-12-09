import React from 'react';
import { useRecoilValue } from 'recoil';
import { upcomingListState } from '@/atoms/upcomingListAtom';

type UpcomingProps = {
    
};

const Upcoming:React.FC<UpcomingProps> = () => {
    const upcomingList = useRecoilValue(upcomingListState);
    const maxHeight = 40;
    const isViewAllVisible = upcomingList.length * 16 > maxHeight;

    return <div className='px-7 py-4 rounded-lg border-2 w-full h-48 flex flex-col items-center justify-center gap-3'>
        <h1 className='text-xl text-dark-gray-6'>Upcoming</h1>
        <div className={`text-sm w-full ${isViewAllVisible ? 'max-h-40 overflow-hidden' : ''}`}>
            <ul className="list-disc">
               {upcomingList.map((item, index) => (
                <li className="mb-2 hover:text-primary-blue cursor-pointer" key={index}>{item}</li>
               ))}
            </ul>
        </div>
        {isViewAllVisible && (
            <div className='flex w-full justify-end text-base'>
                <button className="text-blue-500 hover:underline" onClick={() => alert('View All clicked')}>
                  View All
                </button>
            </div>
            )}
    </div>
}
export default Upcoming;