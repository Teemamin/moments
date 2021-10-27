import axios from "axios";

// multipart/form-data  
// as that is the data format the API will be  expecting. We need the multipart because  
// our application will be dealing with  images as well as text in its requests. 
// To avoid any CORS errors when sending cookies,  we also need to set withCredentials to true.

axios.defaults.baseURL = "https://teemamin-drf-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;