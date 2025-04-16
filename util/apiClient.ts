import { getAuthToken } from "@/server/server";
import axios from "axios";

// const BASEURL_LOCAL = 'http://localhost:5000/api'

const BASEURL_HOST = 'https://to-do-backend-6per.onrender.com/api'

const apiClient = axios.create({
    baseURL:process.env.REACT_APP_API_URL || BASEURL_HOST,
    timeout:10000,
    withCredentials: true,
    headers:{
        'Content-Type':'application/json'
    }
})


// Request interceptor
apiClient.interceptors.request.use(async (config)=>{
    const token = await getAuthToken();

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
    (error)=>Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use((response)=> response, (error)=>Promise.reject(error))


export default apiClient