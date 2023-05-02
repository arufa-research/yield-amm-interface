import React, { useEffect, useState } from "react";
import { useWithdraw } from "../../hooks/useWithdraw";
// import "../withdraw/WithdrawComponent.css"
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ToastContainer, toast } from "react-toastify";
import { walletState } from "../../context/walletState";
import InfoBubble from "../../components/common/information/InfoBubble";
import { useRewards } from "../../hooks/useRewards";
// import "./RewardsComponent.css";
import { queryClientState } from "../../context/queryClientState";
import PulseLoader from "react-spinners/PulseLoader";
import { responsiveState } from "../../context/responsiveState";
import { networkState } from "../../context/networkState";
import { networkConstants } from "../../utils/constants";
import LoadingModal from "../common/loading-modal/LoadingModal";

const ClaimRewardModal = ({
    setIsModalOpen
}: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isloading, setIsloading] = useState(false);
    const { client, address } = useRecoilValue(walletState);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [isCheckingAddress, setIsCheckingAddress] = useState(false);
  
    const [bTokenBalance, setBTokenBalance] = useState(1);
    const [bTokenClaimAmount, setBTokenClaimAmount] = useState("");
    const { queryClient } = useRecoilValue(queryClientState);
    const { getPendingRewards, doClaim } = useRewards();
    const [rewards, setRewards] = useState<string | undefined>("");
    const { first } = useRecoilValue(responsiveState);

    const { network } = useRecoilValue(networkState);
    const baseSymbol = networkConstants[network].baseSymbol;
  
    useEffect(() => {
      (async () => {
        try {
          const rewards = await getPendingRewards();
          setRewards(rewards);
          setIsLoading(false);
        } catch (e) {
          console.log(e);
          return;
        }
      })();
  
      return () => {};
    }, [queryClient, address, isloading]);
  
    const doBTokenClaim = async () => {
      setIsloading(true);
      await doClaim();
      setIsloading(false);
    };

  return (
    <div className={first ? "wrapper-none" : ""}>
      <div className="contract-info-wrapper-1">
        <h2 >Claim Rewards</h2>
        <div className="info-card card">
          {!Number(rewards) ? (
            <div style={{ margin: "0 auto" }}>No Pending Rewards</div>
          ) : (
            <div className="staked-amount-wrapper">
              <div className="staked-amount-item-1">
                <div className="amt-heading">Unclaimed staking rewards</div>
                <div className="unstaking-val">
                  <span>
                    {bTokenClaimAmount ??
                      (!address ? (
                        <InfoBubble
                          style={{ right: "0px", top: "-10px" }}
                          content="Connect Keplr wallet to see this balance"
                        />
                      ) : (
                        "-"
                      ))}
                  </span>
                  <span>{`${rewards} ${baseSymbol}`}</span>
                </div>
                <div className="amount-with-unit"></div>
              </div>
            </div>
          )}
          {/* <h2 className="info-heading">Claimable Rewards</h2> */}

          <div className="info-card">
            <>
              {null}
              {
                <div className="claimable-amount-wrapper">
                  <div className="claim-bjunox-rewards-btn">
                    <button
                      disabled={
                        !Number(rewards) || isCheckingAddress || isLoading
                      }
                      className={"stake-btn account-btn"}
                      style={{ width: "100%", margin: "0" }}
                      onClick={doBTokenClaim}
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
              }
            </>
          </div>
        </div>
      </div>
      <LoadingModal
        isOpen={isloading}
        content={[
          "Claiming ",
          "bCONST",
          "",
        ]}
      />
    </div>
  );
};

export default ClaimRewardModal;
