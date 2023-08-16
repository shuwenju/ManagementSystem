import React from "react";
import CustomerAdd from "./CustomerAdd";

const CustomerTop = ({ isAdmin, onHandleAddBtnClick/*, setInput*/ }) => {
  return (
    <>
      <div className="d-flex row row-cols-2 align-items-center px-5">
        {isAdmin && (
          <div className="col">
            <CustomerAdd onHandleAddBtnClick={onHandleAddBtnClick} />
          </div>
        )}
        {/* <div className="col">
          <ProductSearch setInput={setInput} />
        </div> */}
      </div>
    </>
  );
};

export default CustomerTop;
