import { MDBInput, MDBTextArea, MDBValidation, MDBValidationItem, MDBBtn } from "mdb-react-ui-kit";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import CuisineServices from "../../services/CuisineServices";
import FoodServices from "../../services/FoodServices";
import UserServices from "../../services/UserServices";
import InputFile from "../../components/InputFile";
import FirebaseServices from "../../services/FirebaseServices";
import ToastServices from "../../services/ToastServices";
import Select from 'react-select';

const CreateFood = forwardRef(function CreateFood(props, ref) {
    const user=UserServices.getUserFromToken();
    const [formData, setFormData] = useState({
        sellerid: user.userid,
        description: "",
        name: "",
        pictureUrl: "",
        price: 0,
        image: null,
        cuisineid: null,
    });
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        const fetchCuisines = async () => {
            const response = await CuisineServices.getAllCuisine();
            setCuisines(response.cuisines);
        };

        fetchCuisines();
    }, []); // Include fetchCuisines in the dependency array

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (
            formData.name.length < 1 ||
            formData.description.length < 1 ||
            formData.price === null ||
            formData.cuisineid === null ||
            formData.pictureUrl === null
        ) {
            ToastServices.Error("There is an empty field!");
        } else {
            try {
                const downloadUrl = await FirebaseServices.uploadImage(formData.image, "user/" + formData.name);
                formData.pictureUrl = downloadUrl; // Set pictureUrl before calling createFood
                await FoodServices.createFood(formData);
                ToastServices.Success("Successfully registered! Check your email to activate your account!");
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
          <MDBValidationItem feedback="Invalid value" invalid>
            <MDBTextArea
              required
              wrapperClass="mx-5"
              step={0.01}
              label="description"
              name="description"
              onChange={(e) => updateFormData(e)}
            />
          </MDBValidationItem>
          <MDBValidationItem feedback="Invalid value" invalid>
            <label>Cuisine</label>
            <Select
              options={cuisines.map((cuisine) => ({
                value: cuisine.id,
                label: cuisine.cuisineName,
              }))}
              onChange={(selectedOption) =>
                updateFormData({
                  target: {
                    name: "cuisineid",
                    value: selectedOption.value,
                  },
                })
              }
              value={cuisines.find((cuisine) => cuisine.value === formData.cuisineid)}
            />
          </MDBValidationItem>
          <MDBValidationItem feedback="Invalid value" invalid>
            <MDBInput
              type="number"
              wrapperClass="mx-5"
              required
              step={0.01}
              label="price"
              name="price"
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

export default CreateFood;
