import React, { useEffect, useState } from "react";
import { useWithdraw } from "../../hooks/useWithdraw";
// import "../withdraw/WithdrawComponent.css"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { queryClientState } from "../../context/queryClientState";
import { walletState } from "../../context/walletState";
import PulseLoader from "react-spinners/PulseLoader";
import { responsiveState } from "../../context/responsiveState";
import console from "console";
import LoadingModal from "../common/loading-modal/LoadingModal";
import { coinConvert } from "../../utils/common";

const WithdrawwModal = ({
    setIsModalOpen
}: any) => {
    const { address } = useRecoilValue(walletState);
  const [unstakingAmount, setUnstakingAmount] = useState<string | undefined>(
    ""
  );
  const [unstakedAmount, setUnstakedAmount] = useState<string | undefined>("");
  const [isCheckingAddress, setIsCheckingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const { getUnstakingValues, doWithdraw } = useWithdraw();
  const [claimAmount, setClaimAmount] = useState<Number>(0);
  const { queryClient } = useRecoilValue(queryClientState);
  const [temp, setTemp] = useState(window.innerWidth);
  const { first } = useRecoilValue(responsiveState);
  const setResponsiveState = useSetRecoilState(responsiveState);
  const getStakeData = async () => {
    const unstaking = await getUnstakingValues();
    setUnstakingAmount(coinConvert(Math.round(Number(unstaking?.unstaking)), 6, "human"));
    setUnstakedAmount(unstaking?.unstaked);
    setIsLoading(false);
  };

  const withdrawHandler = async () => {
    setIsloading(true);
    await doWithdraw();
    setIsloading(false);
    await getStakeData();
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
    <div className={first ? "wrapper-none" : ""}>
      <div className="contract-info-wrapper-1">
        <h2>Withdraw</h2>
        <div className="info-card-1">
          <div className="info-card-content-1">
            <div className="staked-amount-item">
              <label>Unstaking Amount</label>
              <div className="unstaking-val">{`${unstakingAmount} CONST`}</div>
            </div>
            <div className="staked-amount-item">
              <label>Unstaked Amount</label>
              <div className="unstaking-val">{`${unstakedAmount} CONST`}</div>
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
      <LoadingModal
        isOpen={isloading}
        content={[
          "Claiming ",
          "CONST",
          "",
        ]}
      />
    </div>
  );
};

export default WithdrawwModal;
