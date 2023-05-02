import { useRecoilValue } from "recoil";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { useConfig } from "./useConfig";
import { coinConvert, sleep } from "../utils/common";
import { networkConstants } from "../utils/constants";
import { queryClientState } from "../context/queryClientState";
import { StakingContractQueryContract } from "./clients/contracts";
import { networkState } from "../context/networkState";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useStats = () => {
  const config = useConfig();
  const { queryClient } = useRecoilValue(queryClientState);

  const { network } = useRecoilValue(networkState);
  const VALIDATORS = networkConstants[network].VALIDATORS;

  const stakingQueryClient = new StakingContractQueryContract[network](
    queryClient as CosmWasmClient,
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
  }

  /*
   * Returns the contract related info on protocol
   */
  const getContractInfo = async () => {
    await checkQueryClient();
    try {
      const info = await stakingQueryClient.info();
      // console.log("info: ", info);

      let se_token_info, b_token_info, token_under_withdraw;
      if (network === "JunoMainnet" || network === "JunoTestnet") {
        se_token_info = info.info.sejuno_token;
        b_token_info = info.info.bjuno_token;
        token_under_withdraw = info.info.juno_under_withdraw;
      } else if (network === "InjectiveMainnet" || network === "InjectiveTestnet") {
        se_token_info = info.info.seinj_token;
        b_token_info = info.info.binj_token;
        token_under_withdraw = info.info.inj_under_withdraw;
      } else if (network === "ArchwayMainnet" || network === "ArchwayTestnet") {
        se_token_info = info.info.seArch_token;
        b_token_info = info.info.barch_token;
        token_under_withdraw = info.info.juno_under_withdraw;
      }

      return {
        admin: info.info.admin,
        staking_contract: stakingQueryClient.contractAddress,
        rewards_contract: info.info.rewards_contract,
        se_token: se_token_info,
        b_token: b_token_info,
        total_staked: coinConvert(info.info.total_staked, 6, "human"),
        under_withdraw: coinConvert(token_under_withdraw, 6, "human"),
      };
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Returns the list of validators in protocol
   */
  const getValidatorsList = async () => {
    await checkQueryClient();
    try {
      const info = await stakingQueryClient.info();
      const valList = info.info.validator_set.map(
        (val: { address: string; staked: string }) => {
          return {
            name: VALIDATORS[val.address],
            address: val.address,
            staked: coinConvert(val.staked, 6, "human"),
          };
        }
      );

      return valList;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /*
   * Returns the active window related information
   */
  const getWindowInfo = async () => {
    await checkQueryClient();
    try {
      const window = await stakingQueryClient.window();

      return {
        id: window.window.id,
        time_to_close: window.window.time_to_close,
      };
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return {
    getContractInfo,
    getValidatorsList,
    getWindowInfo,
  };
};
