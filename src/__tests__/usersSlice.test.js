import usersReducer from "../features/users/usersSlice";

test("returns the initial state", () => {
  expect(usersReducer(undefined, {})).toEqual({
    users: [],
  });
});

test("handles the 'users/add' action", () => {
  expect(
    usersReducer(undefined, {
      type: "users/add",
      payload: { username: "Joey", hometown: "Brooklyn" },
    })
  ).toEqual({
    users: [{ username: "Joey", hometown: "Brooklyn" }],
  });
});
