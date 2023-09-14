import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext"

function LoginComponent() {
    const [userName, setUserName] = useState('');
    const [password, setpassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(' ');

    let errorMessage = <p>{errorLogin}</p>
    const authContext = useAuth();
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setpassword(e.target.value);
    }

    async function handleSubmit () {
        if (await authContext.login(userName, password)){
            navigate(`/welcome/${userName}`)
        } else {
            setErrorLogin('Authentication failed successfully :) ') 
        }
    }

    return (
        <div className="Login">
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" onChange={handleUserChange} value={userName}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={handlePasswordChange} value={password}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
                <div>{ errorMessage }</div>

            </div>
        </div>
    )
}

export default LoginComponent;