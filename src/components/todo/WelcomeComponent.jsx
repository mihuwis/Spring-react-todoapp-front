import { useNavigate, useParams } from "react-router-dom";

function WelcomeComponent() {
    const { username } = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/todos')
    }
    return (
        <div className="WelcomeComponent">
            Welcome {username}
            <button onClick={handleSubmit}>TODO</button>
        </div>
    )
}

export default WelcomeComponent;