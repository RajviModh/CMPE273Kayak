

const userReducer = (state = {
  isLoggedIn: false,
  username: '',
  password:''
}, action) => {
  switch(action.type){

    case "CHANGELOG":
        state={
          ...state,
          isLoggedIn : true
        };
        break;

    case "CHANGEUSER":
        state={
          ...state,
          username: action.payload.username
        };
        break;

    case "CHANGEPASS":
        state={
          ...state,
          password: action.payload.password
        };
        break;


  }
  return state;
};

export default userReducer;
