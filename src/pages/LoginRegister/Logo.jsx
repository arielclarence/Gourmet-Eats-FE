import logo from "../../images/logo.jpg"  
  function Logo() {
    return (
            <div>
              <img src={logo} className="img-fluid w-75 me-5" alt="GourmetEats Logo"/>
            </div>
    );
  }
  
  export default Logo;