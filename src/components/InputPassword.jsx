import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MDBInputGroup, MDBInput, MDBBtn } from "mdb-react-ui-kit";

function InputPassword(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    // Pass the updated value to the parent component
    props.onChange(e.target.value);
  };

  return (
    <MDBInputGroup
      style={{ width: "133%" }}
      className="mb-4 mx-5 position-relative"
      noBorder
      noWrap
      textAfter={
        <MDBBtn
          floating
          color="info"
          wrapperclass="float-start"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </MDBBtn>
      }
    >
      <MDBInput
        wrapperClass="w-75"
        label={props.label}
        id={props.id}
        type={showPassword ? "text" : "password"}
        size="lg"
        value={props.value}
        onChange={handleInputChange}
      />
    </MDBInputGroup>
  );
}

export default InputPassword;
