import { Timestamp } from "firebase/firestore";
import contestDetails from "../contest/contestDetails";
// import classroomParticipant from "./classroomParticipantDetails";

export type discussion = {
    discussionId: string;
    creatorId: string;
    createdAt: Timestamp;
    content: string;
    comments: string[];
};

export type announcement = {
    createdAt: Timestamp;
    content: string;
};

export type classrooms = {
    classroomId: string;     // PK
    creatorId: string;      // FK from userID
    classroomName: string;  
    section: number;
    description: string;
    createdAt: Date;
    participants: string[];
    contests: string[];
    code: string;
    announcements: announcement[];
    discussions: discussion[];
};

export default classrooms;