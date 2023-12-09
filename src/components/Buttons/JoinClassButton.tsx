import React from 'react';

type JoinClassButtonProps = {
    
};

const JoinClassButton:React.FC<JoinClassButtonProps> = () => {
    
    return (
        <button className='h-10 min-w-[8rem] rounded-lg border border-b2 bg-primary-blue text-white shadow-md hover:bg-hover-primary-blue focus:outline-none focus:ring focus:ring-b3' >
                Join Class
        </button>)
}
export default JoinClassButton;