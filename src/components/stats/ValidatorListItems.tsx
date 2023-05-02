import React from "react";
import "./StatsComponent.css";
import ValidatorListItem from "./ValidatorListItem";

function ValidatorListItems(props: any) {
  // console.log(props.validatorList);
  //   const data = Array.from(props.validatorList);
  //   console.log(data);

  return (
    <div className="validators-list">
      {props.validatorList.map((ele: any, index: number) => (
        <ValidatorListItem
          key={index}
          index={index + 1}
          name={ele.name}
          staked={ele.staked}
          address={ele.address}
        />
      ))}
    </div>
  );
}

export default ValidatorListItems;
