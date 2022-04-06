const userData = {
  id: 1,
  fname: "",
  lname: "",
  email: "",
  phone: "",
  province: 0,
  district: "",
  location: "",
};

const loggedUserDataReducer = (state = userData, action) => {
  switch (action.type) {
    case "getLoggedUserData":
      return state;
    case "setLoggedUserData":
      return (state = action.payload);
    default:
      return state;
  }
};

export default loggedUserDataReducer;
