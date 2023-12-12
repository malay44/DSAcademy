// dproblem/[pid].tsx
"use server";
import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { firestore } from "@/firebase/firebase";
import Problem from "@/utils/types/question 2";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NotFoundPage from "@/components/notFound";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState<Problem>({} as Problem);
  const [notFound, setNotFound] = useState(false);

  const { pid } = useRouter().query;

  useEffect(() => {
    const getProblems = async () => {
      setLoading(true);
      try {
        const problemRef = doc(firestore, "questions", pid as string);
        const result = await getDoc(problemRef);
        if (!result.exists()) {
          // display default 404 page
          setNotFound(true);
          return;
        }
        const data = result.data();
        // console.log(data);
        setProblem(data as Problem);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Firestore document:", error);
      }
      // fetching data logic
    };

    getProblems();
  }, [pid, setLoading]);

  return (
    <div>
      <Topbar problemPage />
      {!loading && <Workspace problem={problem} />}
      {notFound && <NotFoundPage />}
    </div>
  );
};
export default ProblemPage;
