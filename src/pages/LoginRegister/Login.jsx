import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import InputPassword from '../../components/InputPassword';

import UserServices from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';


function Login(props) {
  // State for username and password
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    username:'',
    password:''
  })
  // Event handlers for input changes
  const updateFormData=event=>{
    setFormData({...formData,[event.target.name]:event.target.value});
  }

  // Function to handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    
    console.log(formData);

    UserServices.Login(formData)
  .then((response) => {
    // console.log(response.role);

    if (response) {
      const data = response;
      sessionStorage.setItem('user', JSON.stringify(data));
      console.log(data.role);

      switch (data.role) {
        case 'Customer':
          navigate('/customer')
          window.location.href = '/customer';
          break;

        case 'Admin':
          navigate('/user')
          window.location.href = '/user';
          break;

        // case 'CUSTOMER':
        //   window.location.href = '/customer';
        //   break;

        default:
          break;
      }
    } else {
      console.error('Unexpected response format:', response);
    }
  })
  .catch((error) => {
    console.log(error)

    const errorMessages = error.response.data.properties.errors;
    errorMessages.forEach((errorMessage) => {
      // Assuming ToastServices.Error and convertErrorMessage are defined
      ToastServices.Error(convertErrorMessage(errorMessage.error));
    });
  });
  };
  return (
            <form onSubmit={e=>handleSubmit(e)} method="post">

              <MDBInput wrapperClass='mb-4 mx-5 w-100' required name='username'onChange={e=>updateFormData(e)} label='Username' id='loginUsername' type='text' size="lg"/>
      <InputPassword name='password' id="loginPassword" label="Password" getValue={updateFormData}/>

              <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' type='submit'>
                Login
              </MDBBtn>
              <p className="small mb-1 pb-lg-3 ms-5 ps-5 d-flex justify-content-center"><u className="link" onClick={props.forgotPassword}>Forget password?</u></p>
            <p className='ms-5'>
              Don't have an account? <u onClick={props.changeToRegister} className="link-info">Register here</u>
            </p>
            </form>
  );
}

// exports
export default Login;
