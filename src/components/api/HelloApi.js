import { apiClient } from "./ApiClient"

export const retrieveHello
    = () => apiClient.get(`/hello-world`)

export const retrieveHelloBean
    = () => apiClient.get(`/hello-world-bean`)

export const retrieveHelloWithVar
    = (name, token) => apiClient.get(`/hello-world/${name}`
    // Comented OUT because we are using apiClient.interceptors. 
    // this below was used as hardcoded version of adding token to header
    // , {
    //     headers: {
    //         Authorization: token
    //     }
    // }
    
    )

