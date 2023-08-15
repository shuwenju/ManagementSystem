import React from "react";
import { CDBContainer, CDBAlert } from "cdbreact";

const SucessAlert = (props) => {
  return (
    <CDBContainer>
      <CDBAlert color="success">
        You've successfully added {props.message}!
      </CDBAlert>
    </CDBContainer>
  );
};

export default SucessAlert;
