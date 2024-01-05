import { useEffect, useState } from "react"
import UserServices from "../../services/UserServices"
import { MDBCol, MDBContainer } from "mdb-react-ui-kit"
import { FaEnvelope, FaPhone } from "react-icons/fa"


export default function UserDetails(props){
    const [user,setUser]=useState({
        id:0,
        role:"",
        name:"",
        phoneNumber:"",
        username:"",
        email:"",
        image:"",
        address:'',
        role:'',
        gender:'',
        birthdate:''
    })

    useEffect(()=>{
        if (props.userId) {
            UserServices.getUser(props.userId)
            .then(userData=>setUser(userData))
        }
    },[props])

    if (user.id<1) {
        return(<></>)
    }
    return(
        <MDBContainer fluid className="flex-column">
            <MDBCol className="d-flex justify-content-center">
                <img className="mb-2 align-self-center mx-5 img-fluid rounded-circle w-50" src={user.profilePictureUrl}></img>
            </MDBCol>
            <MDBCol className="flex-column">
                <h5 className="h4 d-flex justify-content-center mb-3">@{user.username}</h5>
                <h3 className="d-flex justify-content-center mb-2 ">{user.name}</h3>
                <h5 className="d-flex justify-content-center me-3"><FaEnvelope className="me-3"/>{user.email}</h5>
                <h5 className="d-flex justify-content-center me-3"><FaPhone className="me-3"/>{user.phoneNumber}</h5>

            </MDBCol>
        </MDBContainer>
    )
}