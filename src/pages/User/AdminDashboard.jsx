import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
// import { Doughnut } from "react-chartjs-2";
// import PropertyServices from "../../services/PropertyServices";
import { useEffect, useState } from "react";
// import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import UserServices from "../../services/UserServices";


export default function AdminDashboard(){
    // Chart.register(ArcElement, Tooltip, Legend);

    const user=UserServices.getUserFromToken();
    const [rentedRatio,setRentedRatio]=useState({rented:0,notRented:0})

    useEffect(()=>{
        // PropertyServices.getRentedNotRentedRatio()
        // .then(data=>setRentedRatio(data))
    },[])
    let doughnutRentedRatio;
    if (rentedRatio.rented<1&&rentedRatio.notRented<1) {
        doughnutRentedRatio=<h1>You have no property!</h1>   
    }else{
        const data={
            labels:['Rented','Not Rented'],
            datasets:[
                {
                    label:"Rented Property Ratio",
                    data:[rentedRatio.rented,rentedRatio.notRented],
                    backgroundColor:['green','red']
                }
            ],
            borderWidth:1
        }
        // doughnutRentedRatio=<Doughnut data={data}/>
    }
    return(
        <>
            <MDBContainer fluid className="px-5 py-5">
                <MDBRow>
                    <MDBCol size='9' lg='5' className="bg-info square rounded bg-opacity-25 p-3 mx-1 align-item-center" >
                        <h5>Rented Property Ratio</h5>
                        {doughnutRentedRatio}
                    </MDBCol>
                    
                </MDBRow>
            </MDBContainer>
        </>
    )
}