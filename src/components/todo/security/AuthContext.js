import { createContext, useContext, useState } from "react";
import { executeJWTAuthService } from "../../api/AuthenticationAPIService";
import { apiClient } from "../../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({children}) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);


    // const login = (userName, password) => {
    //     if (userName === 'Mihu' && password === 'mmm'){
    //         setAuthenticated(true);
    //         setUsername(userName);
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }

    // THIS IS BASIC AUTH METHOD
    // const login = async (userName, password) => {
    //     const baToken = "Basic " + window.btoa(userName + ":" + password);
        
    // try {
    //     const response = await executeBasicAuthService(baToken);

    //     if (response.status == 200){
    //         setAuthenticated(true);
    //         setUsername(userName);
    //         setToken(baToken);

    //         // This will add token to headers
    //         // THIS WILL ALLOW AUTHORISATION ON DIFFERENT PAGES 
    //         apiClient.interceptors.request.use(
    //             config => {
    //                 config.headers.Authorization = baToken;
    //                 return config;
    //             }
    //         )
    //         return true;
    //     } else {
    //         logout()
    //         return false;
    //     }
    // } catch(error) {
    //     logout()
    //     return false;
    // }

    // }

    const login = async (userName, password) => {
        
    try {
        const response = await executeJWTAuthService(userName, password);

        if (response.status == 200){
            const jwtToken = "Bearer " + response.data.token;
            setAuthenticated(true);
            setUsername(userName);
            setToken(jwtToken);

            // This will add token to headers
            // THIS WILL ALLOW AUTHORISATION ON DIFFERENT PAGES 
            apiClient.interceptors.request.use(
                config => {
                    config.headers.Authorization = jwtToken;
                    return config;
                }
            )
            return true;
        } else {
            logout()
            return false;
        }
    } catch(error) {
        logout()
        return false;
    }

    }


    const logout = () => {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;