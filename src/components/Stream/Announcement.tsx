import React from 'react';

type AnnouncementProps = {
    text: string;
    dateTime: string;
};

const Announcement:React.FC<AnnouncementProps> = ({ text, dateTime }) => {
    
    return <div className='w-full h-16 border-2 p-4 rounded-lg flex flex-col items-center justify-start text-xs text-dark-gray-6' >
        <div className='w-full text-base'>
          <p>{text}</p>
        </div>
        <div className='flex justify-end w-full items-end'>
          {dateTime}
        </div>
    </div>
}
export default Announcement;