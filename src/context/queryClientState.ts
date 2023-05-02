import { atom } from "recoil";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const queryClientState = atom<{
  queryClient: CosmWasmClient | undefined;
}>({
  key: "queryClientState",
  default: {
    queryClient: undefined,
  },
  dangerouslyAllowMutability: true,
});
