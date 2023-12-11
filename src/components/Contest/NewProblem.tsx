import React from 'react';
import Input from './Input';
import DropdownMenu from '../DropDownMenu/DropdownMenu';
import Button from '../Buttons/Button';
import { questionDetails } from '@/utils/types/question';

type NewProblemProps = {
    formData: questionDetails;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e:any) => void;
};

const NewProblem: React.FC<NewProblemProps> = ({formData, handleInputChange, handleSubmit} : NewProblemProps) => {

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Question Name"
                variant="primary"
                placeholder="Enter question name"
                required
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
            />
            <Input
                label="Description"
                variant="secondary"
                placeholder="Enter description"
                required
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
            />
            <Input
                label="Input Format"
                variant="secondary"
                placeholder=""
                required
                name="inputFormat"
                value={formData.inputFormat}
                onChange={handleInputChange}
            />
            <Input
                label="Output Format"
                variant="secondary"
                placeholder=""
                required
                name="outputFormat"
                value={formData.outputFormat}
                onChange={handleInputChange}
            />
            <Input
                label="Testcases"
                variant="secondary"
                placeholder="Enter test cases"
                required
                name="testcases"
                value={formData.testcases}
                onChange={handleInputChange}
            />
            <Input
                label="Output"
                variant="secondary"
                placeholder="Enter Output"
                required
                name="outputFormat"
                value={formData.outputFormat}
                onChange={handleInputChange}
            />
            <Input
                label="Code"
                variant="secondary"
                placeholder="Enter code"
                required
                name="editorialCode"
                value={formData.editorialCode}
                onChange={handleInputChange}
            />
            <div className="flex justify-between">
                <div className="flex justify-between w-1/5">
                    <h3 className="text-gray-700 font-medium text-lg">Points</h3>
                    <DropdownMenu />
                </div>
                <div className="flex gap-4">
                    <Button className="h-10 min-w-[8rem] rounded-lg border-2 bg-dark-gray-9 shadow-md">
                        Close
                    </Button>
                    <Button
                        type='submit'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default NewProblem;
