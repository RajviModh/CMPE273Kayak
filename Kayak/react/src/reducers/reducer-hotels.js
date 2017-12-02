const reducerHotels = (state = {
    hotels: [],
    selected : {},
    details : {},
    bookingdetails:{}
}, action) => {
    switch (action.type) {
        case "STOREHOTELS":
            state = {
                ...state,
                hotels: action.payload.data
            };
            console.log("From store"+state.hotels);
            break;

        case "STORESELECTEDHOTELS":
            state = {
                ...state,
                selected: action.payload.data
            };
            console.log(state.selected);
            break;

        case "STOREUSERDETAILS":
            state = {
                ...state,
                details: action.payload.data
            };
            console.log(state.details);
            break;

        case "STOREHOTELBOOKINGREQUEST":
            state = {
                ...state,
                bookingdetails: action.payload.data
            };
            console.log(state.bookingdetails);
            break;

        default:
            break;
    }
    return state;
};

export default reducerHotels;
