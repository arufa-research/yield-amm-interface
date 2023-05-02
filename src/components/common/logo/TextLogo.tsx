import React from "react";
import logoText from "../../../assets/img/logoText.png";
import flatwhite from "../../../assets/img/flatwhite.png";
import flatblack from "../../../assets/img/black_logo.png";
import "./logo.css";
import { useRecoilValue } from "recoil";
import { themeState } from "../../../context/themeState";

const TextLogo = () => {
  const theme = useRecoilValue(themeState);
  return (
    <div className="text-logo-container">
      <img className="text-logo-img" src={theme !== "Dark"?flatblack:flatwhite} />
      <img className="text-logo-title" src={logoText} />
      {/* <h3>StakeEasy 2.0</h3> */}
    </div>
  );
};

export default TextLogo;
