import NoCard from '@/components/Cards/NoCard';
import List from '@/components/List/List';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import ClassNavBelow from '@/components/Navbar/ClassNavBelow';
import Announcement from '@/components/Stream/Announcement';
import Banner from '@/components/Stream/Banner';
import CreateAnnouncement from '@/components/Stream/CreateAnnouncement';
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

type class1Props = {

};

const Class1: React.FC<class1Props> = () => {
    const [announcements, setAnnouncements] = useState<{ text: string; dateTime: string }[]>([]);

    const handleAddAnnouncement = (text: string) => {
      const newAnnouncements = [...announcements, { text, dateTime: new Date().toLocaleString() }];
      setAnnouncements(newAnnouncements);
    };
    const router = useRouter();
    const { classId } = router.query;

    const [classroomDetails, setClassroomDetails] = useState<classroomDetails>({} as classroomDetails);
    const [contests, setContests] = useState<contestDetails[]>([] as contestDetails[]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getClassroomData = async () => {
            const userRef = doc(firestore, "users", user!.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const classroomsId = await userDoc.data().classrooms;
                if (!classroomsId || classroomsId.length === 0) return;
                console.log(classroomsId)

                const classroomref = doc(firestore, 'classrooms', classId as string);
                const classroomDocs = await getDoc(classroomref);
                if (!classroomDocs.exists()) return;
                setClassroomDetails(classroomDocs.data() as classroomDetails);

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

            }
            else {
                console.log('userDoc does not exist');
                toast.error("cannot find userDoc", { position: "top-left", theme: "dark" });
            }
        };

        if (user) {
            getClassroomData();
        }
        if (!user) setClassroomDetails({} as classroomDetails);
    }, [user]);


    return <>
        <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
            <Topbar />
            <ClassNavAbove classroomName={classroomDetails.classroomName} classroomId={classroomDetails.classroomId} />
            <ClassNavBelow />

            {/* Stream  */}

            <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>
            <Banner/>
            <div className='flex gap-7 w-full'>
                <div className='relative flex flex-col gap-5 w-4/5 '>
                    <CreateAnnouncement onAddAnnouncement={handleAddAnnouncement}/>
                    {announcements.map((announcement, index) => (
                      <Announcement key={index} text={announcement.text} dateTime={announcement.dateTime} />
                    ))}
                    {announcements.length === 0 && (<div className='flex items-center justify-center  p-5'>
                            <div className='border-2 border-dashed p-4 rounded-lg'>
                                <h3 className='text-dark-gray-6 font-medium text-lg'>
                                    No Announcement
                                </h3>
                            </div>
                        </div>)}
                </div>
                <div className='flex flex-col gap-3 w-1/5 '>
                    <Upcoming/>
                </div>
            </div>
        </div>

            {/* Classwork */}

            {/* <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>
                <div className='border-b-2 border-b1 pb-2'>
                    <h2 className='text-primary-blue text-xl font-semibold'>Contests</h2>
                </div>
                {contests && contests.map((contest) => (
                    <Link key={contest.contestId} href={`${router.pathname}/${contest.contestId}`}>
                      <List title={contest.description} dueDate={"due on " + contest.startTime.toDate().toUTCString()} />
                  </Link>
                ))}
            </div> */}

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
export default Class1;