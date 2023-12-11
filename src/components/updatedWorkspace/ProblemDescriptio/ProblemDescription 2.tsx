import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import questionDetails from "@/utils/types/question";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLoading3Quarters,
  AiFillStar,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";

type ProblemDescriptionProps = {
  problem: questionDetails;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const [user] = useAuthState(auth);
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  // console.log(problem.Description);
  const cProblem = currentProblem;
  const [updating, setUpdating] = useState(false);

  const returnUserDataAndProblemData = async (transaction: any) => {
    const userRef = doc(firestore, "users", user!.uid);
    const problemRef = doc(firestore, "problems", problem.id);
    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);
    return { userDoc, problemDoc, userRef, problemRef };
  };

  return (
    <div>
      <div className="flex h-11 w-full items-center pt-2 dark:bg-dark-layer-2 bg-[#f3f4f8] dark:text-white text-dark-layer-1 overflow-x-hidden">
        <div
          className={
            "bg-white dark:bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs font-medium dark:font-normal cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-dark-layer-1 dark:text-white font-medium">
                {cProblem?.Name}
              </div>
            </div>
            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
                <div // Problem Difficulty
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {cProblem?.difficultyLevel}
                </div>
              </div>
            )}

            {/* Problem Statement Backgrounds*/}
            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}

            {/* Problem Statement(paragraphs) */}
            <div className="text-dark-layer-1 dark:text-white text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: cProblem.Description,
                }}
              />
            </div>

            {/* Input Format */}
            <div>
              <p className="font-medium text-dark-layer-1 dark:text-white ">
                {" "}
                Input Format{" "}
              </p>
              <div
                className="example-card"
                dangerouslySetInnerHTML={{
                  __html: problem.inputFormat,
                }}
              />
            </div>

            {/* Output Format */}
            <div>
              <p className="font-medium text-dark-layer-1 dark:text-white ">
                {" "}
                Output Format{" "}
              </p>
              <div
                className="example-card"
                dangerouslySetInnerHTML={{
                  __html: problem!.outputFormat,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<questionDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>("");

  useEffect(() => {
    // Get problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as questionDetails);
        // easy, medium, hard
        setProblemDifficultyClass(
          problem.difficultyLevel === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : " bg-dark-pink text-dark-pink"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}
