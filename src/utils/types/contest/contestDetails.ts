import { Timestamp } from "firebase/firestore";
import { questionDetails } from "../question";
import Userdetails from "../userDetails";
import submission from "../submission";

type contestParticipantDetails = {
    userId: Userdetails;
    points: number;
    submissions: submission[];
    rank: number;
};

type contestDetails = {
    contestId: number;
    creator: Userdetails;
    description: string;
    questions: questionDetails[];
    participants: contestParticipantDetails[];
    createdAt: Date;
    startTime: Timestamp;
    endTime: Timestamp;
};

export default contestDetails;