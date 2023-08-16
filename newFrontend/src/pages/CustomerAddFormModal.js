import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";
import { CDBBtn } from "cdbreact";
import "../css/ProductAddForm.css";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";

const CustomerAddFormModal = (props) => {
  const [status, setStatus] = useState("empty");
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setStatus("typing");
      setErrMsg("");
    }
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        "https://localhost:44343/api/Customers/addCustomer",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
            }
        }
      );
      <SuccessAlert message={response.data.name} />;
      props.getItems();
    } catch (error) {
      setErrMsg(error.response?.data || "An error occurred");
      console.log(error)
    } finally {
      setStatus("empty");
    }
    props.setHandleAddFormToggle(false);
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicQuantity">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
            />
          </Form.Group>
          <p className={errMsg ? "formError" : null}>{errMsg}</p>
          <CDBBtn type="submit" variant="primary" role="button">
            Submit
          </CDBBtn>
        </Form>
      </Modal.Body>
      {status === "loading" && <Spinner />}
    </Modal>
  );
};

export default CustomerAddFormModal;
