import { useRecoilValue } from "recoil";
import PulseLoader from "react-spinners/PulseLoader";

import { networkConstants } from "../../utils/constants";
import { networkState } from "../../context/networkState";

import "./StatsComponent.css";

function ContractInfoItems(props: any) {
  const baseURL = "https://www.mintscan.io/juno/account/";
  const totalStaked = props.contractInfo.total_staked;
  const underWithdraw = props.contractInfo.under_withdraw;
  const admin = props.contractInfo.admin;
  const se_token = props.contractInfo.se_token;
  const b_token = props.contractInfo.b_token;
  const staking_contract = props.contractInfo.staking_contract;
  const rewards_contract = props.contractInfo.rewards_contract;

  const { network } = useRecoilValue(networkState);
  const denomConst = networkConstants[network].denomConst;

  function shortenAddress(address: string) {
    return address.substr(0, 8) + "..." + address.substr(address.length - 3, 3);
  }

  return (
    <>
      <div className="info-card-content">
        <div>Total {denomConst.tokenSymbol} staked</div>

        {admin ? (
          <div className="amount-with-unit">
            {" "}
            <span>{totalStaked}</span>
            <span> {denomConst.tokenSymbol}</span>
          </div>
        ) : (
          <PulseLoader
            color="#000000"
            loading={true}
            // cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
      <div className="info-card-content">
        <div>{denomConst.tokenSymbol} under withdraw</div>

        {admin ? (
          <div className="amount-with-unit">
            {" "}
            <span>{underWithdraw}</span>
            <span> {denomConst.tokenSymbol}</span>
          </div>
        ) : (
          <PulseLoader
            color="#000000"
            loading={true}
            // cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
      <div className="info-card-content">
        <div>Contract manager</div>
        <a href={`${baseURL}${admin}`} className="val-address-link">
          {admin ? (
            shortenAddress(admin)
          ) : (
            <PulseLoader
              color="#000000"
              loading={true}
              // cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </a>
      </div>
      <div className="info-card-content">
        <div>{denomConst.seTokenSymbol} token</div>
        <a href={`${baseURL}${se_token}`} className="val-address-link">
          {admin ? (
            shortenAddress(se_token)
          ) : (
            <PulseLoader
              color="#000000"
              loading={true}
              // cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </a>
      </div>
      <div className="info-card-content">
        <div>Staking contract</div>
        <a href={`${baseURL}${staking_contract}`} className="val-address-link">
          {admin ? (
            shortenAddress(staking_contract)
          ) : (
            <PulseLoader
              color="#000000"
              loading={true}
              // cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </a>
      </div>
      <div className="info-card-content">
        <div>{denomConst.bTokenSymbol} token</div>
        <a href={`${baseURL}${b_token}`} className="val-address-link">
          {admin ? (
            shortenAddress(b_token)
          ) : (
            <PulseLoader
              color="#000000"
              loading={true}
              // cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </a>
      </div>
      <div className="info-card-content">
        <div>Rewards contract</div>
        <a href={`${baseURL}${rewards_contract}`} className="val-address-link">
          {admin ? (
            shortenAddress(rewards_contract)
          ) : (
            <PulseLoader
              color="#000000"
              loading={true}
              // cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </a>
      </div>
    </>
  );
}

export default ContractInfoItems;
