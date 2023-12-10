import React, { useState } from 'react';
import { firestore } from '@/firebase/firebase';

import { questionDetails } from '@/utils/types/question';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';

export default function AddProblem() {
    const [problem, setProblem] = useState<questionDetails>({
        questionId: 0,
        creatorId: 0,
        Name: '',
        Description: '',
        Points: 0,
        updatedAt: Timestamp.now(),
        editorialCode: '',
        testcases: '',
        testcases_sol: '',
        difficultyLevel: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProblem((prevProblem) => ({
            ...prevProblem,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Add logic to handle form submission
            addDoc(collection(firestore, 'problems'), problem);
            console.log('Problem added successfully!');
        } catch (error) {
            console.error('Error adding problem:', error);
        }
    };

    return (
        <div>
            <h1>Add Problem</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="Name"
                        value={problem.Name}
                        onChange={handleInputChange}
                    />
                </label>
                <br /><br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="Description"
                        value={problem.Description}
                        onChange={handleInputChange}
                    />
                </label>
                <br /><br />
                <label>
                    Points:
                    <input
                        type="number"
                        name="Points"
                        value={problem.Points}
                        onChange={handleInputChange}
                    />
                </label>
                <br /><br />
                <label>
                    Difficulty Level:
                    <input
                        type="text"
                        name="difficultyLevel"
                        value={problem.difficultyLevel}
                        onChange={handleInputChange}
                    />
                </label>
                <br /><br />
                <button type="submit">Add Problem</button>
            </form>
        </div>
    );
}