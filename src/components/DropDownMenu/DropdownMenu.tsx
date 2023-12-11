import React, { useState } from 'react';

type DropdownProps = {
};

const DropdownMenu: React.FC<DropdownProps> = () => {

  return (
    <div className="relative inline-block text-left "> <div> <button type="button" 
    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white
     bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 
     transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true"> 
     <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 14l6-6H4z" /> </svg> 
      </button> 
      </div> 
      <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg"> 
      <div className="rounded-md bg-white shadow-xs"> 
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu"> 
      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">10</p> 
      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">5</p> 
      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">1</p> 
      <div className="border-t border-gray-100"></div> 
      </div> 
      </div> 
      </div> 
      </div>
  );
};

export default DropdownMenu;
