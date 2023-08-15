
import React from "react";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';

export const Customers = () => {
	const[name, setName] = useState('')
	const[email, setEmail] = useState('')
	const[phonenumber, setPhonenumber] = useState('')
	const[address, setAddress] = useState('')

	const handleSubmit = async (e)=>{
		e.preventDefault()
		try{      
			// Retrieve the JWT token from local storage
			const token = localStorage.getItem('jwtToken'); // Replace 'yourTokenKey' with your actual token key
			
			const response = await axios.post(
				'https://localhost:44343/api/Customers/addCustomer',
				{
					name,
					email,
					address,
					phonenumber
				},
				{
					headers: {
						Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
					}
				}
		)} catch(error){
			console.log(error)
		}
    }

	return (
		<div className="wrapper">
			<div className="w-75 mx-auto overflow-auto ">
            <div className="d-flex align-items-baseline gap-3 justify-content-between mb-5">
                <h1>Add new Customer</h1>
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
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Col>
                </FormGroup>

				<FormGroup className="mb-5 me-3" row>
                    <Label for="email" sm={2} className="me-3">Email</Label>
                    <Col sm={4}>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Col>
                </FormGroup>

				<FormGroup className="mb-5 me-3" row>
                    <Label for="phonenumber" sm={2} className="me-3">Phone</Label>
                    <Col sm={4}>
                        <Input
                            type="text"
                            name="phonenumber"
                            id="phonenumber"
                            value={phonenumber}
                            onChange={(e)=>setPhonenumber(e.target.value)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup className="mb-5 me-3" row>
                    <Label for="address" sm={2} className="me-3">Address</Label>
                    <Col sm={4}>
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                        />
                    </Col>
                </FormGroup>
            
 
                <div className="mt-5 d-flex gap-4">
                    <Button color="primary" onClick={handleSubmit}>Add Customer</Button>
                    <Link to="/Dashboard">
                        <Button color="secondary">Cancel</Button>
                    </Link>
                </div>
            </Form>
        </div>
		</div>
	);
}


