import { Timestamp } from "firebase/firestore";

type submission = {
    submissionId: string;
    questionId: string;
    participantId: string;
    code: string;
    languageId: number;
    language: string;
    verdict: string;
    createdAt: Timestamp;
};


export default submission;