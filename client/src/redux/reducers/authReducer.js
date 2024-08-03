const intialState = {
  // user: {
  //   username: "Khan",
  //   loggedDate: new Date().toLocaleString(),
  //   password: "123",
  // },
  user: null,
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return action.payload;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

export default authReducer;
