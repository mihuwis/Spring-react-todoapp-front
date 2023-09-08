import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({children}) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);


    const login = (userName, password) => {
        if (userName === 'Mihu' && password === 'mmm'){
            setAuthenticated(true);
            setUsername(userName);
            return true;
        } else {
            setAuthenticated(false);
            setUsername(null);
            return false;
        }
    }

    const logout = () => {
        setAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;