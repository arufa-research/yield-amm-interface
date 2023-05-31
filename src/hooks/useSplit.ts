import axios from "axios";
import { Buffer } from "buffer";
import { useRecoilValue } from "recoil";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

import { useToken } from "./useToken";
import { toast } from "react-toastify";
import { useConfig } from "./useConfig";
import { TxnLinkComp, coinConvert, sleep } from "../utils/common";
import { walletState } from "../context/walletState";
import { useMessageToaster } from "./useMessageToaster";
import { networkConstants } from "../utils/constants";
import { queryClientState } from "../context/queryClientState";
import {
  StakingContractContract,
  StakingContractQueryContract,
} from "./clients/contracts";
import { networkState } from "../context/networkState";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useStake = () => {
  const token = useToken();
  const config = useConfig();
  const toaster = useMessageToaster();
  const { queryClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);

  const { network } = useRecoilValue(networkState);
  const defaultGas = networkConstants[network].defaultGas;
  const baseDenom = networkConstants[network].baseDenom;
  const baseSymbol = networkConstants[network].baseSymbol;

  const stakingQueryClient = new StakingContractQueryContract[network](
    queryClient as CosmWasmClient,
    config.getOtherContract("staking").contract_addr
  );
  const stakingClient = new StakingContractContract[network](
    client as SigningCosmWasmClient,
    config.getOtherContract("staking").contract_addr
  );

  const checkQueryClient = async () => {
    while (true) {
      if (queryClient === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  };

  const checkTxnClient = async () => {
    while (true) {
      if (client === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  };

  const checkAddressClient = async () => {
    while (true) {
      if (address === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  };

  /*
   * Returns the seToken:token exchange rate
   */
  const getSeRate = async (): Promise<string | undefined> => {
    await checkQueryClient();
    try {
      if (network === "JunoMainnet" || network === "JunoTestnet") {
        const seExchRate = await stakingQueryClient.sejunoExchangeRate();
        return seExchRate.sejuno_exchange_rate.rate;
      } else if (network === "InjectiveMainnet" || network === "InjectiveTestnet") {
        const seExchRate = await stakingQueryClient.seinjExchangeRate();
        return seExchRate.seinj_exchange_rate.rate;
      } else if (network === "ArchwayMainnet" || network === "ArchwayTestnet") {
        const seExchRate = await stakingQueryClient.seArchExchangeRate();
        return seExchRate.se_arch_exchange_rate.rate;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Returns the bToken:token exchange rate
   */
  const getBRate = async (): Promise<string | undefined> => {
    await checkQueryClient();
    try {
      if (network === "JunoMainnet" || network === "JunoTestnet") {
        const bExchRate = await stakingQueryClient.bjunoExchangeRate();
        return bExchRate.bjuno_exchange_rate.rate;
      } else if (network === "InjectiveMainnet" || network === "InjectiveTestnet") {
        const bExchRate = await stakingQueryClient.binjExchangeRate();
        return bExchRate.binj_exchange_rate.rate;
      } else if (network === "ArchwayMainnet" || network === "ArchwayTestnet") {
        const bExchRate = await stakingQueryClient.bArchExchangeRate();
        return bExchRate.b_arch_exchange_rate.rate;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Returns total amount of token staked
   */
  const getTVL = async (): Promise<string | undefined> => {
    await checkQueryClient();
    try {
      const info = await stakingQueryClient.info();

      if (network === "JunoMainnet" || network === "JunoTestnet") {
        const tvl = coinConvert(
          parseFloat(info.info.total_staked) +
            parseFloat(info.info.juno_under_withdraw) +
            parseFloat(info.info.to_deposit),
          6,
          "human"
        );
        return tvl;
      } else if (network === "InjectiveMainnet" || network === "InjectiveTestnet") {
        const tvl = coinConvert(
          parseFloat(info.info.total_staked) +
            parseFloat(info.info.inj_under_withdraw) +
            parseFloat(info.info.to_deposit),
          6,
          "human"
        );
        return tvl;
      } else if (network === "ArchwayMainnet" || network === "ArchwayTestnet") {
        const tvl = coinConvert(
          parseFloat(info.info.total_staked) +
            parseFloat(info.info.arch_under_withdraw) +
            parseFloat(info.info.to_deposit),
          6,
          "human"
        );
        return tvl;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Returns current staking APY
   */
  const getAPY = async (): Promise<string | undefined> => {
    await checkQueryClient();
    try {
      const apyRes = await axios.get(
        "https://arufaresearch.pythonanywhere.com/juno_apy"
      );

      return (apyRes.data.apy * 100).toFixed(4);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Stake token for seToken or bToken
   */
  const doStake = async (
    tokenAmount: string,
    tokenType: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";
    console.log("ye hai", baseDenom, baseSymbol, tokenType)
    try {
      let unstakeResponse;
      if (tokenType === "se") {
        // seToken
        unstakeResponse = await stakingClient.stake(
          {
            userAddress: address as string,
            customFees: {
              gas: gasValue !== undefined ? gasValue : defaultGas.add_liquidity,
              amount: [],
            },
            transferAmount: [
              {
                amount: coinConvert(tokenAmount, 6, "machine"),
                denom: baseDenom,
              },
            ],
          },
          {
            referral: 0,
          }
        );
      } else {
        // bToken
        let stakeForBtoken;
        if (network === "JunoMainnet" || network === "JunoTestnet") {
          stakeForBtoken = stakingClient.stakeForBjuno;
        } else if (network === "InjectiveMainnet" || network === "InjectiveTestnet") {
          stakeForBtoken = stakingClient.stakeForBinj;
        } else if (network === "ArchwayMainnet" || network === "ArchwayTestnet") {
          stakeForBtoken = stakingClient.stakeForbarch;
        }
        unstakeResponse = await stakeForBtoken(
          {
            userAddress: address as string,
            customFees: {
              gas: gasValue !== undefined ? gasValue : defaultGas.add_liquidity,
              amount: [],
            },
            transferAmount: [
              {
                amount: coinConvert(tokenAmount, 6, "machine"),
                denom: baseDenom,
              },
            ],
          },
          {
            referral: 0,
          }
        );
      }

      if(!unstakeResponse || unstakeResponse===undefined){
        toaster.Error("Failed to Stake SCRT");
        toaster.Error((unstakeResponse.rawLog).substr(0,100) + "...");
      }

      else {
        toast.success(`Staked ${tokenAmount} ${baseSymbol} for ${tokenType}${baseSymbol}`
      )

      toast.info(
        unstakeResponse.transactionHash
          ? TxnLinkComp(unstakeResponse.transactionHash)
          : "No hash",
        {
          closeOnClick: false,
        }
      );
    }

      console.log("stakeresponse", unstakeResponse);
      return unstakeResponse;
    } catch (error) {
      toaster.Error("Failed to stake.");
      console.log(error);
      toast.info(tid, {
        type: "error",
        closeOnClick: true,
        // render: "Request rejected",
        autoClose: 5000,
        isLoading: false,
      });
      if (error instanceof Error) {
        toaster.Error(error.message);
      }
      return;
    }
  };

  /*
   * Unstake seToken or bToken for token
   */
  const doUnstake = async (
    tokenAmount: string,
    tokenType: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";

    try {
      const unstakeMsg = {
        unbond: {},
      };
      let unstakeResponse;
      if (tokenType === "se") {
        // seToken
        unstakeResponse = await token.doSend(
          "se_token",
          tokenAmount,
          stakingQueryClient.contractAddress,
          Buffer.from(JSON.stringify(unstakeMsg)).toString("base64")
        );
      } else {
        // bToken
        unstakeResponse = await token.doSend(
          "b_token",
          tokenAmount,
          stakingQueryClient.contractAddress,
          Buffer.from(JSON.stringify(unstakeMsg)).toString("base64")
        );
      }

      if(!unstakeResponse || unstakeResponse===undefined){
        // toaster.Error("Failed to UnStake");
      }

      else {
        toast.success(`UnStaked ${tokenAmount} ${baseDenom} for ${tokenType}${baseDenom}`
      )

      toast.info(
        unstakeResponse.transactionHash
          ? TxnLinkComp(unstakeResponse.transactionHash)
          : "No hash",
        {
          closeOnClick: false,
        }
      );
    }

      console.log("unstakeresponse", unstakeResponse);
      return unstakeResponse;
    } catch (error) {
      console.log(error);
      toaster.Error("Failed to unstake");
      toast.info(tid, {
        type: "error",
        closeOnClick: true,
        // render: "Request rejected",
        autoClose: 5000,
        isLoading: false,
      });

      if (error instanceof Error) {
        toaster.Error(error.message);
      }
      return;
    }
  };

  /*
   * Convert between seToken and bToken
   */
  const doConvert = async (
    tokenAmount: string,
    tokenType: string,
    gasValue?: string | undefined
  ) => {
    await checkTxnClient();
    const tid = "Request rejected";

    try {
      const convertMsg = {
        convert: {},
      };
      let unstakeResponse;
      if (tokenType === "se") {
        // seToken
        unstakeResponse = await token.doSend(
          "se_token",
          tokenAmount,
          stakingQueryClient.contractAddress,
          Buffer.from(JSON.stringify(convertMsg)).toString("base64")
        );
      } else {
        // bToken
        unstakeResponse = await token.doSend(
          "b_token",
          tokenAmount,
          stakingQueryClient.contractAddress,
          Buffer.from(JSON.stringify(convertMsg)).toString("base64")
        );
      }
      console.log("convert response", unstakeResponse);

      if(!unstakeResponse || unstakeResponse===undefined){
        // toaster.Error("Failed to UnStake");
      }

      else {
        toast.success(`Converted ${tokenAmount} ${baseDenom} for ${tokenType}${baseDenom}`
      )

      toast.info(
        unstakeResponse.transactionHash
          ? TxnLinkComp(unstakeResponse.transactionHash)
          : "No hash",
        {
          closeOnClick: false,
        }
      );
    }

      return unstakeResponse;
    } catch (error) {
      console.log("from here", error);
      toaster.Error("Failed to convert");
      toast.info(tid, {
        type: "error",
        closeOnClick: true,
        // render: "Request rejected",
        autoClose: 5000,
        isLoading: false,
      });
      if (error instanceof Error) {
        toaster.Error(error.message);
      }
      return;
    }
  };

  return {
    getSeRate,
    getBRate,
    getTVL,
    getAPY,
    doStake,
    doUnstake,
    doConvert,
  };
};
