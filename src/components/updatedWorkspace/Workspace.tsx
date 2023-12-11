import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescriptio/ProblemDescription";
import questionDetails from "@/utils/types/question";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import EditorBody from "./Editor/EditorBody";

type WorkspaceProps = {
  problem: questionDetails;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <div className="bg-dark-fill-2">
        <EditorBody
          problem={problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  );
};
export default Workspace;
