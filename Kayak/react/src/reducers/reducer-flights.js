const reducerFlights = (state = {
  selectedFrom:"",
  fromCity:[],
  toCity:[],
  selectedTo:"",
  flights:[],
  selectedFlight:'',
  selectedFlightR:'',
  Adult:[],
  Child:[],
  return_enable:false,
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
    default:
    break;
  }
  return state;
};

export default reducerFlights;
