import {useEffect, useRef, useState} from "react";
import Navbar from "../../components/Navbar";
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from "./CustomerDashboard";
import UserProfile from "./UserProfile";
import CreateFood from "./Addnewfoodform";
import Cuisinestable from "./Cuisine";
import Userstable from "../LoginRegister/User";
import UserServices from "../../services/UserServices";
import { useNavigate } from "react-router-dom";

export default function UserTemplate(){
    const childRef=useRef()
    const [currentPage,setCurrentPage]=useState(sessionStorage.getItem("page"));
    const navigate=useNavigate()
    const user=useState(UserServices.getUserFromToken())[0]
    if (user==null) {
        navigate("/")
    }
    const switchPage=()=>{
        setCurrentPage(sessionStorage.getItem("page"))
    }
    const profilePictureUpload=()=>{
        childRef.current.reloadImage()
    }
    const checkUserRoleForDashboard=()=>{
        switch (user.role) {
            case 'Admin':
                return(<AdminDashboard/>)
            
            case 'Customer':
                return(<CustomerDashboard/>)
            default:
                break;
        }
    }
    const [pageObject,setPageObject]=useState(checkUserRoleForDashboard())
    useEffect(()=>{
        switch (currentPage) {
            case 'Dashboard':
                setPageObject(checkUserRoleForDashboard());
                break;
           
      
            case 'Users':
                setPageObject(<Userstable/>)
                break;
            case 'Profile':
                setPageObject(<UserProfile profilePictureUpload={profilePictureUpload}/>)
                break;
            case 'Cuisines':
                setPageObject(<Cuisinestable/>)
                break;
            case 'Add New Food':
                setPageObject(<CreateFood/>)
                break;
            default:
                setPageObject(<Cuisinestable/>)
                break;
        }
    },[currentPage])    
    return(
        <>
            <Navbar switchPage={switchPage}/>
            <main className="d-flex justify-content-center mt-5">
                {pageObject}
            </main>
        </>
    )
}