import { Timestamp } from "firebase/firestore";

export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};


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
    examples?: Example[];
    constraints?: Array<string> | string;
};