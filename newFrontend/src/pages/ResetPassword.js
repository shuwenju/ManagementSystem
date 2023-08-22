import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [err, setErr] = useState(false)
    const [status, setStatus] = useState([])
    const navigate = useNavigate();
    const handleClick = async () =>{
        try {
            const response = await axios.post(`https://localhost:44343/api/Authentication/reset-password`,
            {
                password,
                confirmPassword,
                email,
                token
                
            }
            );
            console.log(response.data);
            setStatus(response.data)

            setTimeout(() => {
                navigate('/'); 
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
                <p className="h4"> Please reset your password </p>
            </div>
            <CDBInput material hint="Password" type="text" placeholder="New Password" value={email} onChange={(e) => setPassword(e.target.value)}/>
            <CDBInput material hint="ConfirmPassword" type="text" placeholder="Confirm Password" value={email} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <CDBInput material hint="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <CDBInput material hint="TempPassword" type="text" placeholder="Temporary Password" value={email} onChange={(e) => setToken(e.target.value)}/>
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
            <div className='reset-status' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', margin: '40px auto' }}>
                <p>{email}, your password was successfully changed.</p>
                <p>Please wait, we are redirecting you to log in page, if your browser doesn't respond, please click the link below</p>
                <Link to='/'>Log in</Link>
            </div>
        ):
        (
            <div className='reset-fail' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', margin: '40px auto' }}>
                <p style={{color : 'red'}}>Error: Please try later.</p>
            </div>  
        )
        }
           
    </div>
  );
}

export default ResetPassword