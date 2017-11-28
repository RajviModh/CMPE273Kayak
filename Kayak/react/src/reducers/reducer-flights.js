const reducerFlights = (state = {
    selectedFrom: "",
    selectedTo: "",
    flights: [],
}, action) => {
    switch (action.type) {
        case "setSelectedFrom":
            state = {
                ...state,
                selectedFrom: action.payload.data
            };
            console.log("after setting selectedFrom reducer", state.selectedFrom);
            break;
        case "setSelectedTo":
            state = {
                ...state,
                selectedTo: action.payload.data
            };
            console.log("after setting selectedTo reducer", state);
            break;
        case "setFlights":
            console.log("in setFlights", action.payload.data);
            state = {
                ...state,
                flights: action.payload.data
            };
            console.log("after setting reducer", state);
            break;
        default:
            break;
    }
    return state;
};

export default reducerFlights;
