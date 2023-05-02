import { useRecoilValue } from "recoil";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import "./stake.css";

// import Convert from "../pages/stake/convert";
import { networkConstants } from "../../utils/constants";
import { walletState } from "../../context/walletState";
import { useConnectWallet } from "../../hooks/useTxnClient";
import CommonButton from "../../components/common/buttons/CommonButton";
import LoadingModal from "../../components/common/loading-modal/LoadingModal";
import { useStake } from "../../hooks/useStake";
import StakeHeader from "./StakeHeader";
import StakeInputSlider from "./StakeInputSlider";
import Convert from "./Convert";
import { useToken } from "../../hooks/useToken";
import { queryClientState } from "../../context/queryClientState";

import juno from "../../assets/img/juno.png";
import bJUNO from "../../assets/img/bjuno.png";
import seJUNO from "../../assets/img/sejuno.png";
import { networkState } from "../../context/networkState";

function StakeMenu(props: Props) {
  const { queryClient } = useRecoilValue(queryClientState);

  const { network } = useRecoilValue(networkState);
  const denomConst = networkConstants[network].denomConst;

  const [seBalance, setSeBalance] = useState("");
  const [bBalance, setBBalance] = useState("");
  const [rate, setRate] = useState("");
  const [bTokenRate, setBTokenRate] = useState("");

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [eqAmountMessage, setEqAmountMessage] = useState("");
  const [sliderVisibility, setSliderVisibility] = useState(true);
  const [isCheckingAddress, setIsCheckingAddress] = useState(false);
  const [tokenUnit, setTokenUnit] = useState(denomConst.seTokenSymbol);
  const [unstakeType, setUnstakeType] = useState("delayed");
  const { address, shortAddress, balance } = useRecoilValue(walletState);

  const connectWallet = useConnectWallet();
  const token = useToken();

  const { getAPY, getTVL, getBRate, getSeRate, doStake, doUnstake } =
    useStake();
  const getStakeData = async () => {
    const apr = await getAPY();
    const tvl = await getTVL();
    const seRate = await getSeRate();
    console.log("seRate: ", seRate);
    const bRate = await getBRate();

    const seBalance = await token.getBalance("se_token");
    const bBalance = await token.getBalance("b_token");
    console.log("seBalance: ", seBalance);
    console.log("bBalance: ", bBalance);
    console.log("balance: ", balance);

    setRate(seRate as string);
    setBTokenRate(bRate as string);
    setSeBalance(seBalance as string);
    setBBalance(bBalance as string);
  };

  useEffect(() => {
    setPercent(0);
    if (props.name === "Unstake" && (seBalance === "" || seBalance === "0")) {
      setSliderVisibility(false);
    } else {
      setSliderVisibility(true);
    }
    props.setInputAmount("");
    getStakeData();
  }, [queryClient, props.name, seBalance]);

  const unstakeTypeHandler = (menu: string) => {
    setUnstakeType(menu);
  };

  const handleChangePercent = (changedPercent: number) => {
    setPercent(changedPercent);
  };

  const doConvertHandler = async () => {
    const unit = tokenUnit.substring(0, 2);
    if (props.name === "Unstake") {
      await doUnstake(props.inputAmount as string, unit, "");
    } else {
      await doStake(props.inputAmount as string, unit, "");
    }
  };

  // const handleChangedInput = (changedInput : string | null){
  //   props.setInputAmount(changedInput)
  // }

  const handleTextInputChange = (e: any) => {
    let curCrtBalance = Number(balance?.amount);
    if (props.name === "Unstake") {
      curCrtBalance = Number(seBalance);
    }
    const val = e.target.value;
    props.setInputAmount(val);
    let percentFig = Math.floor((val * 100) / curCrtBalance);
    if (percentFig > 100) percentFig = 100;
    setPercent(percentFig);
  };

  // const handleSlideChange = (e: any) => {
  //   let curCrtBalance = Number(balance?.amount);
  //   if (props.name === "Unstake") {
  //     if (tokenUnit === denomConst.seTokenSymbol) {
  //       curCrtBalance = Number(seBalance);
  //     } else {
  //       curCrtBalance = Number(bBalance);
  //     }
  //   }
  //   let val = e.target.valueAsNumber * 0.01 * Number(curCrtBalance);
  //   setPercent(e.target.valueAsNumber);
  //   props.setInputAmount(Number(val.toFixed(6)).toString());
  // };

  const handleMaxClick = () => {
    let curCrtBalance = Number(balance?.amount);
    if (props.name === "Unstake") {
      if (tokenUnit === denomConst.seTokenSymbol) {
        curCrtBalance = Number(seBalance);
      } else {
        curCrtBalance = Number(bBalance);
      }
    }
    props.setInputAmount(curCrtBalance.toString());
    setPercent(100);
  };

  // const handleNodeClick = (e: any) => {
  //   let curCrtBalance = Number(balance?.amount);
  //   if (props.name === "Unstake") {
  //     if (tokenUnit === denomConst.seTokenSymbol) {
  //       curCrtBalance = Number(seBalance);
  //     } else {
  //       curCrtBalance = Number(bBalance);
  //     }
  //   }
  //   const id = Number(e.target.id);
  //   setPercent(id);
  //   let val = id * 0.01 * Number(curCrtBalance);
  //   props.setInputAmount(Number(val.toFixed(6)).toString());
  // };

  // const toggleConversionUnit = (unit: string) => {
  //   setTokenUnit(unit);
  // };

  const handleSwitchClick = () => {
    if (tokenUnit === denomConst.bTokenSymbol) {
      setTokenUnit(denomConst.seTokenSymbol);
    } else {
      setTokenUnit(denomConst.bTokenSymbol);
    }
  };

  const getReceiveValue = (): any => {
    let value: any = "";
    if (!props.inputAmount) return value;
    if (props.name === "Unstake") {
      value = !(tokenUnit === denomConst.bTokenSymbol)
        ? (Number(props.inputAmount) * Number(rate)).toFixed(5)
        : (Number(props.inputAmount) * Number(bTokenRate)).toFixed(5);
    } else {
      value = !(tokenUnit === denomConst.bTokenSymbol)
        ? (Number(props.inputAmount) / Number(rate)).toFixed(5)
        : (Number(props.inputAmount) / Number(bTokenRate)).toFixed(5);
    }
    return value;
  };

  return (
    <>
      <div className="stake-menu">
        {props.isConvert ? (
          <Convert /> // TODO
        ) : (
          <>
            <StakeHeader
              tokenUnit={tokenUnit}
              name={props.name}
              setTokenUnit={setTokenUnit}
              rate={rate}
              bTokenRate={bTokenRate}
            />
            {/* {props.name==='Unstake'&&<InstDelToggle inputAmount={props.inputAmount} onChange={unstakeTypeHandler}/>} */}
            <div className="input-wrapper-container">
              <div className="input-text-wrapper">
                <label
                  className="input-label stake-label"
                  htmlFor="stake-juno-input"
                >
                  <div className="label-logo-action-wrapper">
                    <img src={juno} />
                    {props.name === `Stake ${denomConst.tokenSymbol}`
                      ? "Stake"
                      : "Unstake"}
                  </div>
                  <div className="available-balance-prompt">
                    <p>Balance : </p>
                    <span>
                      {props.name === "Unstake"
                        ? tokenUnit === denomConst.seTokenSymbol
                          ? (seBalance ? Number(seBalance) : 0).toFixed(4)
                          : (bBalance ? Number(bBalance) : 0).toFixed(4) || 0
                        : (balance?.amount
                            ? Number(balance?.amount)
                            : 0
                          ).toFixed(4) || 0}
                    </span>
                    <span>
                      {props.placeholder === denomConst.tokenSymbol
                        ? props.placeholder
                        : tokenUnit}
                    </span>
                  </div>
                </label>

                <div className="stake-input-wrapper">
                  <input
                    className="stake-input actual-value"
                    id="stake-juno-input"
                    type="text"
                    autoComplete="off"
                    placeholder={"0.00"}
                    value={props.inputAmount || ""}
                    onChange={(e) => {
                      handleTextInputChange(e);
                    }}
                  />
                  <div className="stake-input-unit">
                    {props.placeholder === denomConst.tokenSymbol
                      ? props.placeholder
                      : tokenUnit}
                  </div>
                  <div className="input-warning-meassages">
                    {props.name === "Unstake" &&
                    Number(props.inputAmount) >
                      (tokenUnit === denomConst.seTokenSymbol
                        ? Number(seBalance)
                        : Number(bBalance))
                      ? "Insufficient Balance"
                      : null}
                    {props.name === `Stake ${denomConst.tokenSymbol}` ? (
                      props.inputAmount && Number(props.inputAmount) < 1 ? (
                        "At least 1 JUNO should be staked."
                      ) : Number(props.inputAmount) >
                        Number(balance?.amount) ? (
                        <div>Insufficient Balance</div>
                      ) : null
                    ) : null}
                  </div>
                </div>

                {balance?.amount && sliderVisibility && (
                  <button className="max-btn" onClick={handleMaxClick}>
                    Max
                  </button>
                )}
              </div>
              {/* <div className="scale-balance-wrapper">
      <FontAwesomeIcon icon={faScaleBalanced} /> 
      </div> */}
              <div className="input-text-wrapper receive-value-wrapper">
                <label
                  className="input-label receive-label"
                  htmlFor="correspondingValue"
                >
                  <div className="label-logo-action-wrapper">
                    <img
                      src={
                        tokenUnit == denomConst.seTokenSymbol ? seJUNO : bJUNO
                      }
                      alt="Unit"
                    />
                    Receive
                  </div>
                </label>
                <div className="stake-input-wrapper">
                  <input
                    className="stake-input receive-value"
                    id="correspondingValue"
                    type="text"
                    disabled
                    placeholder={"0.00"}
                    value={getReceiveValue()}
                  />
                  <div className="stake-input-unit">
                    {props.name === `Stake ${denomConst.tokenSymbol}`
                      ? tokenUnit
                      : denomConst.tokenSymbol}
                  </div>
                </div>
              </div>
            </div>

            {props.name === "Unstake" ? (
              <div style={{ marginTop: "10px", color: "white" }}>
                Note: Unstaking takes 28-31 days to complete.
              </div>
            ) : null}

            {balance?.amount && sliderVisibility && (
              <StakeInputSlider
                name={props.name}
                tokenUnit={tokenUnit}
                percent={percent}
                setPercent={handleChangePercent}
                seBalance={seBalance}
                bBalance={bBalance}
                setInputAmount={(e: string) => {
                  props.setInputAmount(e);
                }}
              />
            )}
            {address ? (
              <button
                disabled={
                  !address ||
                  !props.inputAmount ||
                  props.inputAmount === "0" ||
                  !bTokenRate ||
                  !rate ||
                  loading ||
                  isCheckingAddress ||
                  (props.name === "Unstake" &&
                    Number(props.inputAmount) >
                      (tokenUnit === denomConst.seTokenSymbol
                        ? Number(seBalance)
                        : Number(bBalance))) ||
                  (props.name === `Stake ${denomConst.tokenSymbol}` &&
                    Number(props.inputAmount) < 1) ||
                  (props.name === `Stake ${denomConst.tokenSymbol}` &&
                    Number(props.inputAmount) > Number(balance?.amount))
                }
                className="stake-btn"
                onClick={doConvertHandler} // TODO
              >
                {isCheckingAddress
                  ? "Validating address..."
                  : loading
                  ? "Loading..."
                  : props.name === "Unstake"
                  ? "Unstake " + tokenUnit
                  : props.name}
              </button>
            ) : (
              <CommonButton
                name="Connect Wallet"
                onClick={() => connectWallet()}
                customClass=""
                // disabled={address !== undefined}
              />
            )}
          </>
        )}
      </div>
      {/* <ToastContainer style={{'textAlign':'left'}}/> */}
      <LoadingModal
        isOpen={loading}
        content={[
          props.isConvert
            ? "Converting"
            : props.name.split(" ")[0].slice(0, -1) +
              "ing" +
              " " +
              props.inputAmount +
              " ",
          !props.isConvert
            ? props.name === "Unstake"
              ? tokenUnit === denomConst.seTokenSymbol
                ? "seJUNO"
                : "bJUNO"
              : "JUNO"
            : "",
          eqAmountMessage,
        ]}
      />
    </>
  );
}

type Props = {
  name: string;
  placeholder: string;
  inputAmount: string | null | undefined;
  isConvert: boolean;
  setInputAmount: Dispatch<SetStateAction<string | null | undefined>>;
};

export default StakeMenu;
