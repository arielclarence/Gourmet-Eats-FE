import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import InputPassword from '../../components/InputPassword';
import Banner from './Banner';
import Logo from './Logo';
import UserServices from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';


function Login(props) {
  // State for username and password
  const [usernameinput, setUsername] = useState('');
  const [passwordinput, setPassword] = useState('');
  const navigate = useNavigate();

  // Event handlers for input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  // Function to handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();



    const formData = {
      username: usernameinput,
      password: passwordinput
    };
    
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
          navigate('/cuisine')
          window.location.href = '/cuisine';
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
            <form onSubmit={handleSubmit} method="post" className="ml-5">
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                label='Username'
                id='loginUsername'
                type='text'
                size="lg"
                value={usernameinput}
                onChange={handleUsernameChange}
              />
              <InputPassword
                id="loginPassword"
                label="Password"
                value={passwordinput}
                onChange={handlePasswordChange}
              />

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
