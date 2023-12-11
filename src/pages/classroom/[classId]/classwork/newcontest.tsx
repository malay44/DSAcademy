import Button from '@/components/Buttons/Button';
import Input from '@/components/Contest/Input';
import NewContestQuestionTable from '@/components/Contest/NewContestQuestionTable';
import NewProblem from '@/components/Contest/NewProblem';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import Topbar from '@/components/Topbar/Topbar';
import { firestore } from '@/firebase/firebase';
import classrooms from '@/utils/types/classroom/classroomDetails';
import { questionDetails } from '@/utils/types/question';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type NewcontestProps = {

};

const Newcontest: React.FC<NewcontestProps> = () => {

    const [classroomDetails, setClassroomDetails] = useState<classrooms>({} as classrooms);

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
        console.log("contest name: " + contestName);
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
        console.log(formData);
    };

    const [questionsData, setQuestionsData] = useState<questionDetails[]>([]);

    const handleAddNewQuestion = (e) => {
        e.preventDefault();
        setQuestionsData((prevQuestionsData) => [...prevQuestionsData, formData]);
        console.log("form submitted: ", questionsData);
    }

    return <>
        <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen '>
            <Topbar />
            <ClassNavAbove classroomId={classroomDetails.classroomId} classroomName={classroomDetails.classroomName} />
            <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3  pr-3  overflow-auto'>
                <Input
                    onChange={handleContestNameChange}
                    label="Contest Name"
                    variant="primary"
                    placeholder="Enter contest name"
                    required
                />
                <div className='flex justify-between items-center border-b-2 b border-primary-blue pb-2'>
                    <h3 className='text-primary-blue font-medium text-xl'>Questions</h3>
                    <Button>Add New</Button>
                </div>
                {questionsData && (<NewContestQuestionTable questions={questionsData} />)}
                <NewProblem formData={formData} handleInputChange={handleFormInputChange} handleSubmit={handleAddNewQuestion} />

            </div>
        </main>
    </>
}
export default Newcontest;