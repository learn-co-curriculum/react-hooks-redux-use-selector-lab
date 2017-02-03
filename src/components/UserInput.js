import React, { Component } from 'react';
import addUser from '../actions/users'

class UserInput extends Component {
  constructor(props){
    super(props)
    this.state = {userName: '', hometown: ''}
  }
  handleOnUserNameChange(event){
    this.setState({userName: event.target.value})
  }
  handleOnHometownChange(event){
    this.setState({hometown: event.target.value})
  }
  handleOnSubmit(event){
    event.preventDefault()
    
    this.props.store.dispatch(addUser(this.state))
  }
  render(){
    return(
      <form onSubmit={this.handleOnSubmit.bind(this)}>
      <p>
        <input type="text" onChange={this.handleOnUserNameChange.bind(this)} placeholder="user name"/>
      </p>
      <p>
        <input type="text" onChange={this.handleOnHometownChange.bind(this)} placeholder="hometown"/>
      </p>
        <input type="submit" />
      </form>
    )
  }
}

export default UserInput;
