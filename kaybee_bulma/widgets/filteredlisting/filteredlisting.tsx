import { app, h } from "hyperapp";

// const filtering = [
//     {
//         heading: "Types",
//     }
// ];

const view = () => (
    <div className="kbb-filteredlisting">
        Here {1 + 1}
    </div>
);

const initialState = {};
const initialActions = {};

app(
    initialState,
    initialActions,
    view,
    document.getElementById("x39")
);

export default app;
console.log(3939339);