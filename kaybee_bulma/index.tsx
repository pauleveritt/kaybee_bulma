import { app } from "hyperapp";

import "./scss/kaybee_bulma.scss";
import "./scss/pygments.css";

import Actions from "./filteredlisting/Actions";
import Container from "./filteredlisting/Container";
import initialState from "./filteredlisting/State";

app(
    initialState,
    new Actions(),
    Container,
    document.getElementById("kbb-fl")
);
