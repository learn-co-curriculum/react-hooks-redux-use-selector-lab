const initialState = {
  users: [],
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "users/add":
      console.log("adding ", action.payload);
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
}

export default usersReducer;
