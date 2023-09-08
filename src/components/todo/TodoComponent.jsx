import { Form, useParams } from "react-router-dom";
import { retrieveTodoApi, updateTodoApi } from "../api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";

function TodoComponent() {

    const {id} = useParams();
    const username = useAuth().username;

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(
        () => retrieveTodos(), [id]
    )

    const retrieveTodos = () => {
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
            })
            .catch(err => console.log(err))
    }

    const onSubmit = (values) => {
        console.log(values)
        const todo = {
            id: id, 
            username: username, 
            description: description, 
            targetDate: targetDate, 
            done: false
        }
        console.log(todo)
        updateTodoApi(username, id, todo);
    }

    const validate = (values) => {
        let errors = {
            // description: "enter somethin usefull",
            // targetDate: "enter date"
        }

        if(values.description.length < 5){
            errors.description = "Longer then 5"
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
                    validateOnBlur={false}>
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