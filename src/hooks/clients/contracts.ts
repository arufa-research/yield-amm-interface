
import {
  StakingContractContract as JunoStakingContractContract,
  StakingContractQueryContract as JunoStakingContractQueryContract
} from "./juno/StakingContract";
import {
  RewardContractContract as JunoRewardContractContract,
  RewardContractQueryContract as JunoRewardContractQueryContract
} from "./juno/RewardContract";
import {
  Cw20TokenContract as JunoCw20TokenContract,
  Cw20TokenQueryContract as JunoCw20TokenQueryContract
} from "./juno/Cw20Token";

import {
  StakingContractContract as InjectiveStakingContractContract,
  StakingContractQueryContract as InjectiveStakingContractQueryContract
} from "./injective/StakingContract";
import {
  RewardContractContract as InjectiveRewardContractContract,
  RewardContractQueryContract as InjectiveRewardContractQueryContract
} from "./injective/RewardContract";
import {
  Cw20TokenContract as InjectiveCw20TokenContract,
  Cw20TokenQueryContract as InjectiveCw20TokenQueryContract
} from "./injective/Cw20Token";

import {
  StakingContractContract as ArchwayStakingContractContract,
  StakingContractQueryContract as ArchwayStakingContractQueryContract
} from "./archway/StakingContract";
import {
  RewardContractContract as ArchwayRewardContractContract,
  RewardContractQueryContract as ArchwayRewardContractQueryContract
} from "./archway/RewardContract";
import {
  Cw20TokenContract as ArchwayCw20TokenContract,
  Cw20TokenQueryContract as ArchwayCw20TokenQueryContract
} from "./archway/Cw20Token";

export const StakingContractQueryContract: Record<string, any> = {
  'JunoMainnet': JunoStakingContractQueryContract,
  'JunoTestnet': JunoStakingContractQueryContract,
  'InjectiveTestnet': InjectiveStakingContractQueryContract,
  'InjectiveMainnet': InjectiveStakingContractQueryContract,
  'ArchwayTestnet': ArchwayStakingContractQueryContract,
  'ArchwayMainnet': ArchwayStakingContractQueryContract,
};

export const StakingContractContract: Record<string, any> = {
  'JunoMainnet': JunoStakingContractContract,
  'JunoTestnet': JunoStakingContractContract,
  'InjectiveTestnet': InjectiveStakingContractContract,
  'InjectiveMainnet': InjectiveStakingContractContract,
  'ArchwayTestnet': ArchwayStakingContractContract,
  'ArchwayMainnet': ArchwayStakingContractContract,
};

export const RewardContractQueryContract: Record<string, any> = {
  'JunoMainnet': JunoRewardContractQueryContract,
  'JunoTestnet': JunoRewardContractQueryContract,
  'InjectiveTestnet': InjectiveRewardContractQueryContract,
  'InjectiveMainnet': InjectiveRewardContractQueryContract,
  'ArchwayTestnet': ArchwayRewardContractQueryContract,
  'ArchwayMainnet': ArchwayRewardContractQueryContract,
};

export const RewardContractContract: Record<string, any> = {
  'JunoMainnet': JunoRewardContractContract,
  'JunoTestnet': JunoRewardContractContract,
  'InjectiveTestnet': InjectiveRewardContractContract,
  'InjectiveMainnet': InjectiveRewardContractContract,
  'ArchwayTestnet': ArchwayRewardContractContract,
  'ArchwayMainnet': ArchwayRewardContractContract,
};

export const Cw20TokenQueryContract: Record<string, any> = {
  'JunoMainnet': JunoCw20TokenQueryContract,
  'JunoTestnet': JunoCw20TokenQueryContract,
  'InjectiveTestnet': InjectiveCw20TokenQueryContract,
  'InjectiveMainnet': InjectiveCw20TokenQueryContract,
  'ArchwayTestnet': ArchwayCw20TokenQueryContract,
  'ArchwayMainnet': ArchwayCw20TokenQueryContract,
};

export const Cw20TokenContract: Record<string, any> = {
  'JunoMainnet': JunoCw20TokenContract,
  'JunoTestnet': JunoCw20TokenContract,
  'InjectiveTestnet': InjectiveCw20TokenContract,
  'InjectiveMainnet': InjectiveCw20TokenContract,
  'ArchwayTestnet': ArchwayCw20TokenContract,
  'ArchwayMainnet': ArchwayCw20TokenContract,
};
