import React, { Component } from 'react';
import Users from "./Users";
import Profile from './Profile';
import Message from './Message';

class Messenger extends Component{
    render () {
        //console.log(conv)
        
  return (
            <div id="block">
                    <div className="head"> 
                            <button id="logout" onClick ={this.props.logout} >Log Out</button>
                    </div>
                    <div className="box">
                        <div className="left"> 
                            <Users display={this.props.display}
                                  state={this.props.state} />
                        </div>
                        <div className="center" id="scroll">
                                 <Message state={this.props.state}  
                                     updateData={this.props.updateData}  />

                             <div id="inputMessage">
                                
                                        <input type="text" 
                                            placeholder="Your message"
                                            onChange={this.props.updateData} 
                                            id="message"
                                            name="message" />
                                
                                <span>
                                <input type="submit"
                                    className="message-submit"
                                    value="Send"
                                    onClick={  this.props.sendMessage } />
                            </span> 
                        </div>

                         </div>
                                <div className="right">
                                    <Profile state={this.props.state}/>
                         </div>
                        </div>
            </div>
              
        );
  }
  
};

export default Messenger;