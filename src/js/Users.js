import "../sass/components/_users.scss";

import $ from "jquery";
import template from "./views/users.hbs";

const API_URL = "http://jsonplaceholder.typicode.com/users";

function createHTML(data) {

    return template({
        users: data
    });

}

function getUsers() {

    return $.getJSON(API_URL)
        .then(data => createHTML(data));

}

function getUsersHTML() {

    return getUsers();

}

export default getUsersHTML;