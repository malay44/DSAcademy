"use client";
import { useState, useEffect } from "react";
import EditorHeader from "./EditorHeader";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { githubDarkInit, githubLight } from "@uiw/codemirror-theme-github";
// import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTheme } from "next-themes";
import questionDetails from "@/utils/types/question";

type PlaygroundProps = {
  problem: questionDetails;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
  lang: any;
}

const customDarkTheme = githubDarkInit({
  settings: {
    background: "rgb(40,40,40)",
    gutterBackground: "rgb(40,40,40)",
    // gutterBorder: "#cceeff44",
    // gutterActiveForeground: '#3e61a8',
  },
});

const EditorBody: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  // const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>();
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
    lang: cpp(),
  });

  const [user] = useAuthState(auth); // getting user
  const {
    query: { pid }, // getting problem id
  } = useRouter();

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      console.log(userCode);
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

  const { theme } = useTheme();

  const getLang = () => {};

  return (
    <div className="flex flex-col bg-white dark:bg-dark-layer-1 relative overflow-x-hidden">
      <EditorHeader settings={settings} setSettings={setSettings} />
      <div className="w-full overflow-auto">
        <CodeMirror
          value={userCode}
          theme={theme === "dark" ? customDarkTheme : githubLight}
          onChange={onChange}
          extensions={[settings.lang]} // possible error
          style={{ fontSize: settings.fontSize }}
        />
      </div>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditorBody;
