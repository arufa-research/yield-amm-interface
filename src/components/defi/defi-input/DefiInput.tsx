import React from "react";
import "../Liquidity.css";

const DefiInput = (props: any) => {
  const handleMaxClick = () => {
    let curCrtBalance = Number(props.tokenBalance);
    props.setValue(curCrtBalance.toString());
    console.log("max clicked");
  };
  return (
    <div className="liquidity-input-wrapper">
      <div className="liquidity-input-label">
        <img src={props.logoSrc} />
        {props.tokenName}
      </div>
      <div className="liquidity-input-balance available-balance-prompt">
        {props.convertTab ? <p>Balance: </p> : <p>Available: </p>}
        <span>{props.tokenBalance}</span>
      </div>

      <div className="defi-max-btn-wrapper">
        {props.tokenBalance &&
          props.convertTab &&
          props.activeToken.toLowerCase() === props.tokenName.toLowerCase() && (
            <button className="defi-max-btn" onClick={handleMaxClick}>
              Max
            </button>
          )}
      </div>

      <input
        autoComplete="off"
        disabled={props.disabled}
        name={props.name}
        onChange={props.onInputChange}
        className="stake-input liquidity-input"
        placeholder="0.00"
        value={props.value}
        id={props.id}
      />
      {props.showError && (
        <div className="error-message-prompt">Insufficient Balance</div>
      )}
    </div>
  );
};

export default DefiInput;
