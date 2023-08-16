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
  const [errors, setErrors] = useState({
    Name: "",
    Description: "",
    Price: "",
    QuantityInStock: "",
  });

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "Name":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          errorMessage = "Item name can only contain letters.";
        }
        break;

      case "Price":
        if (!/^\d+(\,\d+)?$/.test(value)) {
          errorMessage = "Price can only contain digits and at most one comma.";
        }
        break;

      case "QuantityInStock":
        if (value > 999) {
          errorMessage = "Quantity can't exceed 999.";
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
    setStatus("loading");
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        "https://localhost:44343/api/Items",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
          }
        }
      );
      <SuccessAlert message={response.data.Name} />;
      props.getItems();
    } catch (error) {
      setErrMsg(error.response?.data || "An error occurred");
    } finally {
      setStatus("empty");
    }
    props.setHandleAddFormToggle(false);
  };

  return (
    <div className="container">
      <Modal {...props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a new Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <div className="col col-8">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  required
                />
                <p className="formError">{errors.Name}</p>
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  required
                />
                <p className="formError">{errors.Description}</p>
              </Form.Group>
            </div>
            <div className="row col-8">
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Item Price</Form.Label>
                <Form.Control
                  type="text"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  required
                />
                <p className="formError">{errors.Price}</p>
              </Form.Group>
            </div>
            <div className="row col-8">
              <Form.Group className="mb-3" controlId="formBasicQuantity">
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.QuantityInStock}
                  name="QuantityInStock"
                  onChange={handleInputChange}
                  required
                />
                <p className="formError">{errors.QuantityInStock}</p>
              </Form.Group>
            </div>
            <div className="row col-3 m-auto">
              <p className={errMsg ? "formError" : null}>{errMsg}</p>
              <CDBBtn type="submit" variant="primary" role="button">
                Submit
              </CDBBtn>
            </div>
          </Form>
        </Modal.Body>
        {status === "loading" && <Spinner />}
      </Modal>
    </div>
  );
};

export default ProductAddFormModal;
