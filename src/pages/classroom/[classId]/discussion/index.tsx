import Button from '@/components/Buttons/Button';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type IndexProps = {};

const Index: React.FC<IndexProps> = () => {
    const router = useRouter();
    const { classId } = router.query;

    const [classDetails, setClassDetails] = useState<classroomDetails>({} as classroomDetails);
    const [contests, setContests] = useState<contestDetails[]>([] as contestDetails[]);
    const [user] = useAuthState(auth);

    const [isAddPostModalOpen, setAddPostModalOpen] = useState(false);

    const openAddPostModal = () => {
      setAddPostModalOpen(true);
    };

    const closeAddPostModal = () => {
      setAddPostModalOpen(false);
    };

    useEffect(() => {
        const getClassroomData = async () => {
            const userRef = doc(firestore, "users", user!.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const classroomsId = await userDoc.data().classrooms;
                if (!classroomsId || classroomsId.length === 0) return;
                console.log(classroomsId)

                const classroomRef = doc(firestore, 'classrooms', classId as string);
                const classroomDocs = await getDoc(classroomRef);
                if (!classroomDocs.exists()) return;
                setClassDetails(classroomDocs.data() as classroomDetails);

                // getting contests data

                if (!classroomDocs.data().contests || classroomDocs.data().contests.length === 0) {
                    console.log('no contests');
                    return;
                };
                const contestsQuery = query(
                    collection(firestore, 'contest'),
                    where('contestId', 'in', classroomDocs.data().contests)
                );
                const contestDocs = await getDocs(contestsQuery);
                setContests(contestDocs.docs.map(doc => doc.data()) as contestDetails[]);
                console.log(contestDocs.docs.map(doc => doc.data()));

            } else {
                console.log('userDoc does not exist');
                toast.error("cannot find userDoc", { position: "top-left", theme: "dark" });
            }
        };

        if (user) {
            getClassroomData();
        }
        if (!user) setClassDetails({} as classroomDetails);
    }, [user, classId]);

    return (
        <>
            <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
                <Topbar />
                <ClassNavAbove classroomName={classDetails.classroomName} classroomId={ classId }/>
                <ClassNavBelow />

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
                {/* <div className='flex-1 w-full max-w-[1200px] mx-auto py-5 flex flex-col gap-3 '>
                    <div className='border-b-2 border-b1 pb-2'>
                        <h2 className='text-primary-blue text-xl font-semibold'>Discussion</h2>
                    </div>
                    
                </div> */}
            </main>
        </>
    );
};

export default Index;
