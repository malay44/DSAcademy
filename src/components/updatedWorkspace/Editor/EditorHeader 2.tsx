import { useState, useEffect } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { ISettings } from "./EditorBody";
import SettingsModal from "@/components/Modals/SettingsModal";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSettings,
  settings,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  const handleChangeLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "C++") {
      setSettings({ ...settings, lang: "cpp()" });
    } else if (event.target.value === "JAVA") {
      setSettings({ ...settings, lang: "java()" });
    } else {
      setSettings({ ...settings, lang: "python()" });
    }
    setSettings({ ...settings, lang: event.target.value });
    console.log(event.target.value);
  };

  return (
    <div className="flex items-center justify-between dark:bg-dark-layer-2 bg-[#f3f4f8] h-11 w-full ">
      <div className="flex items-center text-dark-layer-1 dark:text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-white dark:bg-dark-fill-3 dark:text-dark-label-2 text-dark-layer-1 hover:bg-dark-fill-4  px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-dark-label-2">
              <select
                className="lang-select"
                id="inlineLangSelectPref"
                onChange={handleChangeLang}
              >
                <option selected value="C++">
                  C++
                </option>
                <option value="JAVA">JAVA</option>
                <option value="Python">Python</option>
              </select>
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button
          className="preferenceBtn group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            {!isFullScreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
          </div>
          <div className="preferenceBtn-tooltip">Full Screen</div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};
export default PreferenceNav;
