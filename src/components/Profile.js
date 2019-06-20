import React, { Component } from 'react';


class Profile extends Component {
    render() {
        var user = this.props.state.sugestions.find( el => (el.email ===this.props.state.display) ) ;
         
        if (user === undefined) {
           return <h3>Please select a user</h3>
        } 

        function convertUNIX(input) {
            var time = new Date(input);
           // return time.toLocaleTimeString();
            return time.toLocaleDateString() + '\n' +time.toLocaleTimeString();
          }

          var findUser = ( y ) =>{
            var user = this.props.state.sugestions.find( x => x.email === y );
            return user
        }
        
        return ( 
            <div className="profile">
                 { (this.props.state.me.friends_requests.length > 0 ) ?
                            ( <div className="alert-inform" 
                                    onClick={ this.props.showProfile } >
                                     <span role="img" aria-label="Notification" 
                                     title="Notification"  >
                                     🔔
                                     </span>
                                    You have { this.props.state.me.friends_requests.length  } friendship requests !
                             </div>
                             ) 
                         : null
                     }  
                   <div className="title">Profile</div>
                  
                   { (Date.now() - user.last_activity < 120000 ) ?
                     ( <div className="last-activity">
                         <span id="online-bullet">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Button_Icon_Green.svg/768px-Button_Icon_Green.svg.png"
                                alt="Online" title="Online"/>
                     </span>
                             Online 
                        </div> ): 
                    (<div className="last-activity">
                         Last activity:  {convertUNIX(user.last_activity)}
                    </div>)}
                 
                    <div className="name">
                         {user.firstname} {user.lastname}
                       
                    </div>
                
                    <img src={ user.photo } alt={ user.email } />
                    <div className="tel">
                         Phone: { user.tel }
                    </div>
                    <div className="email">
                        Email: { user.email }
                    </div>  
                    <div className="his-friends">
                    <div className="title">User's friends</div>
                        {  user.friends && 
                        user.friends
                        .filter( em => em !== this.props.state.me.email )
                        .map( email =>
                            {
                                return (
                                    <div
                                      className="user"
                                      onClick={() => this.props.display(email)}
                                      key={findUser(email)._id}
                                    >
                                          <img className="friend-photo" src={ findUser(email).photo} alt={findUser(email).username} />
                                          <span className="firstname">{findUser(email).firstname} </span>
                                          <span className="lastname">{findUser(email).lastname} </span>
                                          { ! this.props.state.me.requests_sent.some( el => el === user.email  ) ? 
                                                    (
                                                        <span className="addFriend">
                                                        <button
                                                                title="Send friendship request"
                                                                onClick={() => this.props.sendFriendRequest(user.email) }
                                                        >
                                                            Send
                                                        </button>
                                                        </span>
                                                    ) : 
                                                    (
                                                        <span className="addFriend">
                                                        <button
                                                                title="Revoke friendship request"
                                                                onClick={() => this.props.revokeFriendRequest(user.email) }
                                                        >
                                                            x
                                                        </button>
                                                        </span>
                                                    )
                                                }
                                    </div>
                                  );
                            })}
                    </div>
                   
            </div>
        );
    }
}

export default Profile;