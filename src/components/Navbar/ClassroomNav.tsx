import Link from "next/link";
import React, { useState } from "react";
import JoinClassButton from "../Buttons/JoinClassButton";
import Button from "../Buttons/Button";
import CreateClass from "@/components/Modals/CreateClass";
import { toast } from "react-toastify";
import { DocumentData, DocumentReference, Timestamp, arrayUnion, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import classrooms from "@/utils/types/classroom/classroomDetails";

type ClassroomNavProps = {
  userData: DocumentData;
  userRef: DocumentReference<DocumentData> | undefined;
};

const ClassroomNav: React.FC<ClassroomNavProps> = ({userData, userRef}) => {
  const [isCreateClassModalOpen, setCreateClassModalOpen] = useState(false);

  const openCreateClassModal = () => {
    setCreateClassModalOpen(true);
  };

  const closeCreateClassModal = () => {
    setCreateClassModalOpen(false);
  };

  const [className, setClassName] = useState('');
  const [discription, setdiscription] = useState('');
  const [classCode, setClassCode] = useState('');

  const handleClassNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClassName(event.target.value);
    console.log(className)
  };

  const handleDiscriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setdiscription(event.target.value);
    console.log(discription)
  };

  const handleCreateClassClick = () => {
    console.log('clicked');
    // validation
    if (className === '') {
      toast.error('class name is empty');
      return;
    }
    if (discription === '') {
      toast.error('discription is empty');
      return;
    }
    // add to firestore with auto generated id
    const newClassroomRef = doc(collection(firestore, 'classrooms'));
    const classroomWithId: classrooms = {
      classroomId: newClassroomRef.id,
      creatorId: userData.uid,
      classroomName: className,
      section: 0,
      description: discription,
      createdAt: Timestamp.now(),
      participants: [{userId: userData.uid, role: 'teacher'}],
      contests: [],
      code: newClassroomRef.id,
      announcements: [],
      discussions: [],
    };
    setDoc(newClassroomRef, classroomWithId);
    setClassCode(newClassroomRef.id);

    // add classroom id to user
    userRef ? setDoc(userRef, {classrooms: arrayUnion(newClassroomRef.id)}, {merge: true}) : console.log('userRef is undefined');
    // setCreateClassModalOpen(false);
  };

  return (<nav className='relative flex h-[56px] w-full shrink-0 items-center px-10 bg-white dark:bg-dark-layer-1 text-dark-gray-6 dark:text-dark-gray-7'>
    <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto `}>
      <Link style={{ font: 'Source Code Pro', color: '#767676' }} href='/classroom' className='h-[22px] flex-1'>
        <p className="font-semibold text-xl"> Classroom </p>
      </Link>

      <div className="flex gap-14 space-x-4 ">
        <div className="flex gap-4">
          <JoinClassButton />
        </div>
        <Button onClick={openCreateClassModal}>Create Class</Button>
      </div>
    </div>
    {isCreateClassModalOpen && (
      <CreateClass classCode={classCode} onClose={closeCreateClassModal} className={className} handleClick={handleCreateClassClick} discription={discription} handleClassNameChange={handleClassNameChange} handleDiscriptionChange={handleDiscriptionChange} />
    )}
  </nav>
  );
};
export default ClassroomNav;
