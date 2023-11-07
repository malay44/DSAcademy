// dproblem/[pid].tsx
"use client";
import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { firestore } from "@/firebase/firebase";
import { Problem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type ProblemPageProps = {
};

const ProblemPage: React.FC<ProblemPageProps> = () => {
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState<Problem>({} as Problem);

    const { pid } = useRouter().query;

	useEffect(() => {
		const getProblems = async () => {
			setLoading(true);
            try {
                const problemRef = doc(firestore, "problems", pid as string);
                const result = await getDoc(problemRef);
                if (!result.exists()) {
                    // display default 404 page
                    return;
                }
                const data = result.data();
                console.log(data);
                setProblem(data as Problem);
                setLoading(false);
              } catch (error) {
                console.error('Error fetching Firestore document:', error);
              }
			// fetching data logic
		};

		getProblems();
	}, [pid, setLoading]);

	return (
		<div>
			<Topbar problemPage />
			{ !loading && <Workspace problem={problem} /> }
		</div>
	);
};
export default ProblemPage;
