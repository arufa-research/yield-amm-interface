import React from "react";
import { Stats } from "../info";
import Exchange from "../exchange";
import { useRecoilValue } from "recoil";
import { responsiveState } from "../../../context/responsiveState";
import NewExchange from "../newExchange";

function StakeComponent() {
  const { first } = useRecoilValue(responsiveState);
  return (
    <div className={first ? "wrapper-none" : "wrapper"}>
      <div className="stake-child">
        {/* <Exchange /> */}
        <NewExchange />
      </div>
      {/* <Stats /> */}
    </div>
  );
}

export default StakeComponent;
