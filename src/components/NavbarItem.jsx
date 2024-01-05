import { MDBNavbarItem,MDBNavbarLink } from "mdb-react-ui-kit"

export default function Navbaritem(props){
    return(
        <>
            <MDBNavbarItem>
                <MDBNavbarLink href='#' onClick={()=>props.changePage(props.label)} active={props.active}>{props.label}</MDBNavbarLink>
            </MDBNavbarItem>
        </>
    )
}