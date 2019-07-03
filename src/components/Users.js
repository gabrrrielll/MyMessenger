import React, { Component } from "react";

class Users extends Component {
  state = { data: {} };
  
  render() {
    if ( !this.props.state.me ) return<h4><center>Loading...</center></h4>
    //console.log(this.sortFriends());

    var findUser = ( y ) =>{
          if( this.props.state.users ){
                var user =  this.props.state.users.find( el => el.email === y  ) ;
               // console.log(" find user->", user)
                return user
          }
    }

    var styleDisplay = email => {
      if (
        this.props.state.data &&
        this.props.state.data.find(el => el.userEmail === email) &&
        ( this.props.state.data.find(el => el.userEmail === email).seenTime <
          this.props.state.data.find(el => el.userEmail === email).message.time )
      ) {
        return null;
      } else {
        return "bold";
      }
    };
    var setClass = email => {
      if ( this &&
        this.props.state.data &&
        this.props.state.data.find(el => el.userEmail === email) &&
        ( this.props.state.data.find(el => el.userEmail === email).seenTime <
          this.props.state.data.find(el => el.userEmail === email).message.time )
      ) {
        return "user";
      } else {
        return "user-alert";
      }
    };

    var extractFragment = email => {
    
      if (
        this.props.state.data &&
        this.props.state.data.find(el => el.userEmail === email)
      ) {  // console.log(" this.props.state.data", this.props.state.data)
        return this.props.state.data.find(el => el.userEmail === email).message.text;
      } else {
        return "";
      }
    };

    return (
      <div className="users">
        <div className="title">Friends </div>
        { this.props.state.me && this.props.state.me.friends_requests &&
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
          
         
         {this && this.props.state.users &&
          this.props.state.me.friends && 
        this.props.state.me.friends.length > 0  ? (
          this.props.state.me.friends.map(email => {
            return (
              <div
                className={setClass(email)}
                onClick={() => this.props.display(email)}
                key={findUser(email) && findUser(email)._id}
              >
                <img
                  src={findUser(email) && findUser(email).photo}
                  alt={findUser(email) && findUser(email).username}
                />
                <span className="firstname">{findUser(email) && findUser(email).firstname} </span>
                <span className="lastname">{findUser(email) && findUser(email).lastname} </span>
                <div
                  className="message_fragment"
                  style={{ fontWeight: styleDisplay(email) }}
                >
                  {extractFragment(email)} 
                </div>
                <button
                  className="addFriend"
                  title="Remove friend"
                  onClick={() => this.props.removeFriend(email)}
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
        {this &&
          this.props.state.sugestions &&
          this.props.state.sugestions.map( user => {
            return (
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
            )
          })
          //exclude me and my allready friends from sugestions list
           // .filter(user => user.email !== this.props.state.me.email &&  user.email !== this.props.state.me.friends.find( email => email === user.email ))
          /*   .map(user => {
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
            }) */
          } 
      </div>
    );
  }
}

export default Users;
