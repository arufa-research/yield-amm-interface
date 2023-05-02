import React from "react";
import InfoBubble from "../../components/common/information/InfoBubble";
import "./stake.css";
import { relative } from "path";

function StakeHeader(props: any) {
  const tokenUnit = props.tokenUnit;
  const toggleConversionUnit = (unit: string) => {
    props.setTokenUnit(unit);
  };
  return (
    <div className="stake-menu-header">
      <div className="stake-menu-heading stake-menu__item">
        {props.name} {props.name === "Unstake" && tokenUnit}
      </div>
      {/* <div className="stake-rate stake-menu__item">
        <div className="available-balance-prompt rate-prompt">
          <span>1</span> <span>{tokenUnit}</span>
        </div>
        =
        <div className="available-balance-prompt rate-prompt">
          <span>
            {tokenUnit === denomConst.seTokenSymbol
              ? Number(props.rate).toFixed(5)
              : Number(props.bjunorate).toFixed(6)}
          </span>{" "}
          <span>JUNO</span>
        </div>
        <InfoBubble
          style={{ right: "-20px", top: "3px" }}
          content="Current exchange rate"
        />
      </div> */}

      {/* <div
        style={
          props.name !== `Stake ${denomConst.tokenSymbol}`
            ? { left: "0px" }
            : { right: "0px" }
        }
        className="stake-toggle-switch"
      >
        <div
          onClick={() => toggleConversionUnit(denomConst.seTokenSymbol)}
          className={`${
            tokenUnit === denomConst.seTokenSymbol
              ? "toggle-option-active"
              : null
          } toggle-option option-2`}
        >
          {denomConst.seTokenSymbol}
        </div>
        <div
          onClick={() => toggleConversionUnit(denomConst.bTokenSymbol)}
          className={`${
            tokenUnit === denomConst.bTokenSymbol
              ? "toggle-option-active"
              : null
          } toggle-option option-1`}
        >
          {denomConst.bTokenSymbol}
        </div>
      </div> */}
    </div>
  );
}

export default StakeHeader;
