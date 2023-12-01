import loginBanner from '../../images/loginBanner.jpg'
import { MDBCol } from 'mdb-react-ui-kit';

function Banner() {
    return(
        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src={loginBanner}
            alt="Login Banner" className="w-100 position-relative" style={{objectFit: 'cover', objectPosition: 'left', height:'150%', top:'-10%',left:"37%"}} />
        </MDBCol>
    ) 
}
export default Banner;