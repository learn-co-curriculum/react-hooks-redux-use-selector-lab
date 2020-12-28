import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "../App";
import usersReducer from "../features/users/usersSlice";

test("does not display any users initially", () => {
  let store = createStore(usersReducer);

  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(container.querySelectorAll("li")).toHaveLength(0);
});

it("displays users kept within the store", () => {
  let store = createStore(usersReducer);
  store.dispatch({
    type: "users/add",
    payload: { username: "Maxwell", hometown: "Manhattan" },
  });
  store.dispatch({
    type: "users/add",
    payload: { username: "Fran", hometown: "Queens" },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.queryByText(/Maxwell/g)).toBeInTheDocument();
  expect(screen.queryByText(/Fran/g)).toBeInTheDocument();
});

test("updates the props as more users are added to the stores state", () => {
  let store = createStore(usersReducer);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  store.dispatch({
    type: "users/add",
    payload: {
      username: "Will",
      hometown: "Philadelphia",
    },
  });

  expect(screen.queryByText(/Will/g)).toBeInTheDocument();
});

test("lists the total number of users that have been added to the store", () => {
  const store = createStore(usersReducer);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  store.dispatch({
    type: "users/add",
    payload: {
      username: "Batman",
      hometown: "Gotham",
    },
  });
  store.dispatch({
    type: "users/add",
    payload: {
      username: "Superman",
      hometown: "Metropolis",
    },
  });
  store.dispatch({
    type: "users/add",
    payload: {
      username: "Dredd",
      hometown: "Mega-City One",
    },
  });
  store.dispatch({
    type: "users/add",
    payload: {
      username: "Goku",
      hometown: "Planet Vegeta",
    },
  });
  store.dispatch({
    type: "users/add",
    payload: {
      username: "Spiderman",
      hometown: "New York City",
    },
  });
  store.dispatch({
    type: "users/add",
    payload: {
      username: "Luca",
      hometown: "Suffern",
    },
  });
  store.dispatch({
    type: "users/add",
    payload: {
      username: "Lola",
      hometown: "Chestnut Ridge",
    },
  });

  expect(screen.queryByText(/Total Users: 7/g)).toBeInTheDocument();

  store.dispatch({
    type: "users/add",
    payload: {
      username: "Peach",
      hometown: "Brewster",
    },
  });

  expect(screen.queryByText(/Total Users: 8/g)).toBeInTheDocument();
});
