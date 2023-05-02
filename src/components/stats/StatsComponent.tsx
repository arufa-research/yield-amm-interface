import { useEffect, useState, useContext } from "react";
import { useRecoilValue } from "recoil";

import LoadingSpinner from "../../components/common/loadingSpinner/loadingSpinner";
import { queryClientState } from "../../context/queryClientState";
import { useRewards } from "../../hooks/useRewards";
import { useStats } from "../../hooks/useStats";
import { useWithdraw } from "../../hooks/useWithdraw";
import Timer from "../../utils/timer/Timer";
// import { UserContext } from "../../context/user-context";
import ContractInfoItems from "./ContractInfoItems";
import "./StatsComponent.css";
import ValidatorListItems from "./ValidatorListItems";
import WindowComponent from "./WindowComponent";
import { useToken } from "../../hooks/useToken";
import { walletState } from "../../context/walletState";
import PulseLoader from "react-spinners/PulseLoader";
import { responsiveState } from "../../context/responsiveState";

function StatsComponent() {
  const { address } = useRecoilValue(walletState);
  const [contractInfo, setContractInfo] = useState<any>("");
  const [validatorList, setValidatorList] = useState<any>([]);
  const [windowInfo, setWindowInfo] = useState<any>("");
  const [progress, setProgress] = useState<any>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { first } = useRecoilValue(responsiveState);
  const [timeLeft, setTimeLeft] = useState<Date>(new Date());
  const { queryClient } = useRecoilValue(queryClientState);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);

  const { getContractInfo, getValidatorsList, getWindowInfo } = useStats();
  const { getPendingRewards, doClaim } = useRewards();
  const { getUnstakingValues, doWithdraw } = useWithdraw();
  const { getBalance, getBalanceByAddress } = useToken();

  useEffect(() => {
    (async () => {
      await getStakeData();
    })();
  }, [queryClient]);

  const getStakeData = async () => {
    const contractInfo = await getContractInfo();
    const validatorList = await getValidatorsList();
    const windowInfo = await getWindowInfo();

    setContractInfo(contractInfo);
    setValidatorList(validatorList);
    setIsLoading(false);
    setWindowInfo(windowInfo);
  };

  useEffect(() => {
    let sec = windowInfo.time_to_close - Math.floor(Date.now() / 1000);
    console.log(sec);

    if (sec < 0) {
      sec = 0;
    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    setTimeLeft(time);
    setProgress(sec);
    console.log(timeLeft, progress);

    // getStakeData();
  }, [windowInfo, progress]);
  // const handleTimerExpire = () => {
  //   const oldWindowID = windowInfo.id;
  //   console.log("expired");
  //   setProgress(0);
  //   let reloadTime = 15000;
  //   const expTimer = () => {
  //     if (oldWindowID !== windowInfo.id) {
  //       fetchWindow();
  //     }
  //   };
  //   setInterval(() => {
  //     expTimer();
  //     reloadTime = reloadTime * 1.1;
  //   }, reloadTime);
  // };
  //   const dummy = [
  //     { name: "Alias", address: "IDK", staked: 1234 },
  //     { name: "Alias2", address: "IDK2", staked: 12345 },
  //   ];

  return (
    <>
      <div className={first ? "wrapper-none" : "wrapper-1"}>
        <div className="contract-info-wrapper left-wrapper">
          <h2> Validators</h2>
          <div className="info-card-2">
            {!isLoading ? (
              <>
                <div className="validators-heading">
                  <div>NAME</div>
                  <div>AMOUNT</div>
                </div>
                <ValidatorListItems validatorList={validatorList} />
              </>
            ) : (
              <PulseLoader
                color="#000000"
                loading={true}
                // cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </div>
        </div>
        <div className="right-wrapper">
          <div className="contract-info-wrapper">
            <h2>Contract Info</h2>
            <div className="info-card-2">
              <ContractInfoItems contractInfo={contractInfo} />
            </div>
          </div>
          <div className="contract-info-wrapper">
            <h2>Active Window</h2>
            <div className="info-card-2">
              <div className="info-card-content">
                <span>Window ID</span>
                <div>{windowInfo.id}</div>
              </div>

              <div className="info-card-content">
                <div>Time to trigger window</div>

                {!progress || isLoading ? (
                  `${windowInfo === "" ? "Fetching window..." : "-"}`
                ) : (
                  <Timer
                    expiryTimestamp={timeLeft}
                    totalTime={345600}
                    wrapperClassName="progress-bar-wrapper"
                    barClassName="progress-bar"
                    // onExpire={handleTimerExpire}
                    inlineTag={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsComponent;
