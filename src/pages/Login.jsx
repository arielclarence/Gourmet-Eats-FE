import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import InputPassword from '../components/InputPassword';
import Banner from './Banner';
import Logo from './Logo';

function Login() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <Logo/>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-2 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <form method='post' className="ml-5"> 
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='loginUsername' type='text' size="lg"/>
            <InputPassword id="loginPassword" label="Password"/>
            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
            </form>
            <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a href="/register" className="link-info">Register here</a></p>

          </div>

        </MDBCol>

        <Banner/>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;