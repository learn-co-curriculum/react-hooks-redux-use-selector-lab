import { expect } from 'chai';
import sinon from 'sinon';
import { configure, shallow, mount } from 'enzyme';
import React from 'react';
import UserInput from '../src/components/UserInput';
import { configureStore } from '../src/index.js';
import { Provider } from 'react-redux';
import App from '../src/App';
import { ConnectedUsers, Users }  from '../src/components/Users';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('store', () => {

  let store = configureStore();

  it('returns the initial state after redux dispatches its initial action', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(ConnectedUsers)).to.have.length(1);
  });

  it('returns a state provided by the store', () => {
    let store = configureStore()
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedUsers />
      </Provider>
    );
    let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first();
    let WrapperUsers = wrapper.find(Users).first();
    expect(WrapperUsers.props().users).to.deep.equal([]);
  });

  it('updates the props as more users are added to the stores state', () => {
    let store = configureStore()
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedUsers />
      </Provider>
    );
    store.dispatch({
      type: 'ADD_USER',
      user: {
        name: 'bob',
        hometown: 'philly'
      }
    });

    wrapper.update()
    let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first();
    let WrapperUsers = wrapper.find(Users).first();

    expect(WrapperUsers.props().users).to.deep.equal([{name: 'bob', hometown: 'philly'}]);
  });

  it('displays the users in the users component', ()=> {
    let store = configureStore();
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedUsers />
      </Provider>
    );
    store.dispatch({
      type: 'ADD_USER',
      user: {
        userName: 'bob',
        hometown: 'philly'
      }
    });
    store.dispatch({
      type: 'ADD_USER',
      user: {
        userName: 'fred',
        hometown: 'pittsburgh'
      }
    });
    wrapper.update()
    let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first();
    let WrapperUsers = wrapper.find(Users).first();
    expect(WrapperUsers.text()).to.include('bob');
    expect(WrapperUsers.text()).to.include('fred');
  });

  it('adds a prop called primary user to the users component which is the first user in the store', () => {
    let store = configureStore()
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedUsers />
      </Provider>
    );
    store.dispatch({
      type: 'ADD_USER',
      user: {
        name: 'bob',
        hometown: 'philly'
      }
    });
    store.dispatch({
      type: 'ADD_USER',
      user: {
        name: 'fred',
        hometown: 'pittsburgh'
      }
    });
    wrapper.update()
    let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first();
    let WrapperUsers = wrapper.find(Users).first();
    expect(WrapperUsers.props().primaryUser).to.deep.equal({name: 'bob', hometown: 'philly'});
  });

});
