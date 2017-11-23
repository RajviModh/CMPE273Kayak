

const userReducer = (state = {
    isLoggedIn: false,
    message: '',
    username: '',
    showLoginModal: false,
    showSignupModal: false,
    isUser:false
}, action) => {
  switch(action.type){

    case "CHANGELOGIN":
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
