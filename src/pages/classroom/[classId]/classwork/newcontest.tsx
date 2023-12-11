"use client";
import Button from '@/components/Buttons/Button';
import Input from '@/components/Contest/Input';
import NewContestQuestionTable from '@/components/Contest/NewContestQuestionTable';
import NewProblem from '@/components/Contest/NewProblem';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import Topbar from '@/components/Topbar/Topbar';
import { auth, firestore } from '@/firebase/firebase';
import classrooms from '@/utils/types/classroom/classroomDetails';
import contestDetails from '@/utils/types/contest/contestDetails';
import { questionDetails } from '@/utils/types/question';
import { time } from 'console';
import { Timestamp, collection, doc, getDoc, runTransaction, serverTimestamp, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type contDet = Omit<contestDetails, 'questions'> & { questions: string[] };

const Newcontest = () => {

    const [classroomDetails, setClassroomDetails] = useState<classrooms>({} as classrooms);
    const [user] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (router && router.query && router.query.classId) {
            const classroomRef = doc(firestore, "classrooms", router.query.classId as string);
            getDoc(classroomRef).then((doc) => {
                if (doc.exists()) {
                    console.log("Document data:", doc.data());
                    setClassroomDetails(doc.data() as classrooms);
                }
                else {
                    console.log("No such document!");
                }
            }
            ).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [router, router.query.classId]);

    const [contestName, setContestName] = useState<string>('');

    const handleContestNameChange = (event: any) => {
        event.preventDefault();
        setContestName(event.target.value);
        // console.log("contest name: " + contestName);
    }

    const [formData, setFormData] = useState<questionDetails>({
        questionId: '',
        creatorId: '',
        Name: '',
        Description: '',
        inputFormat: '',
        outputFormat: '',
        Points: 0,
        updatedAt: Timestamp.now(),
        editorialCode: '',
        testcases: '',
        testcases_sol: '',
        difficultyLevel: '',
    });

    const handleFormInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        // console.log(formData);
    };

    const [questionsData, setQuestionsData] = useState<questionDetails[]>([]);

    const handleAddNewQuestion = (e: any) => {
        e.preventDefault();
        setQuestionsData((prevQuestionsData) => [...prevQuestionsData, formData]);
        // console.log("form submitted: ", questionsData);
    };

    const handleAddContest = async (e: any) => {
        e.preventDefault();
    
        try {
            // Validate contest name
            if (!contestName) {
                toast.error('Enter contest name');
                return;
            }
    
            // Validate questions
            if (questionsData.length === 0) {
                toast.error('Add at least one question');
                return;
            }
    
            // Validate user
            if (!user) {
                return;
            }
    
            const contestRef = doc(collection(firestore, 'contest'));
            const contestId = contestRef.id;
            const classroomRef = doc(firestore, 'classrooms', classroomDetails.classroomId);
            const questionsId: string[] = [];
    
            // Use a batch to add questions atomically
            const batch = writeBatch(firestore);
            questionsData.forEach((question) => {
                const questionRef = doc(collection(firestore, 'questions'));
                questionsId.push(questionRef.id);
                batch.set(questionRef, { ...question, questionId: questionRef.id, creatorId: user.uid });
            });
            await batch.commit();
            console.log('Questions added successfully');
    
            const contestData: contDet = {
                contestId: contestId,
                creatorId: user.uid,
                name: contestName,
                questions: questionsId,
                participants: [],
                createdAt: Timestamp.now(),
                startTime: Timestamp.now(),
                endTime: Timestamp.now(),
                classroomId: classroomDetails.classroomId,
                classroomName: classroomDetails.classroomName,
            };
    
            // Use a transaction to ensure atomicity
            await runTransaction(firestore, async (transaction) => {
                // Set contest data
                await setDoc(contestRef, contestData, { merge: true });
    
                // Update classroom with the new contest
                const classroomSnapshot = await transaction.get(classroomRef);
                const updatedContests = [...(classroomSnapshot.data()?.contests ?? []), contestId];
                transaction.update(classroomRef, { contests: updatedContests });
            });
    
            // Reset form data
            setContestName('');
            setQuestionsData([]);
            setFormData({} as questionDetails);
    
            console.log('Contest added successfully');
        } catch (error) {
            console.error('Error adding contest:', error);
            toast.error('Error adding contest, try again later');
        }
    };

    return <>
        <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen '>
            <Topbar />
            <ClassNavAbove classroomId={classroomDetails.classroomId} classroomName={classroomDetails.classroomName} />
            <div
                className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3  pr-3  overflow-auto'>
                <div className='flex items-center justify-between'>
                    <div className='w-4/5'>
                        <Input
                            onChange={handleContestNameChange}
                            label="Contest Name"
                            variant="primary"
                            placeholder="Enter contest name"
                            required
                        />
                    </div>
                    <div className=''>
                    <Button
                        type='submit'
                        onClick={handleAddContest}
                    >
                        Add Contest
                    </Button>
                    </div>
                </div>
                <div className='flex justify-between items-center border-b-2 b border-primary-blue pb-2'>
                    <h3 className='text-primary-blue font-medium text-xl'>Questions</h3>
                </div>
                {questionsData && (<NewContestQuestionTable questions={questionsData} />)}
                <NewProblem formData={formData} handleInputChange={handleFormInputChange} handleSubmit={handleAddNewQuestion} />

            </div>
        </main>
    </>
}
export default Newcontest;