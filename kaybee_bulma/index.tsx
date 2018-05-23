import { h } from "hyperapp";
import { app } from "hyperapp";

import "./scss/kaybee_bulma.scss";
import "./scss/pygments.css";

document.addEventListener("DOMContentLoaded", () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(($el: any) => {
            $el.addEventListener("click", () => {

                // Get the target from the "data-target" attribute
                const target = $el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle("is-active");
                if ($target) {
                    $target.classList.toggle("is-active");
                }

            });
        });
    }

});

interface IState {
    count: number;
}

class Actions {
    down = (value: number) => (state: IState) => ({count: state.count - value});
    up = (value: number) => (state: IState) => ({count: state.count + value});
}

const Container = (state: IState, actions: Actions) => (
    <div>
        <h1>{state.count}</h1>
        <button onclick={() => actions.down(1)}>-</button>
        <button onclick={() => actions.up(1)}>+</button>
    </div>
);

const initialState: IState = {
    count: 0
};

document.addEventListener("DOMContentLoaded", event => {
    const target = document.getElementById("target");
    app(initialState, new Actions(), Container, target);
});
