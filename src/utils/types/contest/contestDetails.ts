import { Timestamp } from "firebase/firestore";
import { questionDetails } from "../question";
import Userdetails from "../userDetails";
import submission from "../submission";

type contestParticipantDetails = {
    userId: string;
    points: number;
    submissions: submission[];
    rank: number;
};

type contestDetails = {
    contestId: string;
    creator: string;
    description: string;
    questions: string[];    // store question IDs
    participants: contestParticipantDetails[];
    createdAt: Date;
    startTime: Timestamp;
    endTime: Timestamp;
};

export default contestDetails;