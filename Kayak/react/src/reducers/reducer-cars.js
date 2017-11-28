const reducerCars = (state = {
    cars: []
}, action) => {
    switch (action.type) {
        case "STORECARS":
            state = {
                ...state,
                cars: action.payload.data
            };
            break;

        default:
            break;
    }
    return state;
};

export default reducerCars;