import React from "react";
import {Form, Button, FormGroup, Label, Input} from "reactstrap"
import { useState } from "react";
import axios from 'axios';

const Page1 = () => {
  
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  
  const submitHandler = async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('https://localhost:44343/api/authentication/login', {
        username,
        password
      });
      

      const { token } = response.data;

      console.log('JWT Token:', token);
      // Handle the response, such as storing tokens or redirecting.
    } catch (error) {
      // Handle errors, e.g., show error message to the user.
    }
  }
  return (
    <div>
        
    {/* {isLoggedIn ? <AdminPanel /> : <UserPanel />} */}
    <h1>Log In</h1>
    <Form onSubmit={submitHandler}>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="text" name="username"  placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password"  placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </FormGroup>
      <Button type='submit' variant='primary'>Sign In</Button>
    </Form>
    </div>
  );
};

export default Page1;
