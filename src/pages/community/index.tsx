import Button from '@/components/Buttons/Button';
import NoCard from '@/components/Cards/NoCard';
import Chat from '@/components/Community/Chat';
import List from '@/components/List/List';
import AddPost from '@/components/Modals/AddPost';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import ClassNavBelow from '@/components/Navbar/ClassNavBelow';
import Upcoming from '@/components/Stream/Upcoming';
import Topbar from '@/components/Topbar/Topbar';
import { auth, firestore } from '@/firebase/firebase';
import classroomDetails from '@/utils/types/classroom/classroomDetails';
import contestDetails from '@/utils/types/contest/contestDetails';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { get } from 'http';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const Community: React.FC = () => {
    // const router = useRouter();
    // const { classId } = router.query;

    const [isAddPostModalOpen, setAddPostModalOpen] = useState(false);

    const openAddPostModal = () => {
      setAddPostModalOpen(true);
    };

    const closeAddPostModal = () => {
      setAddPostModalOpen(false);
    };

  return (
    <>
      <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
        <Topbar />
        <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex gap-14 mt-6  '>
          <div className='flex flex-col gap-3 w-3/4'>
            <Chat/>
            <Chat/>
          </div>
          <div className='flex flex-col w-1/4 gap-4'>
            <Button onClick={openAddPostModal}>Post</Button>
            <Upcoming/>
          </div>
        </div>
        {/* Render the AddPost modal based on the state */}
        {isAddPostModalOpen && <AddPost onClose={closeAddPostModal} />}
      </main>
    </>
  );
};

export default Community;