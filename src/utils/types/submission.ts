import { Timestamp } from "firebase/firestore";

type submission = {
    submissionId: number;
    questionId: number;
    participantId: number;
    code: string;
    languageId: number;
    language: string;
    verdict: string;
    createdAt: Timestamp;
};


export default submission;