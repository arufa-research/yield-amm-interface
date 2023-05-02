import { useContext, useEffect, useState } from "react";
import { networkConstants } from "../../utils/constants";
import { useStake } from "../../hooks/useStake";
import InfoBubble from "../../components/common/information/InfoBubble";
import LoadingSpinner from "../../components/common/loadingSpinner/loadingSpinner";

import "./stake.css";
import { useRecoilValue } from "recoil";
import { queryClientState } from "../../context/queryClientState";
import { networkState } from "../../context/networkState";

export function Stats() {
  // const {info, apy, isLoading} = useContext(UserContext);
  const { queryClient } = useRecoilValue(queryClientState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getTVL, getAPY } = useStake();
  const [TVL, setTVL] = useState<string | undefined>("");
  const [APR, setAPR] = useState<string | undefined>("");

  const { network } = useRecoilValue(networkState);
  useEffect(() => {
    (async () => {
      setTVL(await getTVL());
      setAPR(await getAPY());
      setIsLoading(false);
    })();
  }, [queryClient]);

  // console.log(APR);
  // console.log(TVL);
  return (
    <div className="info-wrapper stats-wrapper card">
      <div className="stats-child">
        <h2 className="info-heading banner-heading">TVL:</h2>
        <h2 className="info-heading banner-value">
          {isLoading ? (
            <div style={{ position: "relative" }}>
              <LoadingSpinner style={{ right: "-30px", color: "white" }} />
            </div>
          ) : (
            <div className="info-tvl-value-wrapper">
              <span>{Number(TVL).toFixed(3)}</span> <span>{networkConstants[network].baseDenom}</span>
            </div>
          )}
        </h2>
      </div>

      <div className="stats-child">
        <h2 className="info-heading banner-heading">APY:</h2>
        <h2 className="info-heading banner-value">
          {isLoading ? (
            <div style={{ position: "relative" }}>
              <LoadingSpinner style={{ right: "-40px", color: "white" }} />
            </div>
          ) : (
            <div className="info-apy-value-wrapper">
              {Number(APR).toFixed(2)}
            </div>
          )}
        </h2>
        {!isLoading && (
          <InfoBubble
            style={{
              top: "-10px",
              left: "5px",
            }}
            content={`Staking annual yield in ${networkConstants[network].baseDenom}`}
          />
        )}
      </div>
    </div>
  );
}
