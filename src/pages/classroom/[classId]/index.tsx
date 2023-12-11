import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import ClassNavBelow from '@/components/Navbar/ClassNavBelow';
import Announcement from '@/components/Stream/Announcement';
import Banner from '@/components/Stream/Banner';
import CreateAnnouncement from '@/components/Stream/CreateAnnouncement';
import Upcoming from '@/components/Stream/Upcoming';
import Topbar from '@/components/Topbar/Topbar';
import { auth, firestore } from '@/firebase/firebase';
import classroomDetails, { announcement } from '@/utils/types/classroom/classroomDetails';
import { Timestamp, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { userTypeState } from '@/atoms/userTypeAtom';
import { useRecoilState } from 'recoil';

type class1Props = {

};

const Class1: React.FC<class1Props> = () => {
    const [announcements, setAnnouncements] = useState<announcement[]>([]);

    const handleAddAnnouncement = (text: string) => {
        const newAnnouncements = [{ content: text, createdAt: Timestamp.now() }, ...announcements] as announcement[];
        const classroomRef = doc(firestore, 'classrooms', classId as string);
        setDoc(classroomRef, { announcements: newAnnouncements }, { merge: true });
        setAnnouncements(newAnnouncements);
    };
    const router = useRouter();
    const { classId } = router.query;
    const [loading, setLoading] = useState(true);
    const [classroomDetails, setClassroomDetails] = useState<classroomDetails>({} as classroomDetails);
    const [usertype, setUserType] = useRecoilState(userTypeState);
    const [user] = useAuthState(auth);

    useEffect(() => {
        let unsubscribe = () => { };
        const getClassroomData = async () => {
            setLoading(true);
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
                classroomDocs.data().creatorID === user!.uid ? setUserType('teacher') : setUserType('student');

                // getting Announcements data
                // if (!classroomDocs.data().announcements || classroomDocs.data().announcements.length === 0) {
                //     console.log('no announcements');
                //     return;
                // };
                // setAnnouncements(classroomDocs.data().announcements);
                const classroomRef = doc(firestore, 'classrooms', classId as string);
                unsubscribe = onSnapshot(classroomRef, (doc) => {
                    if (!doc.exists()) {
                        console.log('no announcements');
                        return;
                    }
                    const classroomData = doc.data() as classroomDetails;
                    if (!classroomData.announcements || classroomData.announcements.length === 0) {
                        console.log('no announcements');
                        return;
                    }
                    console.log('Announcements:', classroomData.announcements);
                    setAnnouncements(classroomData.announcements);
                });
                setLoading(false);
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

        return () => {
            unsubscribe();
            console.log('unsubscribed');
        }
    }, [user]);


    return <>
        <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
            <Topbar />
            <ClassNavAbove classroomName={classroomDetails.classroomName} classroomId={classroomDetails.classroomId} />
            <ClassNavBelow />

            {/* Stream  */}

            <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3 '>
                <Banner />
                <div className='flex gap-7 w-full'>
                    <div className='relative flex flex-col gap-5 w-4/5 '>
                        {usertype == 'teacher' && <CreateAnnouncement onAddAnnouncement={handleAddAnnouncement} />}
                        {announcements.map((announcement, index) => (
                            <Announcement key={index} text={announcement.content} dateTime={announcement.createdAt.toDate().toUTCString()} />
                        ))}
                        {announcements.length === 0 && (<div className='flex items-center justify-center  p-5'>
                            <div className='border-2 border-dashed p-4 rounded-lg'>
                                <h3 className='text-dark-gray-6 font-medium text-lg'>
                                    {loading ? "loading.." : "No Announcement"}
                                </h3>
                            </div>
                        </div>)}
                    </div>
                    <div className='flex flex-col gap-3 w-1/5 '>
                        <Upcoming />
                    </div>
                </div>
            </div>
        </main>
    </>
}
export default Class1;