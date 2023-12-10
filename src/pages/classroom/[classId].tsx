import List from '@/components/List/List';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import ClassNavBelow from '@/components/Navbar/ClassNavBelow';
import Topbar from '@/components/Topbar/Topbar';
import { auth, firestore } from '@/firebase/firebase';
import classroomDetails from '@/utils/types/classroom/classroomDetails';
import contestDetails from '@/utils/types/contest/contestDetails';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { get } from 'http';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type class1Props = {

};

const Class1: React.FC<class1Props> = () => {
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
            <ClassNavAbove classroomName={classroomDetails.classroomName} />
            <ClassNavBelow />

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
                <div className='border-b-2 border-b1 pb-2'>
                    <h2 className='text-primary-blue text-xl font-semibold'>Contests</h2>
                </div>
                {contests && contests.map((contest) => (
                    <List key={contest.contestId} title={contest.description} dueDate={"due on " + contest.startTime.toDate().toUTCString()} />
                ))}
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
export default Class1;