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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        if (
            formData.name.length < 1 ||
            formData.description.length < 1 ||
            formData.price === null ||
            formData.cuisineid === null ||
            formData.pictureUrl === null
        ) {
            ToastServices.Error("There is an empty field!");
        } else {
            FirebaseServices.uploadImage(formData.image, "food/" + formData.name)
                .then((downloadUrl) => {
                    formData.pictureUrl = downloadUrl;
                    FoodServices.createFood(formData)
                        .then(() => {
                            ToastServices.Success("Succesful creating new food");
                            props.onSubmit(formData);
                        })
                        .catch((error) => {
                            const errorMessages = error.response.data.properties.errors;
                            errorMessages.map((errorMessage) =>
                                ToastServices.Error(convertErrorMessage(errorMessage.error))
                            );
                        });
                });
        }
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    const updateFormData = (name, value) => {
        setFormData((prevFormData) => {
            // Handle 'image' property separately
            if (name === "image") {
                return { ...prevFormData, [name]: value };
            }
            return { ...prevFormData, [name]: value };
        });
    };
    return (
        <MDBValidation className="w-75">
            <InputFile onChange={(e) => updateFormData("image", e)} />

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
                    onChange={(selectedOption) => updateFormData("cuisineid", selectedOption.value)}
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
