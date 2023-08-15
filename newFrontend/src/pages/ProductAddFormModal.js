import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";
import { CDBBtn } from "cdbreact";
import "../css/ProductAddForm.css";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";

const ProductAddFormModal = (props) => {
  const [status, setStatus] = useState("empty");
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Price: "",
    QuantityInStock: "",
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

  useEffect(() => {
    props.getItems();
  }, [() => handleSubmit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await axios.post(
        "https://localhost:7159/api/Items",
        formData
      );
      <SuccessAlert message={response.data.Name} />;
    } catch (error) {
      setErrMsg(error.response?.data || "An error occurred");
    } finally {
      setStatus("empty");
    }
    props.setHandleAddFormToggle(false);
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Item Description</Form.Label>
            <Form.Control
              as="textarea"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Item Price</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              value={formData.Price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicQuantity">
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control
              type="number"
              value={formData.QuantityInStock}
              name="QuantityInStock"
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

export default ProductAddFormModal;
