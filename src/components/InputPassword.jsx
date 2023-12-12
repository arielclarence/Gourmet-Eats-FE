import {useState} from "react";
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { MDBInputGroup,MDBInput } from "mdb-react-ui-kit";
function InputPassword(props){  
    const [showPassword,setShowPassword]=useState(false);
    return(
        <MDBInputGroup onFocus={props.toggleRequirements} style={{width:"133%"}}className='mb-4 mx-5 position-relative' noBorder textAfter={<span className="position-absolute" style={{left:"69%",top:'20%',cursor:"pointer"}} onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaEye/>:<FaEyeSlash/>}</span>}>

            <MDBInput wrapperClass='w-75' required name={props.name} onChange={e=>props.getValue(e)} label={props.label} id={props.id} type={showPassword?"text":"password"} size="lg"/> 
            
        </MDBInputGroup>
    )
}

export default InputPassword;