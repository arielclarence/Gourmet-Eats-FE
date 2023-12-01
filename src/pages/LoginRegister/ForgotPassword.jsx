import { MDBInput,MDBBtn } from "mdb-react-ui-kit";
import { FaEnvelope } from "react-icons/fa";
import './loginregister.css';

function forgotPassword(props) {
    return (
      <>
        <p className="fw-normal mb-2 ps-5 pb-3" style={{letterSpacing: '1px'}}>Don't worry, just type your username here and the link for you to reset your password will be sent to your registered email</p>

    
        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='forgotPasswordUsername' type='text' size="lg"/>
    
        <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' type='submit'><FaEnvelope size={'28px'}/></MDBBtn>
    
        <p className='ms-5 align-self-center ps-5'>Remember the password? <u onClick={props.backToLogin} className="link-info">Back to login</u></p>
    
      </>
      );    
}
export default forgotPassword;