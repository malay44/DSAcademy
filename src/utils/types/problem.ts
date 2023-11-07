export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// local problem data
export type Problem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	problemStatement: string;
	examples: Example[];
	constraints: Array<string> | string;
	input: string;
	answer: string;
	likes?: number;
	dislikes?: number;
	order?: number;
	videoId?: string;
	link?: string;
	// for backweard compatibility
	starterCode?: string;
	handlerFunction?: string;
	starterFunctionName?: string;
};

export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
};
