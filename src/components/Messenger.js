import React, { Component } from 'react';
import Users from "./Users";
import Profile from './Profile';

class Messenger extends React.Component{
    render () {
  return (
            <div id="block">
                
                    <div className="head">
                        
                            <button id="logout" onClick ={this.props.logout} >Log Out</button>
                        
                    </div>
                    <div className="box">
                        <div className="left"> 
                            <Users display={this.props.display} />
                        </div>
                        <div className="center"> continut </div>
                        <div className="right">
                            <Profile state={this.props.state}/>
                         </div>
                    </div>
                
            </div>
              
        );
  }
  
};

export default Messenger;