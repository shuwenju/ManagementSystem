import React from "react";
import { useState } from "react";
import { Table, Button, Form, FormGroup, Input, Label, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const OrderForm = () => {


    const [formData, setFormData] = useState({
        name: '',
        shippingAddress: '',
        orderItems: [
            {
                itemName: '',
                quantity: ''
            }
        ],
        orderDate: new Date()
    })


    // Stores data from the order item inputs and adds it to the form data
    function handleItemChange(event, index) {
        const { name, value } = event.target
        let data = [...formData.orderItems]
        data[index][name] = value
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: data
            }
        })
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        // for debugging purposes 
        // see what happens when the form is submitted
        // console.log(formData);
    }

    function addItemInput() {
        let newItemInput = { itemName: '', quantity: '' }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: [...prevFormData.orderItems, newItemInput]
            }
        })
    }

    function removeItemInput(index) {
        let data = [...formData.orderItems]
        data.splice(index, 1)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: data
            }
        })
    }

    const date = new Date()
    const dateFormat = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate()



    return (
        <div className="w-75 mx-auto overflow-auto ">
            <div className="d-flex align-items-baseline gap-3 justify-content-between mb-5">
                <h1>Add new Order</h1>
                <p>Date: {dateFormat}</p>
            </div>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4 me-3" row>
                    <Label for="name" sm={2} className="me-3">
                        Customer Name
                    </Label>
                    <Col sm={4}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="mb-5 me-3" row>
                    <Label for="shippingAddress" sm={2} className="me-3">Shipping Address</Label>
                    <Col sm={4}>
                        <Input
                            type="text"
                            name="shippingAddress"
                            id="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                {/* Displays the order items input depending on the number of items added */}
                {formData.orderItems.map((input, index) => {
                    return (
                        <Table bordered key={index} className="mt-3">
                            <thead>
                                <tr>
                                    <th>
                                        Item
                                    </th>
                                    <th>
                                        Qty
                                    </th>
                                    <th>
                                        Rate
                                    </th>
                                    <th>
                                        Amount
                                    </th>
                                    <th>
                                        {

                                            index == 0 ? <Button color="success" onClick={addItemInput}>Add Item</Button>
                                                : null
                                        }
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Input
                                            name="itemName"
                                            id="itemName"
                                            value={input.itemName}
                                            onChange={event => handleItemChange(event, index)}
                                            type='select'
                                            multiple={false}
                                        >
                                            <option>Item #1</option>
                                            <option>Item #2</option>
                                            <option>Item #3</option>
                                            <option>Item #4</option>
                                        </Input>

                                    </td>
                                    <td>
                                        <Input
                                            id="quantity"
                                            value={input.quantity}
                                            onChange={event => handleItemChange(event, index)}
                                            name="quantity"
                                            type="number" />
                                    </td>
                                    <td>
                                        <Input type="number" />
                                    </td>
                                    <td>
                                        <Input type="number" />
                                    </td>
                                    <td>
                                        {/* Will add the remove button on the next order items */}
                                        {index == 0 ? null : <Button color="danger" onClick={() => removeItemInput(index)}>Remove Item</Button>}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )
                })}
                <div className="d-flex justify-content-end">
                    <FormGroup >
                        <FormGroup className="mb-4 me-3" row>
                            <Label for="grossAmount" sm={2} className="me-3">
                                Gross Amount
                            </Label>
                            <Col sm={5}>
                                <Input
                                    type="number"
                                    name="grossAmount"
                                    id="grossAmount"
                                    readOnly
                                />
                            </Col>
                        </FormGroup >
                        <FormGroup className="mb-4 me-3" row>
                            <Label for="tax" sm={2} className="me-3">
                                GST/QST 14.975%
                            </Label>
                            <Col sm={5}>
                                <Input
                                    type="number"
                                    name="tax"
                                    id="tax"
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4 me-3" row>
                            <Label for="netAmount" sm={2} className="me-3">
                                Net Amount
                            </Label>
                            <Col sm={5}>
                                <Input
                                    type="number"
                                    name="netAmoun"
                                    id="netAmount"
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                    </FormGroup>
                </div>
                <div className="mt-5 d-flex gap-4">
                    <Button color="primary" onClick={handleSubmit}>Add Order</Button>
                    <Link to="/page1">
                        <Button color="secondary">Cancel</Button>
                    </Link>
                </div>
            </Form>
        </div>
    )
}

export default OrderForm