import React, { Component } from 'react';
import { connect } from 'react-redux'

export class Users extends Component {
  render(){
    let users = this.props.users.map(function(user){
      return <li>{user.userName}</li>
    })
    return(
        <div>
          <ul>
            {users}
          </ul>
        </div>
    )
  }
}


export const ConnectedUsers = connect(mapStateToProps)(Users)


function mapStateToProps(state){
  return {users: state.users, primaryUser: state.users[0]}
}
