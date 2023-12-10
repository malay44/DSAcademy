import React from 'react';
import Link from 'next/link';
import Button from '../Buttons/Button';

type ContestNavProps = {
    
};

const ContestNav:React.FC<ContestNavProps> = () => {
    
    return <nav className='relative flex h-[56px] w-full shrink-0 items-center px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
    <div className={`flex w-full items-center justify-between max-w-[1200px] h-20 mx-auto border-b-2`}>
        <div>
            <Link style={{ font: 'Source Code Pro', color: '#767676' }} href='/classroom' className='h-[22px] flex-1'>
                <p className="font-bold text-xm"> Contest 1 </p>
            </Link>
        </div>
        <div className='flex gap-14 space-x-4 '>
            <div className="flex gap-4 items-center text-xm font-semibold">
                <p>Time Remaining</p>
                <div className='flex'>
                    <div className='border-2 p-1'>
                        02Hrs
                    </div>
                    <div className='border-2 p-1'>
                        59Min
                    </div>
                    <div className='border-2 p-1'>
                        59Sec
                    </div>
                </div>
            </div>
            <Button>Exit Contest</Button>
        </div>
    </div>
</nav>
}
export default ContestNav;