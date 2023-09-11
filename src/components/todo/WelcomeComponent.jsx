import { useNavigate, useParams } from "react-router-dom";
import { retrieveHello, retrieveHelloBean, retrieveHelloWithVar } from "../api/HelloApi";
import { useState } from "react";

function WelcomeComponent() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null)

    const handleSubmit = () => {
        navigate('/todos')
    }

    const callHello = () => {
        console.log("called")
        // retrieveHello().then((result)=>{
        //     console.log(result.data)
        //     setMsg(result.data)
        // }).catch(error => console.log(error))

        // retrieveHelloBean().then((result)=>{
        //     console.log(result.data)
        //     setMsg(result.data.msg)
        // }).catch(error => console.log(error))

        retrieveHelloWithVar("Mihu").then((result)=>{
            console.log(result.data)
            setMsg(result.data.msg)
        }).catch(error => console.log(error))
    }

    return (
        <div className="WelcomeComponent">
            Welcome {username}
            <div>
                <button className="btn btn-success mt-5" onClick={handleSubmit}>TODO</button>
            </div>
            <div>
                <button className="btn btn-success mt-5" onClick={callHello}>Call hello world</button>
            </div>
            {
                msg && <p>massage is .. {msg}</p>
            }
        </div>
    )
}

export default WelcomeComponent;