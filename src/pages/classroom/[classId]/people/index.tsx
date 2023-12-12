import List from '@/components/List/List';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import ClassNavBelow from '@/components/Navbar/ClassNavBelow';
import Topbar from '@/components/Topbar/Topbar';
import { auth, firestore } from '@/firebase/firebase';
import classroomDetails from '@/utils/types/classroom/classroomDetails';
import classroomParticipant from '@/utils/types/classroom/classroomParticipantDetails';
import contestDetails from '@/utils/types/contest/contestDetails';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type PeopleProps = {};

const People: React.FC<PeopleProps> = () => {
    const router = useRouter();
    const { classId } = router.query;

    const [classDetails, setClassDetails] = useState<classroomDetails>({} as classroomDetails);
    const [student, setStudent] = useState<string[]>([] as string[]);
    const [faculty, setFaculty] = useState<string[]>([] as string[]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getClassroomData = async () => {
            const userRef = doc(firestore, "users", user!.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {

                const classroomRef = doc(firestore, 'classrooms', classId as string);
                const classroomDocs = await getDoc(classroomRef);
                if (!classroomDocs.exists()) return;
                setClassDetails(classroomDocs.data() as classroomDetails);

                // getting participants data
                if (!classroomDocs.data().participants || classroomDocs.data().participants.length === 0) {
                    console.log('no participants');
                    return;
                };
                console.log(classroomDocs.data().participants);
                const studentArray: string[] = [];
                const facultyArray: string[] = [];
                classroomDocs.data().participants.forEach((participant: classroomParticipant) => {
                    if (participant.role === 'student') studentArray.push(participant.userId);
                    else facultyArray.push(participant.userId);
                });
                // get names of all the students
                const studentQuery = query(
                    collection(firestore, 'users'),
                    where('uid', 'in', studentArray)
                );
                const studentDocs = await getDocs(studentQuery);
                const studentNames: string[] = [];
                studentDocs.docs.forEach(doc => {
                    studentNames.push(doc.data().displayName);
                });
                setStudent(studentNames);
                // get names of all the faculty
                const facultyQuery = query(
                    collection(firestore, 'users'),
                    where('uid', 'in', facultyArray)
                );
                const facultyDocs = await getDocs(facultyQuery);
                const facultyNames: string[] = [];
                facultyDocs.docs.forEach(doc => {
                    facultyNames.push(doc.data().displayName);
                });
                setFaculty(facultyNames);
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
                <ClassNavAbove classroomName={classDetails.classroomName} classroomId={classDetails.classroomName} />
                <ClassNavBelow />
                <div className='flex-1 w-full max-w-[1200px] mx-auto py-5 flex flex-col gap-3 '>
                    <div className='border-b-2 border-b1 pb-2'>
                        <h2 className='text-primary-blue text-xl font-semibold'>Faculty</h2>
                    </div>
                    <Link key={"Faculty Name"} href={"Faculty ID"}>
                        {faculty.map((name) => (
                            <List key={name} title={name} dueDate={""} />
                        ))}
                    </Link>
                    <div className='border-b-2 border-b1 pb-2'>
                        <h2 className='text-primary-blue text-xl font-semibold'>Students</h2>
                    </div>
                    <Link key={"Name"} href={"Student ID"}>
                        {student.map((name) => (
                            <List key={name} title={name} dueDate={""} />
                        ))}
                    </Link>
                    
                </div>
            </main>
        </>
    );
};

export default People;
