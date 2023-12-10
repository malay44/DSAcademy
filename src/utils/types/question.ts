import { Timestamp } from "firebase/firestore";


export type questionDetails = {
    questionId: string;
    creatorId: string;
    Name: string;
    Description: string;
    inputFormat: string;
    outputFormat: string;
    Points: number;
    updatedAt: Timestamp;
    editorialCode: string;
    testcases: string;
    testcases_sol: string;
    difficultyLevel: string;
};