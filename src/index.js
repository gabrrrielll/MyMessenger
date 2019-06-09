import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./index.css";
import Messenger from "./components/Messenger"
import LogIn from "./components/LogIn";
import Register from "./components/Register";


class FrontendApp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      rpassword: "",
      tel: "",
      photo: "",
      message: "",
      messages: [],
      users: [],
      autentificate: true,
      authorized: false,
      acces: false,
      display: "",
      conversation: [],
      requests: [],
      friends: [],
      sugestions: [],
      requestSent: []
    };
  
  }
  componentDidMount() {
    if (window.localStorage.getItem("token")) {
      axios.get("http://localhost:4000/users", {
        headers: {
          token: window.localStorage.getItem("token")
        },
        //to do---cum sa transmitem mailul personal?
        body: { email: "allmediacreation@gmail.com"}
      })
      .then(res => {
         // console.log(res.data);
        var  friendsActivity = res.data.friends.sort(
            ( a, b ) => (a.last_activity < b.last_activity) ? 1 : ((b.last_activity < a.last_activity) ? -1 : 0)
           )
        this.setState({
            requests: res.data.requests,
            friends: friendsActivity,
            sugestions: res.data.sugestions,
            requestSent: res.data.requestSent ,
            display: friendsActivity[0].email
          
        })
        this.display( friendsActivity[0].email );
      })
      .catch(err => {
          console.log(err)
      })
    } 
  }
updateData = (event) => {
    
    this.setState({
      [event.target.id]: event.target.value,
     // message: ""
    })
  }

changeForm =() =>{
    this.setState({ autentificate: !this.state.autentificate} );
  }

logout = () =>{
    window.localStorage.removeItem("token");
    this.setState({ authorized: false });
}
 scrollUP =()=> {
  var elmnt = document.getElementById("conversation");
  elmnt.scrollTop = elmnt.scrollHeight;

}
display = (email) =>{

  axios.get("http://localhost:4000/conversation", {
    headers: {
      token: window.localStorage.getItem("token"),
      hisemail: email
    }
      })
      .then(res => {
          //console.log( "res.data: ", res.data  );
        this.setState({ 
          display:  email,
          conversation: res.data.data.messages
        });
        this.scrollUP();
      })
      .catch(err => {
          console.log(err)
      })


}

displayLast = () =>{

  axios.get("http://localhost:4000/lastconversation", {
    headers: {
      token: window.localStorage.getItem("token")
    }
      })
      .then(res => {

          console.log( "res.data: ", res.data  );
       /*  this.setState({ 
          display:  lastUser,
          conversation: res.data.lastMessages
        }); */
        this.scrollUP();
      })
      .catch(err => {
          console.log(err)
      })


}
sendMessage = ( ) =>{
console.log(" toUserEmail",  this.state.message );
  if( this.state.message === "" ) return; 
   axios.post("http://localhost:4000/addMessage", {
    
      token: window.localStorage.getItem("token"),
      hisemail: this.state.display,
      message: this.state.message
    
      })
      .then(res => {
          console.log( "res.data: ", res.data  );
        this.display(this.state.display);
        
      })
      .catch(err => {
          console.log(err)
      }) 
}
tryRegister = () => { 
  if (this.state.rpassword !== this.state.password) {
    this.setState({message:  "Parolele nu coincid"})
    return;
  }
  axios.post('http://localhost:4000/register', {
    username: this.state.username,
    email: this.state.email,
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    password: this.state.password,
    tel: this.state.tel,
    photo: this.state.photo
  })
    .then((response) => {
      console.log(response)
      this.setState({message:  "Register with succes! Now you have to click the link received in your mail to activate the account." })
    })
    .catch((err) => {
      this.setState({message:  "Please provide all data for register process" })
      console.log(err)
    })
} 

tryLogin = () => {
    
  axios.post('http://localhost:4000/login', {
    email: this.state.email,
    password: this.state.password
  })
    .then((response) => {
      this.secretToken = response.data.token;
      window.localStorage.setItem("token", response.data.token);
      //alert("You have successfully logged in!")
       this.setState({
        authorized: true
      }) 
    })
    .catch((err) => {
      this.setState({message: "Wrong combination or email invalidate!"})
      console.log(err)
    })
}


render() {
    if (! this.state.authorized ){
        return( 
          <Messenger 
                logout ={this.logout}
                display={this.display}
                state={this.state}
                updateData={this.updateData} 
                sendMessage={this.sendMessage}
             />
        )

    } else {
      if ( this.state.autentificate ){  
          return ( 
            <div>
              <LogIn 
                    updateData={this.updateData}
                    state={this.state}
                    tryLogin={this.tryLogin} 
                    changeForm={this.changeForm}
                />
            </div>    
          )
    } else {
          return (<div>  
            <Register 
                updateData={this.updateData} 
                state={this.state} 
                tryRegister={this.tryRegister} 
                changeForm={this.changeForm} 
            /></div>  
        );
      }

    }
   
    
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<FrontendApp />, rootElement);
