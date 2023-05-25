import { Contract, Coin, TxnStdFee } from "./contract";
import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export type ExecuteMsg = {
  deposit: {};
} | {
  update_yield_bearing_token: {
    yield_bearing_token: Addr;
  };
} | {
  receive: Cw20ReceiveMsg;
};
export type Addr = string;
export type Uint128 = string;
export type Binary = string;
export interface Cw20ReceiveMsg {
  amount: Uint128;
  msg: Binary;
  sender: string;
}
export interface InstantiateMsg {
  red_bank: Addr;
}
export type QueryMsg = {
  user_deposit: {};
} | {
  total_deposit: {};
} | {
  config: {};
} | {
  state: {};
};
export interface ConfigResponse {
  owner: Addr;
  red_bank: Addr;
  yield_bearing_token: Addr;
}
export type Decimal = string;
export interface StateResponse {
  exchange_rate: Decimal;
  osmo_deposited: Uint128;
}
export interface TotalDepositResponse {
  osmo_amount: Uint128;
}
export interface UserDepositResponse {
  osmo_amount: Uint128;
}
export interface MarsAdapterReadOnlyInterface {
  userDeposit: () => Promise<any>;
  totalDeposit: () => Promise<any>;
  config: () => Promise<any>;
  state: () => Promise<any>;
}
export class MarsAdapterQueryContract extends Contract implements MarsAdapterReadOnlyInterface {
  constructor(client: CosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.userDeposit = this.userDeposit.bind(this);
    this.totalDeposit = this.totalDeposit.bind(this);
    this.config = this.config.bind(this);
    this.state = this.state.bind(this);
  }

  userDeposit = async (): Promise<any> => {
    return this.queryMsg({
      user_deposit: {}
    });
  };
  totalDeposit = async (): Promise<any> => {
    return this.queryMsg({
      total_deposit: {}
    });
  };
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
}
export interface MarsAdapterInterface extends MarsAdapterReadOnlyInterface {
  deposit: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  updateYieldBearingToken: ({
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
    yieldBearingToken
  }: {
    yieldBearingToken: Addr;
  }) => Promise<any>;
  receive: ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
}
export class MarsAdapterContract extends MarsAdapterQueryContract implements MarsAdapterInterface {
  constructor(client: SigningCosmWasmClient, contractAddress: string, contractHash?: string) {
    super(client, contractAddress, contractHash);
    this.deposit = this.deposit.bind(this);
    this.updateYieldBearingToken = this.updateYieldBearingToken.bind(this);
    this.receive = this.receive.bind(this);
  }

  deposit = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      deposit: {}
    }, userAddress, customFees, memo, transferAmount);
  };
  updateYieldBearingToken = async ({
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
    yieldBearingToken
  }: {
    yieldBearingToken: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      update_yield_bearing_token: {
        yield_bearing_token: yieldBearingToken
      }
    }, userAddress, customFees, memo, transferAmount);
  };
  receive = async ({
    userAddress,
    customFees,
    memo,
    transferAmount
  }: {
    userAddress: string;
    customFees?: TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      receive: {}
    }, userAddress, customFees, memo, transferAmount);
  };
}