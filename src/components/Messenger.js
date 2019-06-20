import React, { Component } from 'react';
import Users from "./Users";
import Profile from './Profile';
import Message from './Message';


class Messenger extends Component{
    render () {
      
    
       // this.props.users();
  return (
            <div id="block">
                    <div className="head"> 
                    <span role="img" aria-label="Edit" 
                            title="Edit your profile" id="edit-profile"
                         onClick={ this.props.editProfile }>
                                ⚙
                     </span>
                    <span role="img" aria-label="Profile"
                            title="Profile" id="profile"
                            onClick={ this.props.showProfile }> 👨‍🔧
                            <span id="counter"  title="Friends requests">
                                        {     (this.props.state.me.friends_requests ) ?
                                              ( this.props.state.me.friends_requests.length ) :
                                              ( <span>0</span> ) 
                                        }
                  {/*    {console.log ( "this.props.state.me.friends_requests",this.props.state.me.friends_requests) } */}
                    </span> 
                     </span>
                            <button id="logout" onClick ={this.props.logout} >Log Out</button>
                    </div>
                    <div className="box">
                        <div className="left"> 
                            <Users display={this.props.display}
                                  state={this.props.state}
                                  sendFriendRequest={this.props.sendFriendRequest}
                                  revokeFriendRequest={this.props.revokeFriendRequest}
                                  deniedFriendRequest={this.props.deniedFriendRequest}
                                  acceptFriendRequest={this.props.acceptFriendRequest}
                                  removeFriend={this.props.removeFriend}
                                  getTextFragment={this.props.getTextFragment}
                                   />
                        </div>
                        <div className="center" id="scroll">
                                 <Message state={this.props.state}  
                                     updateData={this.props.updateData}  />
                                   {/*   {console.log( "this.props.state.friend", this.props.state.friends)} */}

                            { this.props.state.me.friends && 
                            this.props.state.me.friends.some(
                                el => el === this.props.state.display
                            ) ?  (
                                <div id="inputMessage">               
                                <input type="text" 
                                    placeholder="Your message"
                                    onChange={this.props.updateData} 
                                    id="message"
                                    name="message" 
                                    value={this.props.state.message}
                                />
                        
                            <span>
                                    <input type="submit"
                                            className="message-submit"
                                            value="Send"
                                            onClick={  this.props.sendMessage }
                                    />
                            </span> 
                     </div>
                            ) : null }
                            

                         </div>
                                <div className="right">
                                    <Profile state={this.props.state}
                                        showProfile={this.props.showProfile}
                                        display={this.props.display}
                                        sendFriendRequest={this.props.sendFriendRequest}
                                        revokeFriendRequest={this.props.revokeFriendRequest}
                                        />
                         </div>
                        </div>
            </div>
              
        );
  }
  
};

export default Messenger;