import React from 'react';
import { FaXmark } from "react-icons/fa6";
import Button from '../Buttons/Button';

type AddPeopleProps = {
    
};

const AddPeople:React.FC<AddPeopleProps> = () => {
    
    return ( 
        <div className='flex flex-col gap-8 border-2 p-5 shadow-sm bg-white w-3/5 rounded-lg'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg text-dark-gray-6'>Create Class</h2>
                <FaXmark className='w-8 h-8 font-medium hover:text-dark-pink'/>
            </div>
            <div className='createclass1'>
                <div className='flex justify-between w-2/5'>
                    <textarea
                        rows={1} cols={20}
                        id="Class"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter class name"
                        required />
                    <textarea
                        typeof='number' rows={1} cols={20}
                        id="Section"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Section Number"
                        required />
                </div>
            </div>
            <div className='flex justify-between'>
                <textarea
                    id="Class"
                    className="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Add people to class"
                    required />
                <div >
                    <Button >Add</Button>
                </div>
            </div>
            <div className='flex justify-center'>
            <Button>Create</Button>
            </div>
        </div>
        );  
}
export default AddPeople;