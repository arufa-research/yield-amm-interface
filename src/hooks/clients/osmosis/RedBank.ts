/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.27.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { Coin, StdFee } from "@cosmjs/amino";
import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.27.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/
export type Decimal = string;
export interface InstantiateMsg {
  config: CreateOrUpdateConfig;
  emergency_owner: string;
  owner: string;
}
export interface CreateOrUpdateConfig {
  address_provider?: string | null;
  close_factor?: Decimal | null;
}
export type ExecuteMsg = {
  update_owner: OwnerUpdate;
} | {
  update_emergency_owner: OwnerUpdate;
} | {
  update_config: {
    config: CreateOrUpdateConfig;
  };
} | {
  init_asset: {
    denom: string;
    params: InitOrUpdateAssetParams;
  };
} | {
  update_asset: {
    denom: string;
    params: InitOrUpdateAssetParams;
  };
} | {
  update_uncollateralized_loan_limit: {
    denom: string;
    new_limit: Uint128;
    user: string;
  };
} | {
  deposit: {
    on_behalf_of?: string | null;
  };
} | {
  withdraw: {
    amount?: Uint128 | null;
    denom: string;
    recipient?: string | null;
  };
} | {
  borrow: {
    amount: Uint128;
    denom: string;
    recipient?: string | null;
  };
} | {
  repay: {
    on_behalf_of?: string | null;
  };
} | {
  liquidate: {
    collateral_denom: string;
    recipient?: string | null;
    user: string;
  };
} | {
  update_asset_collateral_status: {
    denom: string;
    enable: boolean;
  };
};
export type OwnerUpdate = {
  propose_new_owner: {
    proposed: string;
  };
} | "clear_proposed" | "accept_proposed" | "abolish_owner_role";
export type Uint128 = string;
export interface InitOrUpdateAssetParams {
  borrow_enabled?: boolean | null;
  deposit_cap?: Uint128 | null;
  deposit_enabled?: boolean | null;
  interest_rate_model?: InterestRateModel | null;
  liquidation_bonus?: Decimal | null;
  liquidation_threshold?: Decimal | null;
  max_loan_to_value?: Decimal | null;
  reserve_factor?: Decimal | null;
}
export interface InterestRateModel {
  base: Decimal;
  optimal_utilization_rate: Decimal;
  slope_1: Decimal;
  slope_2: Decimal;
}
export type QueryMsg = {
  config: {};
} | {
  market: {
    denom: string;
  };
} | {
  markets: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  uncollateralized_loan_limit: {
    denom: string;
    user: string;
  };
} | {
  uncollateralized_loan_limits: {
    limit?: number | null;
    start_after?: string | null;
    user: string;
  };
} | {
  user_debt: {
    denom: string;
    user: string;
  };
} | {
  user_debts: {
    limit?: number | null;
    start_after?: string | null;
    user: string;
  };
} | {
  user_collateral: {
    denom: string;
    user: string;
  };
} | {
  user_collaterals: {
    limit?: number | null;
    start_after?: string | null;
    user: string;
  };
} | {
  user_position: {
    user: string;
  };
} | {
  scaled_liquidity_amount: {
    amount: Uint128;
    denom: string;
  };
} | {
  scaled_debt_amount: {
    amount: Uint128;
    denom: string;
  };
} | {
  underlying_liquidity_amount: {
    amount_scaled: Uint128;
    denom: string;
  };
} | {
  underlying_debt_amount: {
    amount_scaled: Uint128;
    denom: string;
  };
};
export interface ConfigResponse {
  address_provider: string;
  close_factor: Decimal;
  emergency_owner?: string | null;
  owner?: string | null;
  proposed_new_emergency_owner?: string | null;
  proposed_new_owner?: string | null;
}
export interface Market {
  borrow_enabled: boolean;
  borrow_index: Decimal;
  borrow_rate: Decimal;
  collateral_total_scaled: Uint128;
  debt_total_scaled: Uint128;
  denom: string;
  deposit_cap: Uint128;
  deposit_enabled: boolean;
  indexes_last_updated: number;
  interest_rate_model: InterestRateModel;
  liquidation_bonus: Decimal;
  liquidation_threshold: Decimal;
  liquidity_index: Decimal;
  liquidity_rate: Decimal;
  max_loan_to_value: Decimal;
  reserve_factor: Decimal;
}
export type ArrayOfMarket = Market[];
export interface UncollateralizedLoanLimitResponse {
  denom: string;
  limit: Uint128;
}
export type ArrayOfUncollateralizedLoanLimitResponse = UncollateralizedLoanLimitResponse[];
export interface UserCollateralResponse {
  amount: Uint128;
  amount_scaled: Uint128;
  denom: string;
  enabled: boolean;
}
export type ArrayOfUserCollateralResponse = UserCollateralResponse[];
export interface UserDebtResponse {
  amount: Uint128;
  amount_scaled: Uint128;
  denom: string;
  uncollateralized: boolean;
}
export type ArrayOfUserDebtResponse = UserDebtResponse[];
export type UserHealthStatus = "not_borrowing" | {
  borrowing: {
    liq_threshold_hf: Decimal;
    max_ltv_hf: Decimal;
  };
};
export interface UserPositionResponse {
  health_status: UserHealthStatus;
  total_collateralized_debt: Uint128;
  total_enabled_collateral: Uint128;
  weighted_liquidation_threshold_collateral: Uint128;
  weighted_max_ltv_collateral: Uint128;
}

