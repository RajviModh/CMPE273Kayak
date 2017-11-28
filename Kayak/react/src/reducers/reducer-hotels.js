const reducerHotels = (state = {
    hotels: []
}, action) => {
    switch (action.type) {
        case "STOREHOTELS":
            state = {
                ...state,
                hotels: action.payload.data
            };
            break;

        default:
            break;
    }
    return state;
};

export default reducerHotels;
