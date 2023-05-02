import React, {useState, useEffect} from "react";
import ClaimRewardModal from "../../../stake/ClaimRewardModal";
import Modal from "react-modal";

const RewardBtn = ({sortOrder, handlesort, sortKey, orderby} : any)  => {
    const [WithdrawModal, setWithdrawModal] = useState(false);

    const handleClick = () =>{
        setWithdrawModal(!WithdrawModal);
    }
  
  return (
    <div >
        <button onClick={handleClick} className="common-button">
        Claim
        </button>

        <Modal
        isOpen={WithdrawModal}
        onRequestClose={() => setWithdrawModal(false)}
        contentLabel="Select Coin"
        className="custom-modal"
      >
        <div className="modal-close-button">
          <span
            onClick={() => setWithdrawModal(false)}
            className="material-symbols-outlined modal-close-button"
          >
            close
          </span>
        </div>
        <ClaimRewardModal setIsModalOpen={setWithdrawModal} />
      </Modal>
    </div>
  );
};

export default RewardBtn;
