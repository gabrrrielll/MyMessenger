import React from "react";

class Message extends React.Component {
 
  render() {
    function convertUNIX(input) {
      var time = new Date(input);
      return time.toLocaleTimeString();
      // time.toGMTString() + '\n' +
    }

    const setStyle = email => {
      
      if ( this.props.state.display.email === email) {
        return "oriented-left";
      } else {
        return "oriented-right";
      }
    };
    var salut = " Say hello to your new friend! 👋 ";

    return (
      <div>
        <div className="title">Conversations</div>
        <div id="conversation">
          {this.props.state.conversation.map((mes, index) => {
            return (
              <div key={index} id="message" className={setStyle(mes.email)}>
                <span id="text-mesage"> {
                    (mes.text === "") ?
                    salut : 
                    mes.text
                    } </span>
                <span className="time-message"> {convertUNIX(mes.time)}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Message;
