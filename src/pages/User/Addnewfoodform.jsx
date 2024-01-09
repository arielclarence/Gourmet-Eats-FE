import { MDBInput, MDBTextArea, MDBValidation, MDBValidationItem, MDBBtn } from "mdb-react-ui-kit";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import CuisineServices from "../../services/CuisineServices";
import FoodServices from "../../services/FoodServices";
import InputFile from "../../components/InputFile";
import FirebaseServices from "../../services/FirebaseServices";
import ToastServices from "../../services/ToastServices";
import Select from 'react-select';

const CreateFood = forwardRef(function CreateFood(props, ref) {
    const [formData, setFormData] = useState({
        description: "",
        name: "",
        imageUrl: "",
        price: 0,
        image: null,
        cuisineId: null,
    });
    const [cuisines, setCuisines] = useState([]); // State to store the list of cuisines

    // Simulate fetching cuisines from an API
    useEffect(() => {
        const fetchCuisines = async () => {
            const response = await CuisineServices.getAllCuisine();
            setCuisines(response.cuisines);
            console.log(response.cuisines);
        };

        fetchCuisines();
    }, []);

    const handleSubmit = () => {
        event.preventDefault()
        if(formData.name.length<1||formData.description.length<1||formData.price==null||formData.cuisineId==null||formData.imageUrl==null){
            ToastServices.Error("There is an empty field!")
          }else{
            FirebaseServices.uploadImage(formData.image,"food/"+formData.name)
            .then(downloadUrl=>{
              // setFormData({...formData,["profilePictureUrl"]:downloadUrl})
              formData.imageUrl=downloadUrl
              FoodServices.createFood(formData)
              .then(ToastServices.Success("Succesful creating new food"))
              .catch(error=>{
                const errorMessages=error.response.data.properties.errors
                errorMessages.map(errorMessage=>ToastServices.Error(convertErrorMessage(errorMessage.error)))
            })})
          }
        props.onSubmit(formData);
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    const updateFormData = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    return (
        <MDBValidation className="w-75">
            <InputFile getValue={(e) => updateFormData("image", e.target.files[0])} />

            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput
                    type="text"
                    wrapperClass="mx-5"
                    label="name"
                    required
                    name="name"
                    onChange={(e) => updateFormData(e.target.name, e.target.value)}
                />
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBTextArea
                    required
                    wrapperClass="mx-5"
                    step={0.01}
                    label="description"
                    name="description"
                    onChange={(e) => updateFormData(e.target.name, e.target.value)}
                />
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <label>Cuisine</label>
                <Select
                    options={cuisines.map((cuisine) => ({ value: cuisine.id, label: cuisine.cuisineName }))}
                    onChange={(selectedOption) => updateFormData("cuisineId", selectedOption.value)}
                    value={cuisines.find((cuisine) => cuisine.value === formData.cuisineId)}
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
                    onChange={(e) => updateFormData(e.target.name, e.target.value)}
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
