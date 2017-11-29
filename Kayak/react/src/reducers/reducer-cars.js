const reducerCars = (state = {
    cars: [],
    selectedcars : {},
    cardetails : {},
    carbookingdetails:{}
}, action) => {
    switch (action.type) {

        case "STORECARS":
            state = {
                ...state,
                cars: action.payload.data
            };
            break;

        case "STORESELECTEDCARS":
            state = {
                ...state,
                selectedcars: action.payload.data
        };
        break;

        case "STOREUSERDETAILS":
            state = {
                ...state,
                cardetails: action.payload.data
            };
            break;

        case "STORECARBOOKINGREQUEST"   :
            state = {
                ...state,
                carbookingdetails: action.payload.data
            };
            break;


        default:
            break;
    }
    return state;
};

export default reducerCars;