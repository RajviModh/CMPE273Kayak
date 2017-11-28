const reducerHotels = (state = {
    hotels: []
}, action) => {
    switch (action.type) {
        case "STOREHOTELS":
            state = {
                ...state,
                hotels: action.payload.data
            };
            console.log(state.hotels);
            break;

        default:
            break;
    }
    return state;
};

export default reducerHotels;
