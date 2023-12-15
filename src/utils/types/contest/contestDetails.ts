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
    creatorId: string;
    name: string;
    questions: questionDetails[];    // store question IDs
    participants: contestParticipantDetails[];
    createdAt: Timestamp;
    startTime: Timestamp;
    endTime: Timestamp;
    classroomName: string;
    classroomId: string;
};

export default contestDetails;