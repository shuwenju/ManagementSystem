import React from "react";
import ProductAdd from "./ProductAdd";
import ProductSearch from "./ProductSearch";

const ProductTop = ({ isAdmin, onHandleAddBtnClick, setInput }) => {
  return (
    <>
      <div className="d-flex row row-cols-2 align-items-center px-5">
        {isAdmin && (
          <div className="col">
            <ProductAdd onHandleAddBtnClick={onHandleAddBtnClick} />
          </div>
        )}
        <div className="col">
          <ProductSearch setInput={setInput} />
        </div>
      </div>
    </>
  );
};

export default ProductTop;
