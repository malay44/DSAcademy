import List from '@/components/List/List';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import ClassNavBelow from '@/components/Navbar/ClassNavBelow';
import Announcement from '@/components/Stream/Announcement';
import Banner from '@/components/Stream/Banner';
import CreateAnnouncement from '@/components/Stream/CreateAnnouncement';
import Upcoming from '@/components/Stream/Upcoming';
import Topbar from '@/components/Topbar/Topbar';
import React from 'react';

type class1Props = {
    
};

const class1:React.FC<class1Props> = () => {
    
    return <>
    <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
        <Topbar />
        <ClassNavAbove/>
        <ClassNavBelow/>

        {/* Stream  */}

        {/* <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>
            <Banner/>
            <div className='flex gap-7 w-full'>
                <div className='relative flex flex-col gap-5 w-4/5 '>
                    <CreateAnnouncement/>
                    <Announcement/>
                </div>
                <div className='flex flex-col gap-3 w-1/5 '>
                    <Upcoming/>
                </div>
            </div>
        </div> */}

        {/* Classwork */}

        <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>
            <List/>
        </div>

        {/* People */}

        {/* <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>

        </div> */}
        
        {/* Discussion */}

        {/* <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>

        </div> */}
        
        {/* Grades */}

        {/* <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>

        </div> */}

      </main>
    </>
}
export default class1;