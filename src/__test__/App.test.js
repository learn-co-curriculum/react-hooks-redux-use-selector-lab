import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { expect } from "chai";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "../App";
import usersReducer from "../features/users/usersSlice";

configure({ adapter: new Adapter() });

describe("store", () => {
  it("is correctly initialized when application is mounted", () => {
    let store = createStore(usersReducer);

    mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(store.getState()).to.deep.equal({ users: [] });
  });

  it("can be updated with the 'users/add' action", () => {
    let store = createStore(usersReducer);
    store.dispatch({
      type: "users/add",
      payload: { username: "Joey", hometown: "Brooklyn" },
    });
    expect(store.getState()).to.deep.equal({
      users: [{ username: "Joey", hometown: "Brooklyn" }],
    });
  });
});
