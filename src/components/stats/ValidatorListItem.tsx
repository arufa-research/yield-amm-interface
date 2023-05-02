import React from "react";
import { useRecoilValue } from "recoil";

import { networkConstants } from "../../utils/constants";
import { networkState } from "../../context/networkState";

function ValidatorListItem(props: any) {
  const baseURL = "https://www.mintscan.io/juno/validators/";

  const { network } = useRecoilValue(networkState);
  const denomConst = networkConstants[network].denomConst;

  return (
    <div className="info-card-content jcs">
      <div className="list-numberings">{`(${props.index})`}</div>
      <a href={`${baseURL}${props.address}`} className="val-address-link">
        {props.name}
      </a>
      <div className="amount-with-unit jcs-child__value">
        <span>{props.staked}</span>
        <span> {denomConst.tokenSymbol}</span>
      </div>
    </div>
  );
}

export default ValidatorListItem;
