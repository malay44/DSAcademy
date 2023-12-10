import { Timestamp } from "firebase/firestore";
import Userdetails from "./userDetails";
import submission from "./submission";

export type questionDetails = {
    questionId: number;
    creatorId: Userdetails;
    Name: string;
    Description: string;
    Points: number;
    updatedAt: Timestamp;
    editorialCode: string;
    testcases: string;
    testcases_sol: string;
    difficultyLevel: string;
};