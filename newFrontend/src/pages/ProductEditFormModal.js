import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";
import { CDBBtn } from "cdbreact";
import "../css/ProductAddForm.css";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";

const ProductEditFormModal = (props) => {
  const [loadingStatus, setLoadingStatus] = useState("empty");
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

  const ERROR_MESSAGES = {
    INVALID_NAME: "Item name can only contain letters.",
    INVALID_PRICE: "Price should be a valid price.",
    INVALID_QUANTITY: "Quantity should be between 0 and 999.",
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "Name":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          errorMessage = ERROR_MESSAGES.INVALID_NAME;
        }
        break;
      case "Price":
        if (!/^\d+(\.\d*)?$/.test(value)) {
          errorMessage = ERROR_MESSAGES.INVALID_PRICE;
        }
        break;
      case "QuantityInStock":
        if (value < 0 || value > 999) {
          errorMessage = ERROR_MESSAGES.INVALID_QUANTITY;
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
    setLoadingStatus("loading");
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.put(
        `https://localhost:44343/api/Items/${props.productData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("getting items");
      props.getItems();
      console.log("Got items");
      <SuccessAlert message={response.data.Name} />;
    } catch (error) {
      setErrMsg(error.response?.data || "An error occurred");
    } finally {
      setLoadingStatus("empty");
    }
    props.onHide();
  };

  return (
    <div className="container">
      <Modal {...props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit '{props.productData.name}'
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <div className="col col-8">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  isInvalid={errors.Name !== ""}
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  placeholder={props.productData.name}
                  required
                />
                <p className="formError">{errors.Name}</p>
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                  isInvalid={errors.Description !== ""}
                  as="textarea"
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  placeholder={props.productData.description}
                  required
                />
                <p className="formError">{errors.Description}</p>
              </Form.Group>
            </div>
            <div className="row col-8">
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Item Price</Form.Label>
                <Form.Control
                  isInvalid={errors.Price !== ""}
                  type="text"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  placeholder={props.productData.price}
                  required
                />
                <p className="formError">{errors.Price}</p>
              </Form.Group>
            </div>
            <div className="row col-8">
              <Form.Group className="mb-3" controlId="formBasicQuantity">
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control
                  isInvalid={errors.QuantityInStock !== ""}
                  type="number"
                  value={formData.QuantityInStock}
                  name="QuantityInStock"
                  onChange={handleInputChange}
                  placeholder={props.productData.quantityInStock}
                  required
                />
                <p className="formError">{errors.QuantityInStock}</p>
              </Form.Group>
            </div>
            <div className="row col-3 m-auto">
              <p className={errMsg ? "formError" : null}>{errMsg}</p>
              <CDBBtn type="submit" variant="primary" role="button">
                Edit
              </CDBBtn>
            </div>
          </Form>
        </Modal.Body>
        {loadingStatus === "loading" && <Spinner />}
      </Modal>
    </div>
  );
};

export default ProductEditFormModal;
