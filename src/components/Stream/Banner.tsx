import React from 'react';

type BannerProps = {
    
};

const Banner:React.FC<BannerProps> = () => {
    
    return <div className='w-full h-56 rounded-xl p-10 bg-b1 flex flex-col justify-end gap-2 text-white'>
        <h2 className='font-semibold text-3xl'>
            Class 1
        </h2>
        <p className='font-medium text-lg'>Section 3</p>
    </div>
}
export default Banner;