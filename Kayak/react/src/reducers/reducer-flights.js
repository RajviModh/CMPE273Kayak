const reducerFlights = (state = {
  selectedFrom:"",
<<<<<<< HEAD
  fromCity:[],
  toCity:[],
  selectedTo:"",
  flights:[],
  selectedFlight:'',
  selectedFlightR:'',
  Adult:[],
  Child:[],
  return_enable:false,
=======
  selectedTo:"",
  flights:[],
>>>>>>> 16f52ff8c981810205616013d3de2d15fbe3b143
}, action) => {
  switch(action.type){
    case "setSelectedFrom":
        state={
          ...state,
          selectedFrom: action.payload.data
        };
    console.log("after setting selectedFrom reducer",state.selectedFrom);
    break;
    case "setSelectedTo":
        state={
          ...state,
          selectedTo: action.payload.data
        };
        console.log("after setting selectedTo reducer",state);
    break;
    case "setFlights":
    console.log("in setFlights",action.payload.data);
        state={
          ...state,
          flights: action.payload.data
        };
        console.log("after setting reducer",state);
    break;
<<<<<<< HEAD
    case "setFromCity":
        state={
          ...state,
          fromCity: action.payload.data
        };
    break;
    case "setToCity":
        state={
          ...state,
          toCity: action.payload.data
        };
    break;
    case "setSelectedFlight":
        state={
          ...state,
          selectedFlight: action.payload.data
        };
    break;
      case "setSelectedFlightR":
          state={
              ...state,
              selectedFlightR: action.payload.data
          };
          break;
    case "setAdult":
        state={
          ...state,
          Adult: action.payload.data
        };
    break;
    case "setChild":
        state={
          ...state,
          Child: action.payload.data
        };
    break;
    case "setReturnEnable":
        state={
          ...state,
          return_enable: action.payload.data
        };
    break;
=======
>>>>>>> 16f52ff8c981810205616013d3de2d15fbe3b143
    default:
    break;
  }
  return state;
};

export default reducerFlights;
