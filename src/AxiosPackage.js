import Axios from 'axios';
const baseUrl = 'http://127.0.0.1:8080/api/';

export function fetchTodos(page) {
    let encodedURI = window.encodeURI(baseUrl + page);
        return Axios.get(encodeURI).then(result => result.data);
}