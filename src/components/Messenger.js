import React, { Component } from 'react';
import Users from "./Users";
import Profile from './Profile';
import Message from './Message';
//import FrontendApp from "../index"


class Messenger extends Component{
    keyEnter=(e)=>{
        //  function for set enter key on submit messages
        if (e.charCode === 13 || e.keyCode === 13){
            this.props.sendMessage();
          
        }}

    render () {
       
  return (
            <div id="block">
                     <div className="head"> 
                            <table className="right-side">
                        <tbody>
                            <tr>
                                <td>
                                <span role="img" aria-label="Edit" 
                                            title="Edit your profile" id="edit-profile"
                                            onClick={ this.props.editProfile }>
                                            ⚙
                                </span>
                                </td>
                                <td>
                                <span role="img" aria-label="Profile"
                                        title="Profile" id="profile"
                                        onClick={ this.props.showProfile }> 👨‍🔧
                                        <span id="counter"  title="Friends requests">
                                                    {     ( this.props.state.me && this.props.state.me.friends_requests ) ?
                                                        ( this.props.state.me.friends_requests.length ) :
                                                        ( <span>0</span> ) 
                                                    }
                        
                                        </span> 
                                </span>
                                </td>
                                <td>
                                        <button id="logout" onClick ={this.props.logout} >Log Out</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
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

                                 
                                   /> 
                        </div>
                        <div className="center" id="scroll">
                                 <Message state={ this && this.props.state}  
                                     updateData={this.props.updateData} 
                                     scrollUP ={this.props.scrollUP }
                                     profileChange={this.props.profileChange} />
                                
                            { !this.props.state.profile_edit &&
                            this.props.state.me &&
                                 this.props.state.me.friends && 
                            this.props.state.me.friends.some(
                                el => el === this.props.state.display
                            ) ?  (
                                <div id="inputMessage">  
                                { ( this.props.state.inform ) ?
                                (<label id="inform">{this.props.state.inform}</label>  )
                                 : null }
                                           
                                <input type="text" 
                                    placeholder="Your message"
                                    onChange={this.props.updateData} 
                                    id="message"
                                    name="message" 
                                    value={this.props.state.message}
                                    onKeyDown={ this.keyEnter }
                                />
                        
                            <span>
                                    <input type="submit" 
                                            id="message-submit"
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