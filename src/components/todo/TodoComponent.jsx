import { useParams, useNavigate } from "react-router-dom";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "../api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Field, Formik } from "formik";
import moment from "moment/moment";

function TodoComponent() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");

    const context = useAuth();
    const username = context.username;

    useEffect(
        () => retrieveTodos(), [id]
    )

    function retrieveTodos(){
        if(id != -1){
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
            })
            .catch(err => console.log(err))
        }
    }

    function onSubmit(values){
        const todo = {
            id: id, 
            username: username, 
            description: values.description, 
            targetDate: values.targetDate, 
            done: false
        }
        if(id == -1){
            console.log(typeof id)
            createTodoApi(username, todo)
                .then(()=> navigate("/todos"))
                .catch(err => console.log(err))
        } else {
            updateTodoApi(username, id, todo)
                .then(()=> navigate("/todos"))
                .catch(err => console.log(err))

        }
    }

    const validate = (values) => {
        let errors = {
            // description: "enter somethin usefull",
            // targetDate: "enter date"
        }

        if(values.description.length < 5){
            errors.description = "Longer then 5"
        }

        if(values.targetDate == null || values.targetDate === "" ){
            errors.targetDate = "Enter target date"
        }
        return errors;
    }

    return (
        <div className="container">
            <h2>Enter details: </h2>
            <div>
                <Formik initialValues={ {description, targetDate}} 
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                {
                    (props)=>(
                        <Form>
                            <ErrorMessage 
                                name="description" 
                                component="div" 
                                className="alert alert-warning"/>
                            <ErrorMessage 
                                name="targetDate" 
                                component="div" 
                                className="alert alert-warning"/>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                        </fieldset>
                        <div>
                            <button className="btn btn-success m-5" type="submit" >Save</button>
                        </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>

    )
}

export default TodoComponent;