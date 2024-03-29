import axios from "axios";

//tell our React  project to send requests to the API. this file is imported in app.js
// multipart/form-data  
// as that is the data format the API will be  expecting. We need the multipart because  
// our application will be dealing with  images as well as text in its requests. 
// To avoid any CORS errors when sending cookies,  we also need to set withCredentials to true.

axios.defaults.baseURL = "https://teemamin-drf-api.herokuapp.com/"; 
// axios.defaults.baseURL = "https://web-production-06c5.up.railway.app/"; this was used for the api deployed on railway
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// newly created axios instances  that we’ll attach the interceptors to intercept both requests  
// and responses from our API and run  custom code before they are passed on. 
export const axiosReq = axios.create();
export const axiosRes = axios.create();
