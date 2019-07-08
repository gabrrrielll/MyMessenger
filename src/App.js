
    import React, { Component } from "react";
    import socketIOClient from "socket.io-client";
    class App extends Component {
      constructor() {
        super();
        this.state = {
          response: false,
          endpoint: "http://192.168.1.107:4000",
          messages: [],
          status: ""
        };
      }
      componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        this.setState({
          socket
        })
        socket.on("blabla", data => {
          this.setState({ response: data })
          console.log('a ajuns informatia')
        });
        socket.on("message", data => {
          this.setState(state => {
            state.messages.push(data);
            return state;
          })
        })
        socket.on("register", data => {
          this.setState({status: "register" + data});
        });
        socket.on("login", data => {
          this.setState({status: "login" + data});
        });
      }
      updateMessage =(e) => {
        this.setState({
          message: e.target.value
        })
      }
      updateData =(e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
      tryRegister = () => {
        this.state.socket.emit("register", {
          username: this.state.username, 
          password: this.state.password});
      }
      tryLogin = () => {
        this.state.socket.emit("login", {
          username: this.state.username, 
          password: this.state.password});
    
      }
      sendMessage = () => {
        this.state.socket.emit("message", this.state.message)
      }
      render() {
        const { response } = this.state;
        return (
          <div style={{ textAlign: "center" }}>
            <div>
              <input onChange={this.updateData} id="username"/>
              <input onChange={this.updateData} id="password"/>
              <button onClick={this.tryRegister}>Register</button>
              <button onClick={this.tryLogin}>Login</button>
              <h3>{this.state.status}</h3>
            </div>
            {response
              ? <div>
                Informatia de la server: {response}
              </div>
              : <div>Asteapta...</div>}
              <input onChange={this.updateMessage}/>
              <button onClick={this.sendMessage}>Send message</button>
              <button onClick={() => this.state.socket.emit("auth", "20")}>Auth me</button>
            {
              this.state.messages.map(x => {
                return (
                  <div style={{ border: "2px solid black" }}>
                    {x}
                  </div>
                )
              })
            }
            
          </div>
        );
      }
    }
    export default App;
