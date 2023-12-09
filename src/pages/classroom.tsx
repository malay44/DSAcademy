import Card from '@/components/Cards/Card';
import NoCard from '@/components/Cards/NoCard';
import ClassroomNav from '@/components/Navbar/ClassroomNav';
import Topbar from '@/components/Topbar/Topbar';
import React from 'react';

const Classroom: React.FC = () => {
  return (
    <>
      <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
        <Topbar />
        <ClassroomNav />

        <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex  items-start gap-14  '>
          <Card />
          <Card />
        </div>

        {/* <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex items-center justify-center '>
          <NoCard />
        </div> */}

      </main>
    </>
  );
};

export default Classroom;