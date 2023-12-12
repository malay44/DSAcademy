import { Timestamp } from "firebase/firestore";

type submission = {
    sid: string;
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