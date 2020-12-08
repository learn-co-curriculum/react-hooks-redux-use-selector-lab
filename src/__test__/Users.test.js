import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { expect } from "chai";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "../App";
import usersReducer from "../features/users/usersSlice";
import Users from "../features/users/Users";

configure({ adapter: new Adapter() });

describe("Users.js", () => {
  it("does not display any users initially", () => {
    let store = createStore(usersReducer);

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find(Users).find("li").length).to.equal(0);
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
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find(Users).find("li").length).to.equal(2);
    expect(wrapper.find(Users).html()).to.include("Maxwell");
    expect(wrapper.find(Users).html()).to.include("Fran");
  });

  it("updates the props as more users are added to the stores state", () => {
    let store = createStore(usersReducer);
    const wrapper = mount(
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

    wrapper.update();
    wrapper.find(Users).first();
    expect(wrapper.find(Users).html()).to.include("Will");
  });

  it("lists the total number of users that have been added to the store", () => {
    let store = createStore(usersReducer);
    const wrapper = mount(
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

    wrapper.update();

    expect(wrapper.find(Users).html()).to.include("7");

    store.dispatch({
      type: "users/add",
      payload: {
        username: "Peach",
        hometown: "Brewster",
      },
    });

    wrapper.update();

    expect(wrapper.find(Users).html()).to.include("8");
  });
});
