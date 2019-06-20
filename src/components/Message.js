import React from "react";
import ProfileEdit from "./ProfileEdit";

class Message extends React.Component {
 
  render() {
    function convertUNIX(input) {
      var time = new Date(input);
      return time.toLocaleTimeString();
      // time.toGMTString() + '\n' +
    }

    const setStyle = email => {
      
        if ( this.props.state.me.email !== email) {
            return "oriented-left";
        } else {
            return "oriented-right";
        }
    };
    if( this &&  this.props.state.participants !== null  ){
        var seenTime = this.props.state.participants[0] &&
        this.props.state.participants.find( el => el.email !== this.props.state.me.email ).seen
        /* console.log("888888---:", this.props.state.participants[0] &&
        this.props.state.participants.filter( el => el.email !== this.props.state.me.email )[0].seen) */
    } else {
         seenTime = null;
    }
   
    if(this.props.state.profile_edit){
      return (
      <div className="edit-profile">
            <ProfileEdit
               state={this.props.state} /> 
      </div>
       
      );
     }

    return (
      <div>
        <div className="title">Conversations</div>
        <div id="conversation">
          { this.props.state.conversation.map((mes, index) => {
            return (
              <div key={index} id="message" className={ setStyle(mes.email) }>
                    { <span id="text-mesage"> { mes.text }  </span> }
                    
                    { ( mes.time >= seenTime ) ?
                    ( <span role="img" aria-label="Check unseen" title="Message useen"> ✔</span> ) : 
                    (  <img src="https://www.clipartmax.com/png/full/51-513171_seen-whatsapp-vector.png"
                    alt="seen" title="Message seen" width="20" /> )  } 
                        
                    <span className="time-message"> { convertUNIX(mes.time) }</span>
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}

export default Message;
