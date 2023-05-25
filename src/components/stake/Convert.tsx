import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
// import { stakingContract } from "../../contracts/staking_contract";
// import { stakingToken } from "../../contracts/staking_token";
// import { bondedToken } from "../../contracts/bonded_token";
// import DefiInput from "../defi/defi-input/DefiInput";
import bjuno from "../../assets/img/bjuno.png";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import sejuno from "../../assets/img/sejuno.png";
// import { UserContext } from "../../context/user-context";
import "./convert.css";
import { ToastContainer, toast } from "react-toastify";
import { useToken } from "../../hooks/useToken";
import { useStake } from "../../hooks/useStake";
import { queryClientState } from "../../context/queryClientState";
// import LoadingModal from "../../components/LoadingModal/LoadingModal";

const Convert = (props: any) => {
  const { balance, client, address } = useRecoilValue(walletState);
  const [swapToken, setSwapToken] = useState("bjuno");
  const [bTokenInputAmount, setbTokenInputAmount] = useState("");
  const [seTokenInputAmount, setseTokenInputAmount] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [eqAmountMessage, setEqAmountMessage] = useState("");

  const [seBalance, setSeBalance] = useState("");
  const [bBalance, setBBalance] = useState("");
  const [rate, setRate] = useState("");
  const [bTokenrate, setBTokenrate] = useState("");
  const [tokenPriceUsd, setTokenPriceUsd] = useState(1);

  const customId1 = "custom-id-1";
  const customId2 = "custom-id-2";
  const { queryClient } = useRecoilValue(queryClientState);
  const token = useToken();
  const { getBRate, getSeRate, doConvert } = useStake();

  const getStakeData = async () => {
    const seRate = await getSeRate();
    const bRate = await getBRate();

    const seBalance = await token.getBalance("se_token");
    const bBalance = await token.getBalance("b_token");

    setRate(seRate as string);
    setBTokenrate(bRate as string);
    setSeBalance(seBalance as string);
    setBBalance(bBalance as string);
  };

  useEffect(() => {
    getStakeData();
  }, [queryClient, props.name, seBalance]);

  const handleInputChange = async (e: any) => {
    console.log(e.target.name);

    const value = e.target.value;
    setInputValue(value);
    if (swapToken === "bjuno") {
      setbTokenInputAmount(value);

      setseTokenInputAmount(
        ((Number(value) * Number(bTokenrate)) / Number(rate)).toFixed(4)
      );
    } else {
      setseTokenInputAmount(value);
      setbTokenInputAmount(
        ((Number(value) * Number(rate)) / Number(bTokenrate)).toFixed(4)
      );
    }
  };

  const handleSwitch = () => {
    if (swapToken === "bjuno") {
      setSwapToken("sejuno");
    } else {
      setSwapToken("bjuno");
    }
    setseTokenInputAmount("");
    setbTokenInputAmount("");
    setInputValue("");
  };

  const CustomToastWithLink = (hash: string) => (
    <div>
      <a
        style={{ color: "blue", textDecoration: "none" }}
        href={"https://www.mintscan.io/juno/txs/" + hash}
        target="_blank"
        rel="noopener noreferrer"
      >
        Click to view your transaction details{" "}
        {hash.substr(0, 5) + "..." + hash.substr(hash.length - 3, 3)}{" "}
      </a>
    </div>
  );

  const convertBtokenToToken = async () => {
    // var inputVal = (document.getElementById("stake-juno-input") as HTMLInputElement).value;

    try {
      //   setEqAmountMessage(
      //     `(convering ${(
      //       Number(props.inputAmount) * rate
      //     ).toLocaleString()} Bjuno to )`
      //   );
      //   setLoading(true);
      //   const res = await client?.execute(
      //     address as string,
      //     bondedToken.at,
      //     {
      //       send: {
      //         amount: (parseFloat(inputValue) * 1_000_000).toFixed(0),
      //         contract: stakingContract.at,
      //         msg: "eyJjb252ZXJ0Ijp7fX0=",
      //       },
      //     },
      //     { amount: [], gas: "1100000" }, // custom fees
      //     "",
      //     []
      //   );

      setLoading(false);
      toast.success(
        `${inputValue} amount of bJUNO successfully converted to seJUNO.`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      //   toast.info(
      //     CustomToastWithLink(res ? res.transactionHash.toString() : "no hash"),
      //     {
      //       position: "top-right",
      //       hideProgressBar: false,
      //       autoClose: 10000,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     }
      //   );

      //   getSeJunoBalance();
      //   getBJunoBalance();

      await doConvert(seTokenInputAmount, "b", "");
      setbTokenInputAmount("");
      setseTokenInputAmount("");
    } catch (error) {
      console.log(error);

      setLoading(false);
      // handleErrorMessage(error);
      return;
    }
  };

  const convertJunoxToBjunox = async () => {
    // var inputVal = (document.getElementById("stake-juno-input") as HTMLInputElement).value;

    try {
      //   setEqAmountMessage(
      //     `(Converting ${(
      //       Number(props.inputAmount) * rate
      //     ).toLocaleString()} juno)`
      //   );
      //   setLoading(true);
      //   const res = await client?.execute(
      //     address as string,
      //     stakingToken.at,
      //     {
      //       send: {
      //         amount: (parseFloat(inputValue) * 1_000_000).toFixed(0),
      //         contract: stakingContract.at,
      //         msg: "eyJjb252ZXJ0Ijp7fX0=",
      //       },
      //     },
      //     { amount: [], gas: "1100000" }, // custom fees
      //     "",
      //     []
      //   );

      setLoading(false);
      toast.success(
        `${inputValue} amount of seJUNO successfully converted to bJUNO.`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      //   toast.info(
      //     CustomToastWithLink(res ? res.transactionHash.toString() : "no hash"),
      //     {
      //       position: "top-right",
      //       hideProgressBar: false,
      //       autoClose: 10000,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     }
      //   );
      //   getSeJunoBalance();
      //   getBJunoBalance();

      await doConvert(seTokenInputAmount, "se", "");

      setbTokenInputAmount("");
      setseTokenInputAmount("");
    } catch (error) {
      console.log(error);

      setLoading(false);
      // handleErrorMessage(error);
      return;
    }
  };
  const maxHandler = (amt: string) => {
    console.log("function call");
    setInputValue(amt);
    if (swapToken === "bjuno") {
      setbTokenInputAmount(amt);

      setseTokenInputAmount(
        ((Number(amt) * Number(bTokenrate)) / Number(rate)).toFixed(4)
      );
    } else {
      setseTokenInputAmount(amt);
      setbTokenInputAmount(
        ((Number(amt) * Number(rate)) / Number(bTokenrate)).toFixed(4)
      );
    }
  };
  return (
    <>
      <div className="stake-menu-header">
        <div className="stake-menu-heading stake-menu__item">
          Convert {swapToken === "sejuno" ? " seJUNO " : " bJUNO "} To{" "}
          {swapToken === "sejuno" ? " bJUNO " : " seJUNO "}
        </div>
      </div>
      <div className="convert-rate-value-wrapper">
        <div className="convert-rate">
          {swapToken === "bjuno" &&
            ` 1 bJUNO ≈ ${
              bTokenInputAmount
                ? (
                    Number(seTokenInputAmount) / Number(bTokenInputAmount)
                  ).toLocaleString()
                : (Number(bTokenrate) / Number(rate)).toLocaleString()
            } seJUNO ≈ ${
              "$" +
              (
                (Number(bTokenrate) / Number(rate)) *
                Number(tokenPriceUsd)
              ).toFixed(5)
            }`}
          {swapToken !== "bjuno" &&
            ` 1 seJUNO ≈ ${
              seTokenInputAmount
                ? (
                    Number(bTokenInputAmount) / Number(seTokenInputAmount)
                  ).toLocaleString()
                : (Number(rate) / Number(bTokenrate)).toLocaleString()
            } bJUNO ≈ ${
              "$" +
              (
                (Number(rate) / Number(bTokenrate)) *
                Number(tokenPriceUsd)
              ).toFixed(5)
            }`}
        </div>
        <div className="convert-value">
          {swapToken === "bjuno" &&
            `$${
              inputValue
                ? (
                    Number(bTokenInputAmount) *
                    (Number(bTokenrate) / Number(rate)) *
                    Number(tokenPriceUsd)
                  ).toLocaleString()
                : "0.00"
            }`}
          {swapToken === "sejuno" &&
            `$${
              inputValue
                ? (
                    Number(seTokenInputAmount) *
                    (Number(rate) / Number(bTokenrate)) *
                    Number(tokenPriceUsd)
                  ).toLocaleString()
                : "0.00"
            }`}
        </div>
      </div>
      <button
        onClick={
          swapToken === "sejuno" ? convertJunoxToBjunox : convertBtokenToToken
        }
        className="stake-btn"
        disabled={
          !bTokenrate ||
          !rate ||
          !bTokenInputAmount ||
          !Number(bTokenInputAmount) ||
          (swapToken === "bjuno"
            ? Number(bTokenInputAmount) > Number(bBalance)
            : Number(seTokenInputAmount) > Number(seBalance))
        }
      >
        Convert
      </button>
      {/* <LoadingModal open={loading}>
        {"Converting"}
        {" " + inputValue + " "}
        {swapToken === "sejuno" ? " seJUNO " : " bJUNO "}
        {" To "}
        {swapToken === "sejuno" ? bTokenInputAmount : seTokenInputAmount}
        {swapToken === "sejuno" ? " bJUNO" : " seJUNO "}
      </LoadingModal> */}
    </>
  );
};

export default Convert;
