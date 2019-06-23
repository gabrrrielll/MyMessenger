import React, { Component } from "react";

class Users extends Component {
  state = { data: {} };
  
  render() {
    //console.log(this.sortFriends());

    var findUser = y => {
      var user = this.props.state.sugestions.find(x => x.email === y);
      return user;
    };

    var styleDisplay = email => {
      if (
        this.props.state.data &&
        this.props.state.data.find(el => el.email === email) &&
        this.props.state.data.find(el => el.email === email).wasSeen
      ) {
        return null;
      } else {
        return "bold";
      }
    };
    var setClass = email => {
      if (
        this.props.state.data &&
        this.props.state.data.find(el => el.email === email) &&
        this.props.state.data.find(el => el.email === email).wasSeen
      ) {
        return "user";
      } else {
        return "user-alert";
      }
    };

    var extractFragment = email => {
      if (
        this.props.state.data &&
        this.props.state.data.find(el => el.email === email)
      ) {
        return this.props.state.data.find(el => el.email === email).fragment;
      } else {
        return "";
      }
    };

    return (
      <div className="users">
        <div className="title">Friends </div>
        {this.props.state.me.friends_requests &&
          this.props.state.show &&
          this.props.state.me.friends_requests.map(email => {
            return (
              <div
                className="user request"
                onClick={() => this.props.display(email)}
                key={findUser(email)._id}
              >
                <img
                  src={findUser(email).photo}
                  alt={findUser(email).username}
                />
                <span className="firstname">{findUser(email).firstname} </span>
                <span className="lastname">{findUser(email).lastname} </span>
                <button
                  className="addFriend"
                  onClick={() => this.props.acceptFriendRequest(email)}
                  name="Accept friend "
                  title="Accept friendship request "
                >
                  <span role="img" aria-label="Check">
                    ✅ ?
                  </span>
                </button>
                <button
                  className="addFriend"
                  onClick={() => this.props.deniedFriendRequest(email)}
                  name="Denied friendship request"
                  title="Denied friendship request"
                >
                  <span role="img" aria-label="Delete">
                    ❌
                  </span>
                  ?
                </button>
              </div>
            );
          })}
          
         
        { this.props.state.friends.length > 0  ? (
          this.props.state.friends.map( user => {
            return (
              <div 
                className={setClass(user.email)}
                onClick={() => this.props.display(user.email)}
                key={user._id}
              >
                <img
                  src={user.photo}
                  alt={user.username}
                />
                <span className="firstname">{user.firstname} </span>
                <span className="lastname">{user.lastname} </span>
                <div
                  className="message_fragment"
                  style={{ fontWeight: styleDisplay(user.email) }}
                >
                  {extractFragment(user.email)} 
                </div>
                <button
                  className="addFriend"
                  title="Remove friend"
                  onClick={() => this.props.removeFriend(user.email)}
                >
                  <span role="img" aria-label="Delete">
                    ❌
                  </span>
                </button>
              </div>
            );
          })
        ) : (
          <center> You don't have friends yet </center>
        ) }

        <div className="title">Sugestions</div>
        {this.props.state.sugestions &&
          this.props.state.sugestions
            .filter(user => user.email !== this.props.state.me.email)
            .map(user => {
              return this.props.state.me.friends.some(
                el => el.email === user.email
              ) ? null : (
                <div
                  className="user"
                  onClick={() => this.props.display(user.email)}
                  key={user._id}
                >
                  <img src={user.photo} alt={user.username} />
                  <span className="firstname">{user.firstname} </span>
                  <span className="lastname">{user.lastname} </span>

                  {!this.props.state.me.requests_sent.some(
                    el => el === user.email
                  ) ? (
                    <button
                      className="addFriend"
                      title="Send friendship request"
                      onClick={() => this.props.sendFriendRequest(user.email)}
                    >
                      Send
                    </button>
                  ) : (
                    <button
                      className="addFriend"
                      title="Revoke friendship request"
                      onClick={() => this.props.revokeFriendRequest(user.email)}
                    >
                      x
                    </button>
                  )}
                </div>
              );
            })}
      </div>
    );
  }
}

export default Users;
