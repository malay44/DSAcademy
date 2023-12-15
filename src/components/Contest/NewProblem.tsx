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
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
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
                label="testcases_sol"
                variant="secondary"
                placeholder="Enter testcases solution"
                required
                name="testcases_sol"
                value={formData.testcases_sol}
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
                    <div className='w-2/5'>
                    <Input
                        
                        label="Start Date"
                        variant="primary"
                        placeholder="Enter start date"
                        required
                        name="StartDate"
                        value={formData.Points}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className='w-2/5'>
                    <Input
                        label="EndDate"
                        variant="primary"
                        placeholder="Enter end date"
                        required
                        name="EndDate"
                        value={formData.Points}
                        onChange={handleInputChange}
                    />
                    </div>
            </div>

            <div className="flex justify-between">
                    <div className='w-2/5'>
                    <Input
                        label="Start Time"
                        variant="primary"
                        placeholder="Enter start time"
                        required
                        name="StartTime"
                        value={formData.Points}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className='w-2/5'>
                    <Input
                        label="EndTime"
                        variant="primary"
                        placeholder="Enter end time"
                        required
                        name="EndTime"
                        value={formData.Points}
                        onChange={handleInputChange}
                    />
                    </div>
            </div>

                <div className='flex items-center justify-between'>
                    <div className='w-2/5'>
                        <Input
                            label="Points"
                            variant="primary"
                            placeholder=""
                            required
                            name="Points"
                            value={formData.Points}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='gap-6 flex items-center justify-evenly'>
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
