import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";
import Spinner from "../components/Spinner";

const CustomerEditFormModal = (props) => {
  const [formData, setFormData] = useState({ ...props.customerData });
  const [status, setStatus] = useState("empty");
  const [errMsg, setErrMsg] = useState("");

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

    try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.put(
            `https://localhost:44343/api/Customers/${props.customerData.id}`,
            formData,
            {
            headers: {
                Authorization: `Bearer ${token}`
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
    props.onHide();
  };

  return (
<Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Customer
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
            Save
          </CDBBtn>
        </Form>
      </Modal.Body>
      {status === "loading" && <Spinner />}
    </Modal>
  );
};

export default CustomerEditFormModal;
