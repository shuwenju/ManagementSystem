import React from "react";
import { CDBBtn } from "cdbreact";

const ProductAdd = ({ onHandleAddBtnClick }) => {
  return (
    <>
      <CDBBtn
        color="primary"
        size="large"
        circle
        onClick={onHandleAddBtnClick}
        style={{ width: "14vw" }}
      >
        Add Product
      </CDBBtn>
    </>
  );
};

export default ProductAdd;
