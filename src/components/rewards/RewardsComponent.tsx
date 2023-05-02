import React from "react";
import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { stakingToken } from "../../contracts/staking_token";
// import { rewardsContract } from "../../contracts/rewards_contract";
// import { stakingContract } from "../../contracts/staking_contract";
import { walletState } from "../../context/walletState";
import { useRecoilValue } from "recoil";
// import { UserContext } from "../../context/user-context";
// import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";
// import LoadingModal from "../../components/LoadingModal/LoadingModal";
import InfoBubble from "../../components/common/information/InfoBubble";
import { useRewards } from "../../hooks/useRewards";
import "./RewardsComponent.css";
import { queryClientState } from "../../context/queryClientState";
import PulseLoader from "react-spinners/PulseLoader";
import { responsiveState } from "../../context/responsiveState";
import { networkState } from "../../context/networkState";
import { networkConstants } from "../../utils/constants";

const RewardsComponent = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
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
  }, [queryClient, address]);

  const doBTokenClaim = async () => {
    await doClaim();
  };

  return (
    <div className={first ? "wrapper-none" : "wrapper"}>
      <div className="contract-info-wrapper">
        <h2 className="info-heading">Claim Rewards</h2>
        <div className="info-card card">
          {!bTokenBalance ? (
            <div style={{ margin: "0 auto" }}>No amount staked</div>
          ) : (
            <div className="staked-amount-wrapper">
              <div className="staked-amount-item">
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
                        !bTokenClaimAmount || isCheckingAddress || isLoading
                      }
                      className={"stake-btn account-btn"}
                      style={{ width: "50%", margin: "0" }}
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
    </div>
  );
};

export default RewardsComponent;
