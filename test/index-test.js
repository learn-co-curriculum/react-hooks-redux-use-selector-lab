import { expect } from 'chai';
import sinon from 'sinon';
import { configure, shallow, mount } from 'enzyme';
import React from 'react';
import UserInput from '../src/components/UserInput';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import App from '../src/App';
import Users from '../src/components/Users';
import manageUsers from '../src/reducers/manageUsers'

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('store', () => {

  let store
  it('is correctly initialized when application is mounted', () => {
      store = createStore(manageUsers)

      const wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      );
      expect(store.getState()).to.deep.equal({users: []});
  });

  it('can be updated with an action', () => {
      store = createStore(manageUsers)
      store.dispatch({type: 'ADD_USER', user: {username: "Joey", hometown: "Brooklyn"}})
      const wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      );
      expect(store.getState()).to.deep.equal({users: [{username: "Joey", hometown: "Brooklyn"}]});
  });
});

describe('the application', () => {
  let store

  it('does not display any users initially', () => {
    store = createStore(manageUsers)

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find(Users).find('li').length).to.equal(0);
  });

  it('displays users kept within the store', () => {
    store = createStore(manageUsers)
    store.dispatch({type: 'ADD_USER', user: {username: "Maxwell", hometown: "Manhattan"}})
    store.dispatch({type: 'ADD_USER', user: {username: "Fran", hometown: "Queens"}})
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find(Users).find('li').length).to.equal(2);
    expect(wrapper.find(Users).html()).to.include('Maxwell')
    expect(wrapper.find(Users).html()).to.include('Fran')
  });

  it('updates the props as more users are added to the stores state', () => {
    store = createStore(manageUsers)
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Will',
        hometown: 'Philadelphia'
      }
    });

    wrapper.update()
    let WrapperUsers = wrapper.find(Users).first();

    expect(wrapper.find(Users).html()).to.include('Will')
  });

  it('lists the total number of users that have been added to the store', () => {
    store = createStore(manageUsers)
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Batman',
        hometown: 'Gotham'
      }
    });

    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Superman',
        hometown: 'Metropolis'
      }
    });
    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Dredd',
        hometown: 'Mega-City One'
      }
    });
    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Goku',
        hometown: 'Planet Vegeta'
      }
    });
    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Spiderman',
        hometown: 'New York City'
      }
    });
    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Luca',
        hometown: 'Suffern'
      }
    });
    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Lola',
        hometown: 'Chestnut Ridge'
      }
    });

    wrapper.update()

    expect(wrapper.find(Users).html()).to.include('7')


    store.dispatch({
      type: 'ADD_USER',
      user: {
        username: 'Peach',
        hometown: 'Brewster'
      }
    });

    wrapper.update()

    expect(wrapper.find(Users).html()).to.include('8')

  });

});
