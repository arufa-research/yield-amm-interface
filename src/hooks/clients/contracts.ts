
import {
  StakingContractContract as JunoStakingContractContract,
  StakingContractQueryContract as JunoStakingContractQueryContract
} from "./juno/StakingContract";
import {
  Cw20TokenContract as JunoCw20TokenContract,
  Cw20TokenQueryContract as JunoCw20TokenQueryContract
} from "./juno/Cw20Token";

// import {
//   StakingContractContract as InjectiveStakingContractContract,
//   StakingContractQueryContract as InjectiveStakingContractQueryContract
// } from "./injective/StakingContract";
// import {
//   RewardContractContract as InjectiveRewardContractContract,
//   RewardContractQueryContract as InjectiveRewardContractQueryContract
// } from "./injective/RewardContract";
// import {
//   Cw20TokenContract as InjectiveCw20TokenContract,
//   Cw20TokenQueryContract as InjectiveCw20TokenQueryContract
// } from "./injective/Cw20Token";

export const StakingContractQueryContract: Record<string, any> = {
  'JunoMainnet': JunoStakingContractQueryContract,
  'JunoTestnet': JunoStakingContractQueryContract,
  // 'OsmosisTestnet': OsmosisStakingContractQueryContract,
  // 'OsmosisMainnet': OsmosisStakingContractQueryContract,
};

export const StakingContractContract: Record<string, any> = {
  'JunoMainnet': JunoStakingContractContract,
  'JunoTestnet': JunoStakingContractContract,
  // 'OsmosisTestnet': OsmosisStakingContractContract,
  // 'OsmosisMainnet': OsmosisStakingContractContract,
};

export const Cw20TokenQueryContract: Record<string, any> = {
  'JunoMainnet': JunoCw20TokenQueryContract,
  'JunoTestnet': JunoCw20TokenQueryContract,
  // 'OsmosisTestnet': OsmosisCw20TokenQueryContract,
  // 'OsmosisMainnet': OsmosisCw20TokenQueryContract,
};

export const Cw20TokenContract: Record<string, any> = {
  'JunoMainnet': JunoCw20TokenContract,
  'JunoTestnet': JunoCw20TokenContract,
  // 'OsmosisTestnet': OsmosisCw20TokenContract,
  // 'OsmosisMainnet': OsmosisCw20TokenContract,
};
