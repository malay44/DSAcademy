import React from 'react';
import { FaPaperPlane, FaRegUser, FaXmark } from "react-icons/fa6";
import Button from '../Buttons/Button';

type AddPostProps = {
    onClose: () => void;
};

const AddPost:React.FC<AddPostProps> = ({ onClose }) => {
    
    return ( 
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
            <div className='flex flex-col gap-8 border-2 p-5 shadow-sm bg-white w-3/5 rounded-lg'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold text-lg text-dark-gray-6'>Post something</h2>
                    <FaXmark className='w-8 h-8 font-medium hover:text-dark-pink' onClick={onClose}/>
                </div>
                <div className='w-full h-16 border-2 p-4 rounded-lg flex items-center justify-between gap-4' >
                    <div className='bg-b1 p-2.5 rounded-full h-9 w-9'>
                        <div className=' h-5 w-5 text-white font-bold '>
                        <FaRegUser />
                        </div>
                    </div>
                    <div className='w-full '>
                    <input
                      className="h-10 w-full indent-4 text-dark-layer-1 focus:outline-none"
                      type="text"
                      placeholder="Type your message"
                      
                    />
                    </div>
                    <button className='bg-b1 p-2 h-9 w-9 rounded-full' >
                        <div className=' h-5 w-5 text-white font-bold'>
                        <FaPaperPlane />
                        </div>
                    </button>
                </div>
                <div className='flex justify-center'>
                    <Button>Post</Button>
                </div>
            </div>
        </div>
        
        );  
}
export default AddPost;