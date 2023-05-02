import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import WithdrawModal from "../../../stake/WithdrawModal";
import Modal from "react-modal";
import WithdrawwModal from "../../../stake/WithdrawModal";

const UnstakingBtn = ({sortOrder, handlesort, sortKey, orderby} : any)  => {
    const [WithdrawModal, setWithdrawModal] = useState(false);

    const handleClick = () =>{
        setWithdrawModal(!WithdrawModal);
    }
  
  return (
    <div >
        <button onClick={handleClick} className="common-button">
        Withdraw
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
        <WithdrawwModal setIsModalOpen={setWithdrawModal} />
      </Modal>
    </div>
  );
};

export default UnstakingBtn;
