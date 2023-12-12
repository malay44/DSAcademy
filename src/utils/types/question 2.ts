import { Timestamp } from "firebase/firestore";


export type questionDetails = {
    id: string;
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

export default questionDetails;