import React, { useState } from 'react';
import { FaUser,FaPaperPlane, FaRegUser  } from "react-icons/fa6";


type CreateAnnouncementProps = {
    onAddAnnouncement: (text: string) => void;
};

const CreateAnnouncement:React.FC<CreateAnnouncementProps> = ({ onAddAnnouncement }) => {
    const [announcementText, setAnnouncementText] = useState<string>('');

    const handleAddAnnouncement = () => {
      if (announcementText.trim() !== '') {
        onAddAnnouncement(announcementText);
        setAnnouncementText('');
      }
    };
    return <div className='w-full h-16 border-2 p-4 rounded-lg flex items-center justify-between gap-4' >
        <div className='bg-b1 p-2.5 rounded-full h-9 w-9'>
            <div className=' h-5 w-5 text-white font-bold '>
            <FaRegUser />
            </div>
        </div>
        <div className='w-full '>
        <input
          className="h-10 w-full indent-4 text-dark-layer-1 focus:outline-none"
          type="text"
          placeholder="Make Announcements"
          value={announcementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
        />
        </div>
        <button className='bg-b1 p-2 h-9 w-9 rounded-full' onClick={handleAddAnnouncement}>
            <div className=' h-5 w-5 text-white font-bold'>
            <FaPaperPlane />
            </div>
        </button>
    </div>
}
export default CreateAnnouncement;