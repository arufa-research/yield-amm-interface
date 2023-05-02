import { Contract, Coin, TxnStdFee } from "./contract";
import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export type Uint128 = string;
export interface AccruedRewardsResponse {
  rewards: Uint128;
  [k: string]: unknown;
}
export interface ConfigResponse {
  bjuno_contract?: string | null;
  staking_contract: string;
  [k: string]: unknown;
}
export type Addr = string;
export type CanonicalAddr = string;
export interface Config {
  admin: Addr;
  bjuno_contract?: CanonicalAddr | null;
  staking_contract: CanonicalAddr;
  whitelisted_contracts: CanonicalAddr[];
  [k: string]: unknown;
}
export type ExecuteMsg = {
  update_global_index: {
    [k: string]: unknown;
  };
} | {
  increase_balance: {
    address: string;
    amount: Uint128;
    [k: string]: unknown;
  };
} | {
  decrease_balance: {
    address: string;
    amount: Uint128;
    [k: string]: unknown;
  };
} | {
  claim: {
    recipient?: string | null;
    [k: string]: unknown;
  };
} | {
  whitelist_claim: {
    contract_address: string;
    recipient?: string | null;
    [k: string]: unknown;
  };
} | {
  update_bjuno_addr: {
    address: string;
    [k: string]: unknown;
  };
} | {
  add_to_whitelist: {
    address: string;
    [k: string]: unknown;
  };
} | {
  remove_from_whitelist: {
    address: string;
    [k: string]: unknown;
  };
};
export type Decimal = string;
export interface HolderResponse {
  address: string;
  balance: Uint128;
  index: Decimal;
  is_whitelisted: boolean;
  pending_rewards: Decimal;
  [k: string]: unknown;
}
export interface Holder {
  balance: Uint128;
  index: Decimal;
  is_whitelisted: boolean;
  pending_rewards: Decimal;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  staking_contract: string;
  [k: string]: unknown;
}
export interface MigrateMsg {
  [k: string]: unknown;
}
export type QueryMsg = {
  config: {
    [k: string]: unknown;
  };
} | {
  state: {
    [k: string]: unknown;
  };
} | {
  accrued_rewards: {
    address: string;
    [k: string]: unknown;
  };
} | {
  holder: {
    address: string;
    [k: string]: unknown;
  };
};
export interface StateResponse {
  global_index: Decimal;
  prev_reward_balance: Uint128;
  total_balance: Uint128;
  [k: string]: unknown;
}
export interface State {
  global_index: Decimal;
  prev_reward_balance: Uint128;
  total_balance: Uint128;
  [k: string]: unknown;
}
export interface RewardContractReadOnlyInterface {
  config: () => Promise<any>;
  state: () => Promise<any>;
  accruedRewards: ({
    address
  }: {
    address: string;
  }) => Promise<any>;
  holder: ({
    address
  }: {
    address: string;
  }) => Promise<any>;
}
export class RewardContractQueryContract extends Contract implements RewardContractReadOnlyInterface {
  constructor(client: CosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.config = this.config.bind(this);
    this.state = this.state.bind(this);
    this.accruedRewards = this.accruedRewards.bind(this);
    this.holder = this.holder.bind(this);
  }

  config = async (): Promise<any> => {
    return this.queryMsg({
      config: {}
    });
  };
  state = async (): Promise<any> => {
    return this.queryMsg({
      state: {}
    });
  };
  accruedRewards = async ({
    address
  }: {
    address: string;
  }): Promise<any> => {
    return this.queryMsg({
      accrued_rewards: {
        address
      }
    });
  };
  holder = async ({
    address
  }: {
    address: string;
  }): Promise<any> => {
    return this.queryMsg({
      holder: {
        address
      }
    });
  };
}
export interface RewardContractInterface extends RewardContractReadOnlyInterface {
  updateGlobalIndex: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<ExecuteResult>;
  increaseBalance: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount
  }: {
    address: string;
    amount: string;
  }) => Promise<ExecuteResult>;
  decreaseBalance: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount
  }: {
    address: string;
    amount: string;
  }) => Promise<ExecuteResult>;
  claim: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    recipient
  }: {
    recipient?: string;
  }) => Promise<ExecuteResult>;
  whitelistClaim: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    contractAddress,
    recipient
  }: {
    contractAddress: string;
    recipient?: string;
  }) => Promise<ExecuteResult>;
  updateBjunoAddr: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  addToWhitelist: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
  removeFromWhitelist: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: string;
  }) => Promise<ExecuteResult>;
}
export class RewardContractContract extends RewardContractQueryContract implements RewardContractInterface {
  constructor(client: SigningCosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.updateGlobalIndex = this.updateGlobalIndex.bind(this);
    this.increaseBalance = this.increaseBalance.bind(this);
    this.decreaseBalance = this.decreaseBalance.bind(this);
    this.claim = this.claim.bind(this);
    this.whitelistClaim = this.whitelistClaim.bind(this);
    this.updateBjunoAddr = this.updateBjunoAddr.bind(this);
    this.addToWhitelist = this.addToWhitelist.bind(this);
    this.removeFromWhitelist = this.removeFromWhitelist.bind(this);
  }

  updateGlobalIndex = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      update_global_index: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  increaseBalance = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount
  }: {
    address: string;
    amount: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      increase_balance: {
        address,
        amount
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  decreaseBalance = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount
  }: {
    address: string;
    amount: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      decrease_balance: {
        address,
        amount
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  claim = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    recipient
  }: {
    recipient?: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      claim: {
        recipient
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  whitelistClaim = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    contractAddress,
    recipient
  }: {
    contractAddress: string;
    recipient?: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      whitelist_claim: {
        contract_address: contractAddress,
        recipient
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  updateBjunoAddr = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      update_bjuno_addr: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  addToWhitelist = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      add_to_whitelist: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  removeFromWhitelist = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: string;
  }): Promise<ExecuteResult> => {
    return await this.executeMsg({
      remove_from_whitelist: {
        address
      }
    }, userAddress, customFees, memo, transferAmount);
  };
}