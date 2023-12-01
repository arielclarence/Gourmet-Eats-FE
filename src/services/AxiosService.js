import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'http://localhost:8080/',
    headers:{
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token= JSON.parse(sessionStorage.getItem("token"))
        if (token) {
            config.headers["Authorization"]=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error)=>{
        const originalConfig=error.config;
        if (originalConfig.url!=="/user/login"&&error.response) {
            originalConfig._retry=true;

            try{
                const refreshTokenPromise=await axiosInstance.post("user/token",{
                    token:JSON.parse(sessionStorage.getItem("token"))
                })
    
                const {token}=refreshTokenPromise.data;
    
                sessionStorage.setItem("token",JSON.stringify(token))
                return axiosInstance(originalConfig);
            }catch(_error){
                return Promise.reject(_error)
            }
        }
        return Promise.reject(error)
        
    }
)

export default axiosInstance