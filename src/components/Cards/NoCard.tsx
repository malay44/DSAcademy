import React from 'react';

type NoCardProps = {
    cardHeading: string;
    cardDescription: string;
    cardButton?: boolean; 
};

const NoCard:React.FC<NoCardProps> = ({cardHeading, cardDescription, cardButton}) => {
    
    return (
        <div className='flex flex-col gap-3 items-center justify-center border-2 border-dashed border-spacing-6 border-gray-400 rounded-lg h-36 w-96 text-dark-layer-1'>
            <h2 className='font-semibold text-2xl'>
                {cardHeading}
            </h2>
                {cardButton ? <button className='bg-primary-blue hover:bg-blue-600 text-white border-b2 h-10 min-w-[8rem] rounded-lg border border-b2 shadow-md'> Refresh </button> : <p className='font-semibold text-xl'>{cardDescription}</p>}
        </div>
    )
}
export default NoCard;