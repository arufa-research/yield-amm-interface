import { useRecoilValue } from "recoil";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { toast } from "react-toastify";
import { useConfig } from "./useConfig";
import { TxnLinkComp, coinConvert, sleep } from "../utils/common";
import { networkConstants } from "../utils/constants";
import { walletState } from "../context/walletState";
import { useMessageToaster } from "./useMessageToaster";
import { queryClientState } from "../context/queryClientState";
import { StakingContractContract, StakingContractQueryContract } from "./clients/contracts";
import { useStake } from "./useStake";
import { networkState } from "../context/networkState";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useWithdraw = () => {
  const config = useConfig();
  const { getBRate, getSeRate } = useStake();
  const toaster = useMessageToaster();
  const { queryClient } = useRecoilValue(queryClientState);
  const { client, address } = useRecoilValue(walletState);

  const { network } = useRecoilValue(networkState);
  const defaultGas = networkConstants[network].defaultGas;
  const baseDenom = networkConstants[network].baseDenom;

  const stakingQueryClient = new StakingContractQueryContract[network](
    queryClient as CosmWasmClient,
    config.getOtherContract("staking").contract_addr,
  );
  const stakingClient = new StakingContractContract[network](
    client as SigningCosmWasmClient,
    config.getOtherContract("staking").contract_addr,
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
   * Returns the seToken:token exchange rate
   */
  const getUnstakingValues = async () => {
    await checkQueryClient();
    await checkAddressClient();
    try {
      const bRate = await getBRate();
      const seRate = await getSeRate();
      let totalUnstaking: number = 0;
      let unstakingList: {amount: string; time_remaining: string}[] = [];
      const activeUnbonding = await stakingQueryClient.activeUnbonding({address: address as string});

      let se_token_amount, b_token_amount;
      if (network === "JunoMainnet" || network === "JunoTestnet") {
        se_token_amount = activeUnbonding.active_undelegation.sejuno_amount;
        b_token_amount = activeUnbonding.active_undelegation.bjuno_amount;
      } else if (network === "InjectiveMainnet" || network === "InjectiveTestnet") {
        se_token_amount = activeUnbonding.active_undelegation.seinj_amount;
        b_token_amount = activeUnbonding.active_undelegation.binj_amount;
      } else if (network === "ArchwayMainnet" || network === "ArchwayTestnet") {
        se_token_amount = activeUnbonding.active_undelegation.seArch_amount;
        b_token_amount = activeUnbonding.active_undelegation.barch_amount;
      }

      const seAmount = parseFloat(se_token_amount) * parseFloat(seRate as string);
      const bAmount = parseFloat(b_token_amount) * parseFloat(bRate as string);
      const activeAmount = bAmount + seAmount;

      if (activeAmount > 0) {
        unstakingList.push({
          amount: coinConvert(activeAmount, 6, "human"),
          time_remaining: "", // TODO: fill this (active window time remaining + unstaking period)
        });
        totalUnstaking += parseFloat(coinConvert(activeAmount, 6, "human"));
      }

      const undelegations = await stakingQueryClient.undelegations({address: address as string});

      for (const undelegation of undelegations.pending_claims.pending) {
        let token_amount;
        if (network === "JunoMainnet" || network === "JunoTestnet") {
          token_amount = undelegation.juno_amount;
        } else if (network === "InjectiveMainnet" || network === "InjectiveTestnet") {
          token_amount = undelegation.inj_amount;
        } else if (network === "ArchwayMainnet" || network === "ArchwayTestnet") {
          token_amount = undelegation.arch_amount;
        }

        unstakingList.push({
          amount: coinConvert(token_amount, 6, "human"),
          time_remaining: "", // TODO: fill this (window count * window period)
        });
        totalUnstaking += parseFloat(coinConvert(token_amount, 6, "human"));
      }

      const userClaimable = await stakingQueryClient.userClaimable({address: address as string});
      return {
        unstaked: coinConvert(userClaimable.claimable.claimable_amount, 6, "human"),
        unstaking: totalUnstaking.toFixed(4),
        unstaking_list: unstakingList
      };
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Withdraw Token after unstaking period complete
   */
  const doWithdraw = async (
    gasValue?: string | undefined,
  ) => {
    await checkTxnClient();
    const tid = "Request Rejected";

    try {
      const stakeResponse = await stakingClient.claim(
        {
          userAddress: address as string,
          customFees: {
            gas: (gasValue !== undefined)? gasValue: defaultGas.add_liquidity,
            amount: [],
          },
        },
      );

      if(!stakeResponse || stakeResponse===undefined){
        // toaster.Error("Failed to UnStake");
      }

      else {
        toast.success(`Withdraw Successfull`
      )

      toast.info(
        stakeResponse.transactionHash
          ? TxnLinkComp(stakeResponse.transactionHash)
          : "No hash",
        {
          closeOnClick: false,
        }
      );
    }


      
      return stakeResponse;
    } catch (error) {
      console.log(error);
      toaster.Error(`Failed to withdraw ${baseDenom}`);
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
    getUnstakingValues,
    doWithdraw,
  };
};
