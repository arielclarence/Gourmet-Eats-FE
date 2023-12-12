import { useRef } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function Modal(props) {
  let modal=props.modal
  
  const toggleModal=()=>{
    props.toggleModal()
  }
  const Accept=()=>{
    props.toggleModal()
    props.accept()

  }
  return (
    <>
      <MDBModal show={modal} tabIndex='-1'>
        <MDBModalDialog size="lg" scrollable={props.scrollable}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{props.title}</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={toggleModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {props.body}
            </MDBModalBody>
            <MDBModalFooter>
              {(props.button1)?(<MDBBtn color='danger' onClick={toggleModal}>{props.button1}</MDBBtn>):(<></>)}
              {(props.button2)?(<MDBBtn onClick={Accept}>{props.button2}</MDBBtn>):(<></>)}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
export default Modal;