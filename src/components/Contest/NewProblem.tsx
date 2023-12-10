import React from 'react';
import Input from './Input';
import DropdownMenu from '../DropDownMenu/DropdownMenu';
import Button from '../Buttons/Button';

type NewProblemProps = {
    
};

const NewProblem:React.FC<NewProblemProps> = () => {
    
    return <>
    <Input label="Question Name" variant="primary" placeholder="Enter question name" required />
        <Input label="Description" variant="secondary" placeholder="Enter description" required />
        <Input label="Input Format" variant="secondary" placeholder="" required />
        <Input label="Output Format" variant="secondary" placeholder="" required />
        <Input label="Testcases" variant="secondary" placeholder="Enter test cases" required />
        <Input label="Output" variant="secondary" placeholder="Enter Output" required />
        <Input label="Code" variant="secondary" placeholder="Enter code" required />
        <div className='flex justify-between'>
            <div className='flex justify-between w-1/5'>
            <h3 className='text-gray-700 font-medium text-lg'>Points</h3>
            <DropdownMenu/>
            </div>
            <div className='flex gap-4'>
                <Button className='h-10 min-w-[8rem] rounded-lg border-2 bg-dark-gray-9 shadow-md'>Close</Button>
                <Button>Save</Button>
            </div>
        </div>
    </>
}
export default NewProblem;