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


function Login() {
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
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <Logo />

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-2 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

            <form onSubmit={handleSubmit} className="ml-5">
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
            </form>
            <p className="small mb-5 pb-lg-3 ms-5">
              <a className="text-muted" href="#!">Forgot password?</a>
            </p>
            <p className='ms-5'>
              Don't have an account? <a href="/register" className="link-info">Register here</a>
            </p>
          </div>
        </MDBCol>

        <Banner />
      </MDBRow>
    </MDBContainer>
  );
}

// exports
export default Login;
