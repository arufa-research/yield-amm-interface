import React from "react";
import NavigationLink from "../buttons/NavigationLink";
import NavigationButton from "../buttons/NavigationButton";
import {
  faChartPie,
  faDroplet,
  faRightLeft,
  faSquareUpRight,
  faAward,
  faMoneyBill,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavLinks = () => {
  return (
    <div className="navlinks-container">
      <NavigationButton
        icon={faRightLeft}
        name={"Stake/Unstake"}
        pathName="/"
      />
      {/* <NavigationButton
        icon={faMoneyBill}
        name={"Withdraw"}
        pathName="/withdraw"
      />
      <NavigationButton
        icon={faAward}
        name={"Claim rewards"}
        pathName="/rewards"
      /> */}
      <NavigationButton
        icon={faShieldAlt}
        name={"Protocol stats"}
        pathName="/stats"
      />
    </div>
  );
};

export default NavLinks;
