import Button from '@/components/Buttons/Button';
import List from '@/components/List/List';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import ClassNavBelow from '@/components/Navbar/ClassNavBelow';
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
import { FaPlus } from "react-icons/fa";

type IndexProps = {};

const Index: React.FC<IndexProps> = () => {
    const router = useRouter();
    const { classId } = router.query;

    const [classDetails, setClassDetails] = useState<classroomDetails>({} as classroomDetails);
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
                <ClassNavAbove classroomName={classDetails.classroomName} classroomId={classDetails.classroomId} />
                <ClassNavBelow />
                <div className='flex-1 w-full max-w-[1200px] mx-auto py-5 flex flex-col gap-3 '>
                    <div className='border-b-2 border-b1 pb-2'>
                        <h2 className='text-primary-blue text-xl font-semibold'>Contests</h2>
                    </div>
                    <div className='flex gap-4'>
                        <Link href={`/classroom/${classId}/classwork/newcontest`}>
                            <Button>
                                <div className='flex gap-2 items-center justify-center'>
                                    <FaPlus />
                                    <p>Contest</p>
                                </div>
                            </Button>
                        </Link>
                        <Button>
                            <div className='flex gap-2 items-center justify-center'>
                            <FaPlus />
                            <p>Assignment</p>
                            </div>
                        </Button>
                    </div>
                    {contests && contests.map((contest) => (
                        <Link key={contest.contestId} href={`/classroom/${classId}/${contest.contestId}`}>
                            <List title={contest.classroomName} dueDate={"due on " + contest.startTime.toDate().toUTCString()} />
                        </Link>
                    ))} 
                </div>
            </main>
        </>
    );
};

export default Index;
