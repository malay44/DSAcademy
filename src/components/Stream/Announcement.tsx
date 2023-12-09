import React from 'react';

type AnnouncementProps = {
    
};

const Announcement:React.FC<AnnouncementProps> = () => {
    
    return <div className='w-full h-16 border-2 p-4 rounded-lg flex flex-col items-center justify-start text-xs text-dark-gray-6' >
        <div className='w-full text-base'>
            <p>Class will begin at 9:30AM</p>
        </div>
        <div className='flex justify-end w-full items-end'>
            date and time 
        </div>
    </div>
}
export default Announcement;