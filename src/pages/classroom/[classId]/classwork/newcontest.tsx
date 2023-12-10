import Button from '@/components/Buttons/Button';
import Input from '@/components/Contest/Input';
import NewContestQuestionTable from '@/components/Contest/NewContestQuestionTable';
import NewProblem from '@/components/Contest/NewProblem';
import DropdownMenu from '@/components/DropDownMenu/DropdownMenu';
import ClassNavAbove from '@/components/Navbar/ClassNavAbove';
import Topbar from '@/components/Topbar/Topbar';
import React from 'react';

type NewcontestProps = {
    
};

const Newcontest:React.FC<NewcontestProps> = () => {
    const questionsData = [
        { name: 'Question 1', points: 10 },
        { name: 'Question 2', points: 15 },
        // ... other questions
      ];
      
    return <>
    <main className='flex flex-col bg-white dark:bg-dark-layer-2 h-screen '>
        <Topbar />
        <ClassNavAbove/>
        <div className='flex-1 w-full max-w-[1200px] mx-auto  py-5 flex flex-col gap-3  pr-3  overflow-auto'>
        <Input label="Contest Name" variant="primary" placeholder="Enter contest name" required />
        <div className='flex justify-between items-center border-b-2 b border-primary-blue pb-2'>
            <h3 className='text-primary-blue font-medium text-xl'>Questions</h3>
            <Button>Add New</Button>
        </div>
        { questionsData && (<NewContestQuestionTable questions={questionsData}/>) }
        <NewProblem/>
        
        </div>
    </main>
    </>
}
export default Newcontest;