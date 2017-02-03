import { expect } from 'chai';
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import React from 'react'
import UserInput from '../src/components/UserInput'
import { configureStore } from '../src/index.js'
import { Provider } from 'react-redux'
import App from '../src/App'
import { ConnectedUsers, Users }  from '../src/components/Users'

describe('store', () => {
  let store = configureStore()

  it('returns the initial state after redux dispatches its initial action', () => {
      const wrapper = shallow(<App />)
      expect(wrapper.find(ConnectedUsers)).to.have.length(1)
  });

  it('returns a state provided by the store', () => {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()
      console.log(WrapperUsers.props())
      expect(WrapperUsers.props().users).to.deep.equal([])
  });

  it('updates the props as more users are added to the stores state', () => {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      store.dispatch({type: 'ADD_USER', payload: {name: 'bob', hometown: 'philly'}})
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()

      expect(WrapperUsers.props().users).to.deep.equal([{name: 'bob', hometown: 'philly'}])
  });

  it('displays the users in the users component', ()=> {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      store.dispatch({type: 'ADD_USER', payload: {userName: 'bob', hometown: 'philly'}})
      store.dispatch({type: 'ADD_USER', payload: {userName: 'fred', hometown: 'pittsburgh'}})
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()
      expect(WrapperUsers.text()).to.include('bob')
      expect(WrapperUsers.text()).to.include('fred')
  })

  it('adds a prop called primary user to the users component which is the first user in the store', () => {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      store.dispatch({type: 'ADD_USER', payload: {name: 'bob', hometown: 'philly'}})
      store.dispatch({type: 'ADD_USER', payload: {name: 'fred', hometown: 'pittsburgh'}})
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()

      expect(WrapperUsers.props().primaryUser).to.deep.equal({name: 'bob', hometown: 'philly'})
  });

})


// describe('UserInput', () => {
//   let store = configureStore()
//
//   it('has an text input for the user name field', () => {
//     const wrapper = shallow(<UserInput />)
//     expect(wrapper.find('input').first().type()).to.equal('input');
//   });
//
//   it('has an initial state with userName key set to empty string', () => {
//     const wrapper = shallow(<UserInput />)
//     expect(wrapper.state('userName')).to.equal('')
//   });
//
//   it('has an initial state with hometown key set to empty string', () => {
//     const wrapper = shallow(<UserInput />)
//     expect(wrapper.state('hometown')).to.equal('')
//   });
//
//   it('has changes the state of userName on a keydown in the userName input', () => {
//     const wrapper = shallow(<UserInput />)
//     expect(wrapper.state('userName')).to.equal('')
//     let input = wrapper.find('input').first()
//     input.simulate('change', { target: { value: 'Hello' } })
//     expect(wrapper.state('userName')).to.equal('Hello')
//   })
//
//   it('has changes the state of hometown on a keydown in the hometown input', () => {
//     const wrapper = shallow(<UserInput />)
//     expect(wrapper.state('hometown')).to.equal('')
//     let input = wrapper.find({type: 'text'}).last()
//     input.simulate('change', { target: { value: 'Hello' } })
//     expect(wrapper.state('hometown')).to.equal('Hello')
//   })
//
//   it('updates the store when the form is submitted', () => {
//     const wrapper = shallow(<UserInput store={configureStore()}/>)
//     expect(wrapper.state('hometown')).to.equal('')
//     let userNameInput = wrapper.find('input').first()
//     userNameInput.simulate('change', { target: { value: 'Bob' } })
//     let hometownInput = wrapper.find({type: 'text'}).last()
//     hometownInput.simulate('change', { target: { value: 'philly' } })
//     let form = wrapper.find('form').first()
//     form.simulate('submit',  { preventDefault() {} })
//     expect(store.getState()).to.deep.equal({users: [{name: 'Bob', hometown: 'philly'}]})
//   })
// });
