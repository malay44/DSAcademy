import contestDetails from "../contest/contestDetails";
// import classroomParticipant from "./classroomParticipantDetails";

export type classroomDetails = {
    classroomId: number;
    creatorId: number;
    classroomName: string;
    description: string;
    createdAt: Date;
    participants: string[];
    contests: string[];
};