import { useRecoilValue } from "recoil";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { toast } from "react-toastify";
import { useConfig } from "./useConfig";
import { TxnLinkComp, coinConvert, sleep } from "../utils/common";
import { networkConstants } from "../utils/constants";
import { walletState } from "../context/walletState";
import { useMessageToaster } from "./useMessageToaster";
import { queryClientState } from "../context/queryClientState";
import {
  RewardContractContract,
  RewardContractQueryContract
} from "./clients/contracts";
import { networkState } from "../context/networkState";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useRewards = () => {
  const config = useConfig();
  const toaster = useMessageToaster();
  const { queryClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);

  const { network } = useRecoilValue(networkState);
  const defaultGas = networkConstants[network].defaultGas;
  const baseDenom = networkConstants[network].baseDenom;

  const rewardsQueryClient = new RewardContractQueryContract[network](
    queryClient as CosmWasmClient,
    config.getOtherContract("rewards").contract_addr,
  );

  const rewardsClient = new RewardContractContract[network](
    client as SigningCosmWasmClient,
    config.getOtherContract("rewards").contract_addr,
  );

  const checkQueryClient = async () => {
    while (true) {
      if (queryClient === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }

  const checkTxnClient = async () => {
    while (true) {
      if (client === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }

  const checkAddressClient = async () => {
    while (true) {
      if (address === undefined) {
        await sleep(0.2);
      } else {
        break;
      }
    }
  }

  /*
   * Returns the bToken pending staking reward of the user
   */
  const getPendingRewards = async () => {
    await checkQueryClient();
    await checkAddressClient();
    try {
      const accruedRewards = await rewardsQueryClient.accruedRewards({address: address as string});

      return coinConvert(accruedRewards.rewards, 6, "human");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Claim the pedning bToken staking rewards
   */
  const doClaim = async (
    gasValue?: string | undefined,
  ) => {
    await checkTxnClient();
    const tid = "Request rejected";

    try {
      const claimResponse = await rewardsClient.claim(
        {
          userAddress: address as string,
          customFees: {
            gas: (gasValue !== undefined)? gasValue: defaultGas.add_liquidity,
            amount: [],
          },
        },
        {
          recipient: address as string,
        }
      );

      if(!claimResponse || claimResponse===undefined){
        // toaster.Error("Failed to UnStake");
      }

      else {
        toast.success(`Claimed reward for b${baseDenom}`
      )

      toast.info(
        claimResponse.transactionHash
          ? TxnLinkComp(claimResponse.transactionHash)
          : "No hash",
        {
          closeOnClick: false,
        }
      );
    }

      return claimResponse;
    } catch (error) {
      console.log(error);
      toaster.Error("Failed to claim rewards");
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
    getPendingRewards,
    doClaim,
  };
};
