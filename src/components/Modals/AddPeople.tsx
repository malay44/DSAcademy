import React from 'react';
import { FaXmark } from "react-icons/fa6";
import Button from '../Buttons/Button';

type AddPeopleProps = {
    
};

const AddPeople:React.FC<AddPeopleProps> = () => {
    
    return <div className='flex flex-col gap-8 border-2 p-5 shadow-sm bg-white w-3/5 h-80 rounded-lg'>
        <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-lg text-dark-gray-6'>Add People</h2>
            <FaXmark className='w-8 h-8 font-medium hover:text-dark-pink'/>
        </div>
        <textarea
        id="mailids"
        className="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter mail ids"
        required
    />
        <div className='flex justify-center'>
          <Button>Submit</Button>
        </div>
    </div>
}
export default AddPeople;



{/* <div className='flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
                <h2>Role</h2>
                <div className="relative inline-block text-left">
              <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  Select Role
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="py-1" role="none">
                  <p className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Student</p>
                  <p className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">Teaching Assistant</p>
                  <p className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">License</p>
                  <form method="POST" action="#" role="none">
                    <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" id="menu-item-3">Sign out</button>
                  </form>
                </div>
              </div>
            </div>
            </div>
        </div> */}