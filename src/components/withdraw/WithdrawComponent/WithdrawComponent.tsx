import React from "react";
import { useWithdraw } from "../../../hooks/useWithdraw";
import { useState, useEffect } from "react";
import "./WithdrawComponent.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { queryClientState } from "../../../context/queryClientState";
import { walletState } from "../../../context/walletState";
import PulseLoader from "react-spinners/PulseLoader";
import { responsiveState } from "../../../context/responsiveState";
import console from "console";

function WithdrawComponent() {
  const { address } = useRecoilValue(walletState);
  const [unstakingAmount, setUnstakingAmount] = useState<string | undefined>(
    ""
  );
  const [unstakedAmount, setUnstakedAmount] = useState<string | undefined>("");
  const [isCheckingAddress, setIsCheckingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getUnstakingValues, doWithdraw } = useWithdraw();
  const [claimAmount, setClaimAmount] = useState<Number>(0);
  const { queryClient } = useRecoilValue(queryClientState);
  const [temp, setTemp] = useState(window.innerWidth);
  const { first } = useRecoilValue(responsiveState);
  const setResponsiveState = useSetRecoilState(responsiveState);
  const getStakeData = async () => {
    const unstaking = await getUnstakingValues();
    setUnstakingAmount(unstaking?.unstaking);
    setUnstakedAmount(unstaking?.unstaked);
    setIsLoading(false);
  };

  const withdrawHandler = async () => {
    await doWithdraw();
  };

  useEffect(() => {
    getStakeData();
  }, [queryClient, address]);

  useEffect(() => {
    const handleResize = () => {
      // console.log(window.innerWidth);
      if (window.innerWidth >= 1140 && first) {
        // console.log("ENTERRR");
        setResponsiveState({ first: false });
      }
    };
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className={first ? "wrapper-none" : "wrapper"}>
      <div className="contract-info-wrapper">
        <h2>Withdraw</h2>
        <div className="info-card">
          <div className="info-card-content">
            <div className="staked-amount-item">
              <label>Unstaking Amount</label>
              <div className="unstaking-val">{`${unstakingAmount} JUNO`}</div>
            </div>
            <div className="staked-amount-item">
              <label>Unstaked Amount</label>
              <div className="unstaking-val">{`${unstakedAmount} JUNO`}</div>
            </div>
          </div>
          <button
            disabled={!claimAmount || isCheckingAddress || isLoading}
            className="stake-btn account-btn"
            onClick={withdrawHandler}
          >
            {isCheckingAddress ? (
              "Validating address..."
            ) : isLoading ? (
              <PulseLoader
                color="#000000"
                loading={true}
                // cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              `Claim Amount`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawComponent;
