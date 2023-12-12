"use client";
import { useState, useEffect, use } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { githubDarkInit, githubLight } from "@uiw/codemirror-theme-github";
import { cpp } from "@codemirror/lang-cpp";
import EditorFooter from "./EditorFooter";
import Problem from "@/utils/types/question 2";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTheme } from "next-themes";
import axios from "axios";
import { stdin, stdout } from "process";
import submission from "@/utils/types/submission";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const customDarkTheme = githubDarkInit({
  settings: {
    background: "rgb(40,40,40)",
    gutterBackground: "rgb(40,40,40)",
  },
});

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>();
  console.log(problem);
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [user] = useAuthState(auth);
  const {
    query: { pid },
  } = useRouter();

  const handleSubmit = async () => {
    setIsDisabled(true);
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });{
        setIsDisabled(false);
        return;
      }
    }
    try {
      console.log(userCode);

      console.log("before submit");
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: userCode,
          language_id: 54,
          stdin: problem.testcases,
        },
        {
          headers: {
            "x-rapidapi-host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST as string,
            "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string,
          },
        }
      );
      console.log("after submit");
      const token = response.data.token;

      const checkStatus = async () => {
        const response = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "x-rapidapi-host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST as string,
              "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string,
            },
            params: {
              base64_encoded: "true",
              fields: "*",
            },
          }
        );

        if (response.data.status.id < 3) {
          // console.log("fail");
          // return;
          console.log(response.data.status);
          setTimeout(checkStatus, 1000);
        } else if (response.data.status.id === 3) {
          const op: string = atob(response.data.stdout);
          console.log(problem.testcases);
          console.log(problem.testcases_sol);
          if (op === problem.testcases_sol) {
            toast.success("Right Answer", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 1000);
            // add submission to db in submissions collection 
            const submission: submission = {
              uid: user.uid,
              pid: pid as string,
              verdict: "AC",
              language: "C++",
              time: new Date(),
              code: userCode,
            }
            console.log(submission);
            // add submission to firestore in submissions collection with auto generated id
            const docRef = doc(collection(firestore, "submissions"));
            submission.sid = docRef.id;
            await setDoc(docRef, submission);
            console.log("Document written with ID: ", docRef.id);

            // add submission to user's submissions array
            const userRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              var userSubmissions = userDoc.data().submissions;
              if(!userSubmissions) userSubmissions = [];
              userSubmissions.push(docRef.id);
              await setDoc(userRef, { submissions: userSubmissions }, { merge: true });
            }

          } else {
            toast.error("Wrong Answer", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            setSuccess(false);
          }
          setIsDisabled(false);
          console.log(atob(response.data.stdout));
        } else {
          console.log("fail");
          setIsDisabled(false);
          return;
          console.log(response.data.status);
        }
        // console.log(response.data);
      };

      checkStatus();
    } catch (error: any) {
      console.log(error.message);
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : "");
    } else {
      setUserCode("");
    }
  }, [pid, user]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  // const [currentTheme, setCurrentTheme] = useRecoilState<('light' | 'dark')>(themeState);


	const [isDisabled, setIsDisabled] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="flex flex-col bg-white dark:bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav settings={settings} setSettings={setSettings} />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[100, 0]}
        minSize={100}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={theme === "dark" ? customDarkTheme : githubLight}
            onChange={onChange}
            extensions={[cpp()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-dark-layer-1 dark:text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-dark-layer-1 dark:bg-white" />
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} isDisabled={isDisabled} />
    </div>
  );
};
export default Playground;
