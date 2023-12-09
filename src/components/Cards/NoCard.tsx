import React from 'react';

type NoCardProps = {
    
};

const NoCard:React.FC<NoCardProps> = () => {
    
    return (
        <div className=' flex flex-col gap-3 items-center justify-center border-2 border-dashed border-spacing-6 border-gray-400 rounded-lg h-36 w-96 text-dark-layer-1'>
            <h2 className='font-bold text-2xl'>
                No Class :(
            </h2>
            <p className='font-semibold text-xl'>Join class or Create a new Class</p>
        </div>
    )
}
export default NoCard;