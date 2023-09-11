import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);
export const retrieveHello
    = () => apiClient.get(`/hello-world`)

export const retrieveHelloBean
    = () => apiClient.get(`/hello-world-bean`)

export const retrieveHelloWithVar
    = (name) => apiClient.get(`/hello-world/${name}`)