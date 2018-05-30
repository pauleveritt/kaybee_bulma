import { app } from "hyperapp";

import "./scss/kaybee_bulma.scss";
import "./scss/pygments.css";

import actions from "./filteredlisting/Actions";
import Container from "./filteredlisting/Container";
import initialState from "./filteredlisting/State";

import "./container.scss";

app(
    initialState,
    actions,
    Container, document.getElementById("kbb-filteredlisting")
);
