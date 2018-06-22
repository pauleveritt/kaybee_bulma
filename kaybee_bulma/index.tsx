import { app } from "hyperapp";

import "./scss/kaybee_bulma.scss";
import "./scss/pygments.css";

import Actions from "./filteredlisting/archive/Actions";
import Container from "./filteredlisting/archive/Container";
import initialState from "./filteredlisting/archive/State";

app(
    initialState,
    new Actions(),
    Container, document.getElementById("kbb-filteredlisting")
);
