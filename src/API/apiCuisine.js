import axios from 'axios';

const baseUrl = "http://localhost:8080"
const axiosPrivate = axios.create({
    baseUrl: baseUrl
});

export const getAllCuisine = async () => {
    // const response = await axiosPrivate.get("/cuisines");
    const response = await axios.get("http://localhost:8080/cuisines");
    console.log(JSON.stringify(response.data));
    return response.data;
}