import { MDBFile } from "mdb-react-ui-kit";
import defaultProfilePicture from "../assets/profile_picture.png";
import { useEffect, useState } from "react";

export default function InputFile(props){

    const [profilePicture,setProfilePicture]=useState(defaultProfilePicture)

    useEffect(()=>{
        if (props.imageUrl) {
            setProfilePicture(props.imageUrl)
        }
    },[props.imageUrl])
    const changeImage=(e)=>{
        setProfilePicture(URL.createObjectURL(e.target.files[0]))
        props.getValue(e)
    }
    return(
        <div className="mb-3 mx-5 d-flex flex-column w-100">
            <img className="mb-2 align-self-center mx-5 img-fluid rounded-circle w-50" src={profilePicture}/>
            <MDBFile name="profilePicture" onChange={e=>changeImage(e)}/>
        </div>
    )
}