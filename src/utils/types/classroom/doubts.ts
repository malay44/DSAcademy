
type doubt = {
    doubtId: string;
    content: string;
    comments: string[];
    userId: string;  // FK for user
};

export default doubt;