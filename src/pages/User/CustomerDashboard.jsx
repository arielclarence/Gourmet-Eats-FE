import { MDBBtn, MDBBtnGroup, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
// import OrderServices from "../../services/OrderServices";
// import OrderCard from "../../components/OrderCard";


export default function CustomerDashboard(){
    const [orders,setOrders]=useState([])
    const [pendingColor,setPendingColor]=useState("primary")
    const [rejectedColor,setRejectedColor]=useState("secondary")
    const [acceptedColor,setAcceptedColor]=useState("secondary")
    const [showedOrders,setShowedOrders]=useState([])




    
    return(
        <MDBContainer fluid className="mx-3">
            <h1>Your Orders</h1>
            <MDBBtnGroup className="my-5">
                <MDBBtn color={pendingColor} onClick={e=>changeTab(e.target.value)} value="CREATED">PENDING</MDBBtn>
                <MDBBtn color={rejectedColor} onClick={e=>changeTab(e.target.value)} value="REJECTED">REJECTED</MDBBtn>
                <MDBBtn color={acceptedColor} onClick={e=>changeTab(e.target.value)} value="ACCEPTED">ACCEPTED</MDBBtn>
                <MDBBtn color={acceptedColor} onClick={e=>changeTab(e.target.value)} value="ACCEPTED">PREPARED</MDBBtn>
                <MDBBtn color={acceptedColor} onClick={e=>changeTab(e.target.value)} value="ACCEPTED">DELIVERED</MDBBtn>
                <MDBBtn color={acceptedColor} onClick={e=>changeTab(e.target.value)} value="ACCEPTED">COMPLETED</MDBBtn>



            </MDBBtnGroup>
            <MDBRow className="mx-5">{showedOrders}</MDBRow>
        </MDBContainer>
    )
}