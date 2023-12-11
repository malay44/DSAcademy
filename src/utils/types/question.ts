import { Timestamp } from "firebase/firestore";


export type questionDetails = {
    creatorId: string;
    Name: string;
    questionId: string;
    Description: string;
    inputFormat: string;
    outputFormat: string;
    Points: number;
    updatedAt: Timestamp;
    editorialCode: string;
    testcases: string;
    testcases_sol: string;
    difficultyLevel: string;
    tag: string;
};