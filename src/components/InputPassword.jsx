import {useState} from "react";
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { MDBInputGroup,MDBInput,MDBBtn } from "mdb-react-ui-kit";
function InputPassword(props){  
    const [showPassword,setShowPassword]=useState(false);
    return(
        <MDBInputGroup style={{width:"133%"}}className='mb-4 mx-5 position-relative' noBorder noWrap textAfter={<MDBBtn floating color='info' wrapperclass='float-start' onClick={()=>setShowPassword(!showPassword)}>
                {showPassword?<FaEye/>:<FaEyeSlash/>}
            </MDBBtn>}>
            <MDBInput wrapperClass='w-75' label={props.label} id={props.id} type={showPassword?"text":"password"} size="lg"/> 
            </MDBInputGroup>
    )
}

export default InputPassword;