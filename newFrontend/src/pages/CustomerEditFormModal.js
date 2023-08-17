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

  const [errors, setErrors] = useState( {
    name: "",
    email: "",
    phoneNumber: "",
  });

  const ERROR_MESSAGES = {
    INVALID_NAME: "Name can only contain letters.",
    INVALID_EMAIL: "Please enter valid email format.",
    INVALID_PHONENUMBER: "Phone number should be all digits.",
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          errorMessage = ERROR_MESSAGES.INVALID_NAME;
        }
        break;

      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage = ERROR_MESSAGES.INVALID_EMAIL;
        }
        break;

      case "phoneNumber":
        if (!/^(?:\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)) {
          errorMessage = ERROR_MESSAGES.INVALID_PHONENUMBER;
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
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
            <p className="formError">{errors.name}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <p className="formError">{errors.email}</p>
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
            <p className="formError">{errors.phoneNumber}</p>
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
