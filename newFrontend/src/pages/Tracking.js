import React, { useState } from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import axios from 'axios';

const Tracking = () => {
    const [tracking, setTracking] = useState('')
    const [order, setOrder] = useState([]);
    const [address, setAddress] = useState('')
    const [err, setErr] = useState(false)
    const handleClick = async () =>{
        try {
            const response = await axios.get(`https://localhost:44343/api/Orders/${tracking}`,   
            );
            setOrder(response.data);
            console.log(response.data);
            setAddress(response.data.customer.address)
          } catch (error) {
            console.error(error);
            setErr(true)
          }
    }
  return (
    <div>
        <div className='inputbox'>
        <CDBContainer style={{ display: 'flex', marginTop:'15', justifyContent: 'center', margin: '40px auto' }}>
        <CDBCard style={{ width: '30rem' }}>
            <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
                <p className="h4"> Track an order </p>
            </div>
            <CDBInput material hint="Email" type="email" value={tracking} onChange={(e) => setTracking(e.target.value)}/>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <CDBBtn color="primary" circle className="btn-block my-3 mx-0" onClick={handleClick}>
                Track
                </CDBBtn>
            </div>
            </CDBCardBody>
        </CDBCard>
        </CDBContainer>
        </div>
        {err ?
         (
            <div className='order-info' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', margin: '40px auto' }}>
                <p style={{color : 'red'}}>Error: Order doesn't exist</p>
            </div>    
            ) :
         (
            <div className='order-info' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', margin: '40px auto' }}>
            <p>Order number: {order.id}</p>
            <p>Order status: {order.orderStatus}</p>
            <p>Address: {address}</p> 
          </div>
         )
        }

    

    </div>
  );
};
export default Tracking;