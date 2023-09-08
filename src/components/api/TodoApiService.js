import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retrieveAllTodosForUsernameApi = (username) => {
    return apiClient.get(`/users/${username}/todos`)
}

export const retrieveTodoApi = (username, id) => {
    return apiClient.get(`/users/${username}/todos/${id}`)
}

export const deleteTodoApi = (username, id) => {
    return apiClient.delete(`/users/${username}/todos/${id}`)
}

export const updateTodoApi = (username, id, todo) => {
    return apiClient.put(`/users/${username}/todos/${id}`, todo)
}

