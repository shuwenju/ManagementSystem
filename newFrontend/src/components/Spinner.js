import React from "react";
import { CDBSpinner, CDBContainer, CDBCard } from "cdbreact";
import "../css/Spinner.css";

export const Spinner = () => {
  return (
    <CDBContainer className="spinnerContainer">
      <CDBCard className="spinnerCard">
        <CDBSpinner multicolor />
        <h5>Loading...</h5>
      </CDBCard>
    </CDBContainer>
  );
};

export default Spinner;
