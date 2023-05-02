import { useRecoilState, useRecoilValue } from "recoil";

// import { themeState } from "../../../context/themeState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import "./netswitch.css";
import "../../../theme.css";
import { useState } from "react";
import { themeState } from "../../../context/themeState";

const ThemeToggle = () => {
  const root = document.querySelector(":root");
  // const [theme, setTheme] = useState('Dark')
  const [theme, setTheme] = useRecoilState<any>(themeState);

  // localStorage.setItem("theme", theme);
  localStorage.setItem("theme", theme);
  console.log("theme", theme, localStorage.getItem("theme"));
  
  const handleTheme = () => {
    if (theme === "Dark") {
      setTheme("Light");
      // localStorage.setItem("theme", "Light");
    } else {
      setTheme("Dark");
      // localStorage.setItem("theme", "Dark");
    }
    localStorage.setItem("theme", theme);
    root?.classList.toggle("lighttheme");
  };

  return (
    // <div className="toggleButton"  onClick={handleTheme}>
    // <div>
    //   {theme}
    // </div>
    // </div>

    <div className="toggleSwitch">
      {/* <input
        type="checkbox"
        id="darkMode"
        className={`${theme === "Dark" ? "checked" : ""}`}
      /> */}

      <label
        onClick={handleTheme}
        className={`${theme === "Dark" ? "checked" : ""}`}
      >
        <FontAwesomeIcon className="sun" icon={faSun} />
        <FontAwesomeIcon className="moon" icon={faMoon} />
      </label>
    </div>
  );
};

export default ThemeToggle;
