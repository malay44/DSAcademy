import React, { useState } from 'react';
import { FaXmark } from "react-icons/fa6";
import Button from '../Buttons/Button';

type AddPeopleProps = {
    onClose: () => void;
    className: string;
    discription: string;
    classCode?: string;
    handleClassNameChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleDiscriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handlePeopleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleClick?: () => void;
};

const AddPeople:React.FC<AddPeopleProps> = ({ onClose, classCode, className, discription, handleClassNameChange, handleDiscriptionChange, handleClick}) => {
    return ( 
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
            <div className='flex flex-col gap-8 border-2 p-5 shadow-sm bg-white w-3/5 rounded-lg'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold text-lg text-dark-gray-6'>Create Class</h2>
                    <FaXmark className='w-8 h-8 font-medium hover:text-dark-pink' onClick={onClose}/>
                </div>
                <div className='createclass1'>
                    <div className='flex justify-between w-3/5 gap-6'>
                        <textarea
                            rows={1} cols={30}
                            id="Class"
                            className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter class name*"
                            value={className}
                            onChange={handleClassNameChange}
                            required />
                        <textarea
                            typeof='number' rows={1} cols={30}
                            id="Discription"
                            className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Discription*"
                            value={discription}
                            onChange={handleDiscriptionChange}
                            required />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <textarea
                        id="Class"
                        className="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Add people to class (optional)"
                        // value={people}
                        // onChange={handlePeopleChange}
                        required />
                    <div >
                        <Button >Add</Button>
                    </div>
                </div>
                {classCode !== '' && 
                <>
                    <p>Class Code: {classCode}</p>
                    <p>Share this code with students to help them join the created the class</p>
                </>
                }
                <div className='flex justify-center'>
                    <Button onClick={handleClick} >Create</Button>
                </div>
            </div>
        </div>
        
    );  
}
export default AddPeople;