import contestDetails from "../contest/contestDetails";
import classroomParticipant from "./classroomParticipantDetails";

export type classrooms = {
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

export default classrooms;