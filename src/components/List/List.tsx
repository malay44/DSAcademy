import React from 'react';

type ListProps = {
    title: string;
    dueDate: string;
};

const List:React.FC<ListProps> = ({ title, dueDate }: ListProps) => {
    
    return <div className='w-full flex flex-col gap-2'>
        <div className='flex flex-col gap-5 mt-3'>
            <div className='flex items-center justify-between text-md text-dark-gray-6 hover:text-primary-blue cursor-pointer' >
                <div className='flex gap-3 items-center'>
                    <div className='w-8 h-8 bg-dark-gray-7 rounded-full'></div>
                    <p className=''>{title}</p>
                </div>
                <div>
                    <p>{dueDate}</p>
                </div>
            </div>
        </div>
    </div>
}
export default List;