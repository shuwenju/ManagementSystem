import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [err, setErr] = useState(false)
    const [status, setStatus] = useState([])
    const navigate = useNavigate();
    const handleClick = async () =>{
        try {
            const response = await axios.post(`https://localhost:44343/api/Authentication/forgot-password`,null,
            {
                params:{email}
                
            }
            );
            console.log(response.data);
            setStatus(response.data)

            setTimeout(() => {
                navigate('/resetPassword'); // navigate is the function returned by useNavigate
            }, 3000);
          } catch (error) {
            console.error(error);
            setErr(true)
            setStatus(error)
          }
    }
  return (
    <div>
        <div className='inputbox'>
        <CDBContainer style={{ display: 'flex', marginTop:'15', justifyContent: 'center', margin: '40px auto' }}>
        <CDBCard style={{ width: '30rem' }}>
            <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
                <p className="h4"> Please enter your E-mail </p>
            </div>
            <CDBInput material hint="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <CDBBtn color="primary" circle className="btn-block my-3 mx-0" onClick={handleClick}>
                Submit
                </CDBBtn>
            </div>
            </CDBCardBody>
        </CDBCard>
        </CDBContainer>
        </div>
        {status.length <1 ?
        (<div></div>):
        err == false ?
        (
            <div className='email-status' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', margin: '40px auto' }}>
                <p>Email successfully sent to {email}.</p>
                <p>Please wait, we are redirecting you to reset your password, if your browser doesn't respond, please click the link below</p>
                <Link to='/resetPassword'>Reset Password</Link>
            </div>
        ):
        (
            <div className='order-info' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', margin: '40px auto' }}>
                <p style={{color : 'red'}}>Error: Please recheck email entered</p>
            </div>  
        )
        }
           
    </div>
  );
}

export default ForgotPassword