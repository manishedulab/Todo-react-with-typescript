import axios from "axios";

const UserApi = axios.create({
    baseURL: "http://localhost:3001/"
})

/* Intercepting the request and adding a parameter to the request. */
UserApi.interceptors.request.use((request) => {
    const Token = localStorage.getItem('token');
    request.params = request.params || {};
    request.params['privatekey'] = Token;
    return request
})

UserApi.interceptors.response.use((response)=>{
    return response;
})


export default UserApi;