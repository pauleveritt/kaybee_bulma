import { app } from "hyperapp";

import "./scss/kaybee_bulma.scss";
import "./scss/pygments.css";

import actions from "./Actions";
import Container from "./Container";
import initialState from "./State";

import "./container.scss";

app(
    initialState,
    actions,
    Container, document.getElementById("kbb-filteredlisting")
);
