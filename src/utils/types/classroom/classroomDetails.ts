import contestDetails from "../contest/contestDetails";
import classroomParticipant from "./classroomParticipantDetails";

export type classroomDetails = {
    classroomId: string;     // PK
    creatorId: string;      // FK from userID
    classroomName: string;  
    section: number;
    description: string;
    createdAt: Date;
    participants: classroomParticipant[];
    contests: string[];
    code: string;
};