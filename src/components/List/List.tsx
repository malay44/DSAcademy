import React from 'react';

type ListProps = {
    
};

const List:React.FC<ListProps> = () => {
    
    return <div className='w-full flex flex-col gap-2'>
        <div className='border-b-2 border-b1 pb-2'>
            <h2 className='text-primary-blue text-xl font-semibold'>Contests</h2>
        </div>
        <div className='flex flex-col gap-5 mt-3'>
            
            <div className='flex items-center justify-between text-md text-dark-gray-6 hover:text-primary-blue cursor-pointer' >
                <div className='flex gap-3 items-center'>
                    <div className='w-8 h-8 bg-dark-gray-7 rounded-full'></div>
                    <p className=''>Contest1</p>
                </div>
                <div>
                    <p>Posted Nov 1</p>
                </div>
            </div>

            <div className='flex items-center justify-between text-md text-dark-gray-6 hover:text-primary-blue cursor-pointer'>
                <div className='flex gap-3 items-center'>
                    <div className='w-8 h-8 bg-dark-gray-7 rounded-full'></div>
                    <p className=''>Contest1</p>
                </div>
                <div>
                    <p>Posted Nov 1</p>
                </div>
            </div>

            <div className='flex items-center justify-between text-md text-dark-gray-6 hover:text-primary-blue cursor-pointer'>
                <div className='flex gap-3 items-center'>
                    <div className='w-8 h-8 bg-dark-gray-7 rounded-full'></div>
                    <p className=''>Contest1</p>
                </div>
                <div>
                    <p>Posted Nov 1</p>
                </div>
            </div>

        </div>
    </div>
}
export default List;