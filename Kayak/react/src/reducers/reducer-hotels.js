const reducerHotels = (state = {
    hotels: [  {
        "HID" : 1,
        "city" : "Mumbai",
        "freebies" : [
            "b",
            "p"
        ],
        "name" : "Mariott",
        "rooms" : [
            {
                "RID" : 1,
                "availableRooms" : 1,
                "rent" : 200,
                "type" : "r"
            }
        ],
        "stars" : 4,
        "state" : "Maharashtra",
        "street" : "1st"}],
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
            console.log(state.hotels);
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
