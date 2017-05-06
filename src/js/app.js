import "../sass/main.scss";

import $ from "jquery";
import getUsersHTML from "./Users";

let container = $(".container"),
    button = $(".button");

button.on("click", function() {

    getUsersHTML()
        .then(html => {
            container.append(html);
        });

});