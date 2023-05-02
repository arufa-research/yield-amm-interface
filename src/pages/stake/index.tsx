import { useContext, useEffect } from "react";
// import { BalanceToggleContext } from "../../context/balanceToggleContext";

import "../pages.css";
import StakeComponent from "../../components/stake/StakeComponent/StakeComponent";
import { themeState } from "../../context/themeState";
import { useRecoilValue } from "recoil";

function Stake() {
  // const { balanceButtonToggle } = useContext(BalanceToggleContext);
  let toggleClass = "";
  const root = document.querySelector(':root');
  const theme = useRecoilValue(themeState);
  useEffect(()=>{

    if(theme === "Light"){
      root?.classList.add('lighttheme')
    }
  },[])
  // if (
  // 	(window.innerWidth ||
  // 		document.documentElement.clientWidth ||
  // 		document.body.clientWidth <= 768) &&
  // 	balanceButtonToggle
  // ) {
  // 	toggleClass = "wrapperToggle";
  // } else {
  // 	toggleClass = " ";
  // }

  return (
    <>
      <StakeComponent />
    </>
  );
}

export default Stake;
