import { useSetRecoilState } from "recoil";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { queryClientState } from "../context/queryClientState";
import { useChainInfo } from "./useChainInfo";

export const useQueryClient = () => {
  const setQueryClientState = useSetRecoilState(queryClientState);
  const chainInfo = useChainInfo();

  return async () => {
    const queryClient = await CosmWasmClient.connect(
      chainInfo.getRpcUrl(),
    );

    /* successfully update the query client state */
    setQueryClientState({
      queryClient: queryClient,
    });
  };
};
