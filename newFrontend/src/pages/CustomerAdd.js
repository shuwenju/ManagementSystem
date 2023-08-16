import React from "react";
import { CDBBtn } from "cdbreact";

const CustomerAdd = ({ onHandleAddBtnClick }) => {
  return (
    <>
      <CDBBtn
        color="primary"
        size="large"
        circle
        onClick={onHandleAddBtnClick}
        style={{ width: "14vw" }}
      >
        Add Customer
      </CDBBtn>
    </>
  );
};

export default CustomerAdd;