export interface MarsRedBankReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  market: ({
    denom
  }: {
    denom: string;
  }) => Promise<Market>;
  markets: ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: string;
  }) => Promise<ArrayOfMarket>;
  uncollateralizedLoanLimit: ({
    denom,
    user
  }: {
    denom: string;
    user: string;
  }) => Promise<UncollateralizedLoanLimitResponse>;
  uncollateralizedLoanLimits: ({
    limit,
    startAfter,
    user
  }: {
    limit?: number;
    startAfter?: string;
    user: string;
  }) => Promise<ArrayOfUncollateralizedLoanLimitResponse>;
  userDebt: ({
    denom,
    user
  }: {
    denom: string;
    user: string;
  }) => Promise<UserDebtResponse>;
  userDebts: ({
    limit,
    startAfter,
    user
  }: {
    limit?: number;
    startAfter?: string;
    user: string;
  }) => Promise<ArrayOfUserDebtResponse>;
  userCollateral: ({
    denom,
    user
  }: {
    denom: string;
    user: string;
  }) => Promise<UserCollateralResponse>;
  userCollaterals: ({
    limit,
    startAfter,
    user
  }: {
    limit?: number;
    startAfter?: string;
    user: string;
  }) => Promise<ArrayOfUserCollateralResponse>;
  userPosition: ({
    user
  }: {
    user: string;
  }) => Promise<UserPositionResponse>;
  scaledLiquidityAmount: ({
    amount,
    denom
  }: {
    amount: Uint128;
    denom: string;
  }) => Promise<Uint128>;
  scaledDebtAmount: ({
    amount,
    denom
  }: {
    amount: Uint128;
    denom: string;
  }) => Promise<Uint128>;
  underlyingLiquidityAmount: ({
    amountScaled,
    denom
  }: {
    amountScaled: Uint128;
    denom: string;
  }) => Promise<Uint128>;
  underlyingDebtAmount: ({
    amountScaled,
    denom
  }: {
    amountScaled: Uint128;
    denom: string;
  }) => Promise<Uint128>;
}
export class MarsRedBankQueryContract implements MarsRedBankReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.market = this.market.bind(this);
    this.markets = this.markets.bind(this);
    this.uncollateralizedLoanLimit = this.uncollateralizedLoanLimit.bind(this);
    this.uncollateralizedLoanLimits = this.uncollateralizedLoanLimits.bind(this);
    this.userDebt = this.userDebt.bind(this);
    this.userDebts = this.userDebts.bind(this);
    this.userCollateral = this.userCollateral.bind(this);
    this.userCollaterals = this.userCollaterals.bind(this);
    this.userPosition = this.userPosition.bind(this);
    this.scaledLiquidityAmount = this.scaledLiquidityAmount.bind(this);
    this.scaledDebtAmount = this.scaledDebtAmount.bind(this);
    this.underlyingLiquidityAmount = this.underlyingLiquidityAmount.bind(this);
    this.underlyingDebtAmount = this.underlyingDebtAmount.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  market = async ({
    denom
  }: {
    denom: string;
  }): Promise<Market> => {
    return this.client.queryContractSmart(this.contractAddress, {
      market: {
        denom
      }
    });
  };
  markets = async ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: string;
  }): Promise<ArrayOfMarket> => {
    return this.client.queryContractSmart(this.contractAddress, {
      markets: {
        limit,
        start_after: startAfter
      }
    });
  };
  uncollateralizedLoanLimit = async ({
    denom,
    user
  }: {
    denom: string;
    user: string;
  }): Promise<UncollateralizedLoanLimitResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      uncollateralized_loan_limit: {
        denom,
        user
      }
    });
  };
  uncollateralizedLoanLimits = async ({
    limit,
    startAfter,
    user
  }: {
    limit?: number;
    startAfter?: string;
    user: string;
  }): Promise<ArrayOfUncollateralizedLoanLimitResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      uncollateralized_loan_limits: {
        limit,
        start_after: startAfter,
        user
      }
    });
  };
  userDebt = async ({
    denom,
    user
  }: {
    denom: string;
    user: string;
  }): Promise<UserDebtResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_debt: {
        denom,
        user
      }
    });
  };
  userDebts = async ({
    limit,
    startAfter,
    user
  }: {
    limit?: number;
    startAfter?: string;
    user: string;
  }): Promise<ArrayOfUserDebtResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_debts: {
        limit,
        start_after: startAfter,
        user
      }
    });
  };
  userCollateral = async ({
    denom,
    user
  }: {
    denom: string;
    user: string;
  }): Promise<UserCollateralResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_collateral: {
        denom,
        user
      }
    });
  };
  userCollaterals = async ({
    limit,
    startAfter,
    user
  }: {
    limit?: number;
    startAfter?: string;
    user: string;
  }): Promise<ArrayOfUserCollateralResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_collaterals: {
        limit,
        start_after: startAfter,
        user
      }
    });
  };
  userPosition = async ({
    user
  }: {
    user: string;
  }): Promise<UserPositionResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_position: {
        user
      }
    });
  };
  scaledLiquidityAmount = async ({
    amount,
    denom
  }: {
    amount: Uint128;
    denom: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      scaled_liquidity_amount: {
        amount,
        denom
      }
    });
  };
  scaledDebtAmount = async ({
    amount,
    denom
  }: {
    amount: Uint128;
    denom: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      scaled_debt_amount: {
        amount,
        denom
      }
    });
  };
  underlyingLiquidityAmount = async ({
    amountScaled,
    denom
  }: {
    amountScaled: Uint128;
    denom: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      underlying_liquidity_amount: {
        amount_scaled: amountScaled,
        denom
      }
    });
  };
  underlyingDebtAmount = async ({
    amountScaled,
    denom
  }: {
    amountScaled: Uint128;
    denom: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      underlying_debt_amount: {
        amount_scaled: amountScaled,
        denom
      }
    });
  };
}
export interface MarsRedBankInterface extends MarsRedBankReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateOwner: (ownerUpdate: OwnerUpdate, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateEmergencyOwner: (ownerUpdate: OwnerUpdate, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    config
  }: {
    config: CreateOrUpdateConfig;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  initAsset: ({
    denom,
    params
  }: {
    denom: string;
    params: InitOrUpdateAssetParams;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateAsset: ({
    denom,
    params
  }: {
    denom: string;
    params: InitOrUpdateAssetParams;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateUncollateralizedLoanLimit: ({
    denom,
    newLimit,
    user
  }: {
    denom: string;
    newLimit: Uint128;
    user: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  deposit: ({
    onBehalfOf
  }: {
    onBehalfOf?: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  withdraw: ({
    amount,
    denom,
    recipient
  }: {
    amount?: Uint128;
    denom: string;
    recipient?: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  borrow: ({
    amount,
    denom,
    recipient
  }: {
    amount: Uint128;
    denom: string;
    recipient?: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  repay: ({
    onBehalfOf
  }: {
    onBehalfOf?: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  liquidate: ({
    collateralDenom,
    recipient,
    user
  }: {
    collateralDenom: string;
    recipient?: string;
    user: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateAssetCollateralStatus: ({
    denom,
    enable
  }: {
    denom: string;
    enable: boolean;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class MarsRedBankContract extends MarsRedBankQueryContract implements MarsRedBankInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateOwner = this.updateOwner.bind(this);
    this.updateEmergencyOwner = this.updateEmergencyOwner.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.initAsset = this.initAsset.bind(this);
    this.updateAsset = this.updateAsset.bind(this);
    this.updateUncollateralizedLoanLimit = this.updateUncollateralizedLoanLimit.bind(this);
    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.borrow = this.borrow.bind(this);
    this.repay = this.repay.bind(this);
    this.liquidate = this.liquidate.bind(this);
    this.updateAssetCollateralStatus = this.updateAssetCollateralStatus.bind(this);
  }

  updateOwner = async (ownerUpdate: OwnerUpdate, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_owner: ownerUpdate
    }, fee, memo, funds);
  };
  updateEmergencyOwner = async (ownerUpdate: OwnerUpdate, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_emergency_owner: ownerUpdate
    }, fee, memo, funds);
  };
  updateConfig = async ({
    config
  }: {
    config: CreateOrUpdateConfig;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        config
      }
    }, fee, memo, funds);
  };
  initAsset = async ({
    denom,
    params
  }: {
    denom: string;
    params: InitOrUpdateAssetParams;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      init_asset: {
        denom,
        params
      }
    }, fee, memo, funds);
  };
  updateAsset = async ({
    denom,
    params
  }: {
    denom: string;
    params: InitOrUpdateAssetParams;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_asset: {
        denom,
        params
      }
    }, fee, memo, funds);
  };
  updateUncollateralizedLoanLimit = async ({
    denom,
    newLimit,
    user
  }: {
    denom: string;
    newLimit: Uint128;
    user: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_uncollateralized_loan_limit: {
        denom,
        new_limit: newLimit,
        user
      }
    }, fee, memo, funds);
  };
  deposit = async ({
    onBehalfOf
  }: {
    onBehalfOf?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      deposit: {
        on_behalf_of: onBehalfOf
      }
    }, fee, memo, funds);
  };
  withdraw = async ({
    amount,
    denom,
    recipient
  }: {
    amount?: Uint128;
    denom: string;
    recipient?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      withdraw: {
        amount,
        denom,
        recipient
      }
    }, fee, memo, funds);
  };
  borrow = async ({
    amount,
    denom,
    recipient
  }: {
    amount: Uint128;
    denom: string;
    recipient?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      borrow: {
        amount,
        denom,
        recipient
      }
    }, fee, memo, funds);
  };
  repay = async ({
    onBehalfOf
  }: {
    onBehalfOf?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      repay: {
        on_behalf_of: onBehalfOf
      }
    }, fee, memo, funds);
  };
  liquidate = async ({
    collateralDenom,
    recipient,
    user
  }: {
    collateralDenom: string;
    recipient?: string;
    user: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      liquidate: {
        collateral_denom: collateralDenom,
        recipient,
        user
      }
    }, fee, memo, funds);
  };
  updateAssetCollateralStatus = async ({
    denom,
    enable
  }: {
    denom: string;
    enable: boolean;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_asset_collateral_status: {
        denom,
        enable
      }
    }, fee, memo, funds);
  };
}