import React from "react";
import ProfileEdit from "./ProfileEdit";
import  Info from "./Info"

class Message extends React.Component {
  state = {
    query: '',
    results: []
  }
  componentWillReceiveProps(){
      //scroll up the consversation
      this.props.scrollUP(); 
  }
  handleInputChange = () => {
    this.setState({
      query: this.search.value.toLowerCase()
    })
  }
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

    if( this &&  this.props.state.participants !== null  && this.props.state.participants ){
        var seenTime = this.props.state.participants[0] &&
        this.props.state.participants.find( el => el.email !== this.props.state.me.email ).seen
        /* console.log("888888---:", this.props.state.participants[0] &&
        this.props.state.participants.filter( el => el.email !== this.props.state.me.email )[0].seen) */
    } else {
         seenTime = null;
    }

    if( this.props.state.profile_edit ){
      return (
      <div className="edit-profile">
            <ProfileEdit
               state={this.props.state} 
               updateData={this.props.updateData} 
               profileChange={this.props.profileChange}/> 
      </div>
       
      );
     }
     if(  this && !this.props.state.conversation /* && this.props.state.conversation.length ===1 */ ){
      return (
      <div className="edit-profile">
            <Info  state={this.props.state} />
      </div>
       
      );
     }
    
    return (
      <div id="intermediate">
    
        <input
          placeholder=" 🔍  Search for messages... "
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          style={{width: "100%", padding:"4px 10px", backgroundColor: this.props.state.me.color+"52" }}
        />
            <div className="title">Conversations</div>
        <div id="conversation">
     
          { this.props.state.conversation &&
           this.props.state.conversation.map((mes, index) => {
            if (mes.text.toLowerCase().includes( this.state.query ) ){
           
                  return (
                        <div key={index} id="message" className={ setStyle(mes.email) }>
                              { <span id="text-mesage"
                              
                                style={ mes.email !== this.props.state.me.email ?
                                  ( { backgroundColor: this.props.state.me.color+"bd" } ): null
                                 } > { mes.text }  </span> }
                              
                              { (mes.email === this.props.state.me.email) ?
                              ( ( mes.time >= seenTime ) ?
                              ( <span role="img" aria-label="Check unseen" title="Message useen"> ✔</span> ) : 
                              (  <img src="https://www.clipartmax.com/png/full/51-513171_seen-whatsapp-vector.png"
                              alt="seen" title="Message seen" width="16" /> ) ) :
                              null
                                
                                  } 
                                  
                              <span className="time-message"> { convertUNIX(mes.time) }</span>
                        </div>
                  );
           } else return null;
          }) }
        </div>
      </div>
    );
    
  }
 
}

export default Message;
