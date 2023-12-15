import Card from '@/components/Cards/Card';
import NoCard from '@/components/Cards/NoCard';
import ClassroomNav from '@/components/Navbar/ClassroomNav';
import Topbar from '@/components/Topbar/Topbar';
import { auth } from '@/firebase/firebase';
import { collection, query, where, doc, getDoc, getDocs, DocumentData, DocumentReference } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import classroomDetails from '@/utils/types/classroom/classroomDetails';
import { toast } from 'react-toastify';

const Classroom: React.FC = () => {

  const [classrooms, setClassrooms] = useState<classroomDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<DocumentData>({});
  const [userRef, setUserRef] = useState<DocumentReference<DocumentData>>();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getEnrolledClassrooms = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      setUserRef(userRef);
      setLoading(true);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data());
        const classroomsId = await userDoc.data().classrooms;
        if (!classroomsId || classroomsId.length === 0) return;
        console.log(classroomsId)

        const classroomsQuery = query(
          collection(firestore, 'classrooms'),
          where('classroomId', 'in', classroomsId)
        );
        const classroomDocs = await getDocs(classroomsQuery);
        setClassrooms(classroomDocs.docs.reverse().map(doc => doc.data()) as classroomDetails[]);
        console.log(classroomDocs.docs.map(doc => doc.data()));
        setLoading(false);
      }
      else {
        console.log('userDoc does not exist');
        toast.error("cannot find userDoc", { position: "top-left", theme: "dark" });
      }
    };

    if (user) getEnrolledClassrooms();
    if (!user) setClassrooms([]);
  }, [user]);


  return (
    <>
      <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen'>
        <Topbar />
        <ClassroomNav userData={userData} userRef={userRef}/>
        <div className={`flex-1 w-full max-w-[1200px] mx-auto  py-5 flex ${classrooms.length===0 ? 'items-center justify-center' : 'items-start justify-between'}  `}>
          {classrooms.length === 0 && <NoCard cardHeading={loading ? 'loading...' : 'No Class :('} cardDescription={loading ? 'Please Wait for a bit' : 'Join class or Create a new Class'} cardButton={false}/>}
          {classrooms.map((classroom) => (
            <Card key={classroom.classroomId} classroom={classroom} />
          ))}
        </div>

      </main>
    </>
  );
};

export default Classroom;