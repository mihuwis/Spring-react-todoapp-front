import { useEffect, useState } from "react";
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "../api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";


function TodosComponent() {
    // const today = new Date();
    // const targetDate = new Date(today.getFullYear()+1, today.getMonth(), today.getDay())

    const authContext = useAuth();

    const username = authContext.username;
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [msg, setMsg] = useState(null);

    // const todos = [
    //     {"id":1, "description":"Learn Full stack", done:false, targetDate:targetDate},
    //     {"id":2, "description":"Learn Java", done:false, targetDate:targetDate},
    //     {"id":3, "description":"Learn Docker", done:false, targetDate:targetDate},
    //     {"id":4, "description":"Learn AWS", done:false, targetDate:targetDate}
    // ]

    useEffect (() => refreshTodos(), [])

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
        .then((response) => {
            console.log("refresh todos:" +  response.data);
            setTodos(response.data)
        }).catch(error => console.log(error))
    }

    function deleteTodo(id) {
        console.log("deleted: " +id);
        deleteTodoApi(username ,id).then(() => 
            () => {
                setMsg('Item deleted')
                console.log("xxxxxxxxxxxxx ");
                refreshTodos()
            }
        ).catch(error => console.log(error))
    }

    function updateTodo(id) {
        console.log(id);
        navigate(`/todo/${id}`)
    }

    return (
        <div className="container">
            <h2>To do list</h2>
            { msg && <div className="alert alert-warning"> { msg } </div> }
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>is Done?</th>
                            <th>Target Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(elem => {return(
                    <tr key={elem.id}>
                        <td>{elem.description}</td>
                        <td>{elem.done.toString()}</td>
                        <td>{elem.targetDate.toString()}</td>
                        <td> 
                            <button className="btn btn-success" onClick={() => updateTodo(elem.id)}>
                                Edit
                            </button>
                        </td>
                        <td> 
                            <button className="btn btn-warning" onClick={() => deleteTodo(elem.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                    )})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodosComponent;