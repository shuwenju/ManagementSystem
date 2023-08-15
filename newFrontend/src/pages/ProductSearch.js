import React from "react";
import { CDBContainer, CDBInput } from "cdbreact";
const ProductSearch = ({ setInput }) => {
  const onChangeSearch = (e) => {
    setInput(e.target.value);
  };
  return (
    <CDBContainer>
      <CDBInput
        className="d-flex justify-content-center"
        placeholder="Search"
        icon={<i className="fa fa-search text-dark"></i>}
        color="primary"
        onChange={(e) => onChangeSearch(e)}
        style={{ textAlign: "center", width: "35vw" }}
      />
    </CDBContainer>
  );
};

export default ProductSearch;
