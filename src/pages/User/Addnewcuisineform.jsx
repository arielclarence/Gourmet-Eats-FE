import { MDBInput, MDBTextArea, MDBValidation, MDBValidationItem, MDBBtn } from "mdb-react-ui-kit";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import CuisineServices from "../../services/CuisineServices";
import FoodServices from "../../services/FoodServices";
import UserServices from "../../services/UserServices";
import InputFile from "../../components/InputFile";
import FirebaseServices from "../../services/FirebaseServices";
import ToastServices from "../../services/ToastServices";
import Select from 'react-select';

const CreateCuisine = forwardRef(function CreateFood(props, ref) {
    const user=UserServices.getUserFromToken();
    const [formData, setFormData] = useState({
        name: "",
        pictureUrl: "",
        image: null,
    });



    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (
            formData.name.length < 1 ||
            formData.pictureUrl === null
        ) {
            ToastServices.Error("There is an empty field!");
        } else {
            try {
                const downloadUrl = await FirebaseServices.uploadImage(formData.image, "cuisine/" + formData.name+"cuisine");
                formData.pictureUrl = downloadUrl; // Set pictureUrl before calling createFood
                await CuisineServices.CreateCuisine(formData);
                ToastServices.Success("Successfully Add New Cuisine!");
            } catch (error) {
                const errorMessages = error.response.data.properties.errors;
                errorMessages.map(errorMessage => ToastServices.Error(convertErrorMessage(errorMessage.error)));
            }
        }
    };
    

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    const updateFormData = (event) => {
        setFormData({...formData,[event.target.name]:(event.target.name=='image')?event.target.files[0]:event.target.value})
    };
    return (
        <MDBValidation className="w-75">
          <MDBValidationItem>
          <InputFile name='image' getValue={updateFormData}/>
        </MDBValidationItem>
      
          <MDBValidationItem feedback="Invalid value" invalid>
            <MDBInput
              type="text"
              wrapperClass="mx-5"
              label="name"
              required
              name="name"
              onChange={(e) => updateFormData(e)}
            />
          </MDBValidationItem>
        
         
          {/* Submit Button */}
          <MDBBtn color="primary" onClick={handleSubmit}>
            Submit
          </MDBBtn>
        </MDBValidation>
      );
});

export default CreateCuisine;
