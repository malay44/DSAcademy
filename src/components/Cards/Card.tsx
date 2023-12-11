import classroomDetails from '@/utils/types/classroom/classroomDetails';
import Link from 'next/link';
import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";

type CardProps = {
    classroom: classroomDetails;
};

const Card:React.FC<CardProps> = ({classroom} : CardProps) => {
    
    return (
      <div className="flex flex-col h-52 w-64 bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <Link href={`/classroom/${classroom.classroomId}`} className='h-3/5 w-full rounded-t-lg bg-b1 text-white' >
                <div className="p-5 flex flex-col gap-1.5 items-start ">
                      <h5 className="dark:text-gray-900 font-semibold text-2xl tracking-tight  text-white">
                        {classroom.classroomName}
                      </h5>
                      <p className="font-normal dark:text-gray-700 ">
                        {classroom.description}
                      </p>
                </div>
          </Link>
          
          {/* <div className="p-5 h-full rounded-b-lg flex justify-end items-end">
            <button className='bg-dark-pink hover:bg-red-500 p-2 rounded-full'>
            <div className=' h-6 w-6 text-white font-bold text-2xl'>
            <AiOutlineDelete />
            </div>
            </button>
          </div> */}
      </div>
    )
}
export default Card;