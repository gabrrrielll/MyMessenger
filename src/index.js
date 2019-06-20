import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./index.css";
import Messenger from "./components/Messenger"
import LogIn from "./components/LogIn";
import Register from "./components/Register";
//import ReactInterval from 'react-interval';
import "./functions";


class FrontendApp extends React.Component {
  constructor() {
    super();
    
    var initialstate = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      rpassword: "",
      tel: "",
      photo: "",
      message: "",
      inform: "",
      myEmail: "",
      me: {},
      //messages: [],
      users: [],
      autentificate: true,
      authorized: false,
     // acces: false,
      display: "",
      conversation: [],
      requests: [],
      friends: [],
      sugestions: [],
      requestSent: [],
      participants: [],
      show: false,
      profile_edit: false,
      data: []
    };

    this.state = initialstate;
  
  }
  initialstat = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    rpassword: "",
    tel: "",
    photo: "",
    message: "",
    inform: "",
    //messages: [],
    myEmail: "",
    me: {},
    users: [],
    autentificate: true,
    authorized: false,
   // acces: false,
    display: "",
    conversation: [],
    requests: [],
    friends: [],
    sugestions: [],
    requestSent: [],
    show: false,
    participants: [],
    profile_edit: false,
    data: []
  };

  componentDidMount(){
    this.checkToken();
    this.users();
    
 } 

  users = () => {
      if (window.localStorage.getItem("token")) {
            axios.get("http://localhost:4000/users", {
              headers: {
                token: window.localStorage.getItem("token")
              }
            })
            .then(res => {
                 if ( res.data.me.friends.length > 0 ){
                          var friendsActivity = res.data.me.friends.sort(
                                  ( a, b ) => (a.last_activity < b.last_activity) ? 1 : ((b.last_activity < a.last_activity) ? -1 : 0)
                            ) 
                            //console.log("friendsActivity", friendsActivity)
                            var  emailFirst = friendsActivity[0]; 
                    } else{ 
                      emailFirst = res.data.users[0].email  
                     } 
                      this.getTextFragment( res.data.me.friends )
                      this.setState({
                          me: res.data.me,
                          sugestions: res.data.users,
                          display: emailFirst
                        
                          })
                          this.display(this.state.display);
                          this.scrollUP(); 
                         // console.log("s-a activat!")
            })
            .catch(err => {
              this.logout();
                console.log(err)
            })
        } else {
         // this.logout();
        }
  }
  getTextFragment = ( friends ) => {
      
        var data={};
        console.log( friends, " friends")
        if( friends !== undefined ){
              friends.map( email =>{
                
                        axios.get("http://localhost:4000/convfragment", {
                                    headers: {
                                      token: window.localStorage.getItem("token"),
                                      hisemail: email
                                    }
                                  })
                                  .then(res => {
                                    
                                          if ( res ===null ){
                                          
                                          console.log(" No data" )
                                              data = {
                                                        email: email,
                                                          wasSeen: false,
                                                          fragment : "" 
                                                        }
                                    
                                          } else{
                                          console.log( "res.data.data.messagesl, ", friends, res.data.wasSeen, res.data.fragment );
                                            data = {
                                                      email: email,
                                                      wasSeen: res.data.wasSeen,
                                                      fragment : res.data.fragment 
                                                    }
                                                    var newData=[...this.state.data, data]
                                                    this.setState({ data: newData })
                                
                                          }
                                
                                  })
                                  .catch(err => {
                                      console.log("Error in DB for display conversation", err)
                                        data = {
                                                  wasSeen:false,
                                                  fragment : "" 
                                                }
                                  
                                  })
                          
                                  return console.log("data", data)    
              })
                         
        }
  
  
 
}

updateData = (event) => {
    
    this.setState({
      [event.target.id]: event.target.value,
      inform: ""
    })
   
  }

changeForm =() =>{
    this.setState({ autentificate: !this.state.autentificate} );
  }

logout = () =>{
    window.localStorage.removeItem("token");
    this.setState( this.initialstat );
    //console.log( "this.initialstate", this.initialstat)
}
 scrollUP =()=> {
  var elmnt = document.getElementById("conversation");
  if ( elmnt !== null ){
    elmnt.scrollTop = elmnt.scrollHeight;
  }
  

}
showProfile = () => {
 
  this.setState( { show: !this.state.show } );
  this.display( this.state.me.email )
}

display = (email) =>{

    if ( this.state.profile_edit ) {
      this.setState( { profile_edit: false } )
    };
  axios.get("http://localhost:4000/conversation", {
    headers: {
      token: window.localStorage.getItem("token"),
      hisemail: email
    }
      })
      .then(res => {
        
              if ( res.data.data !==null ){
               
                this.setState({ 
                  display:  email,
                  conversation: res.data.data.messages,
                  participants: res.data.data.participants
                });
              } else{
                var conversation = [ {
                  text: "Conversations are allowed only between friends.",
                  email: this.state.me.email,
                  time: Date.now()
                }]
                this.setState({ 
                  display:  email,
                  conversation: conversation,
                  participants: []
                });
              }
              
          
         // console.log( "res.data.data.messagesl, ",res.data.data.messages, );
         
      })
      .catch(err => {
          console.log("Error in DB for display conversation", err)
         /*  var conversation = [ {
            text: "Conversations are allowed only between friends.",
            email: this.state.me.email,
            time: Date.now()
          }] */
          this.setState({ 
            display:  email,
            conversation: "nimic aici",
            participants: "nu sunt"
          });
          
      })
      //this.getTextFragment( email );
      this.scrollUP(); 
      

}
/* getTextFragment = ( email ) => {
  axios.get("http://localhost:4000/convfragment", {
            headers: {
              token: window.localStorage.getItem("token"),
              hisemail: email
            }
      })
      .then(res => {
        
              if ( res ===null ){
               
               console.log(" No data" )
               var   data = {
                wasSeen: false,
                fragment : "" 
              }
              return(<div>Nimic!</div> )
              } else{
               console.log( "res.data.data.messagesl, ", email, res.data.wasSeen, res.data.fragment );
                data = {
                  wasSeen: res.data.wasSeen,
                  fragment : res.data.fragment 
                }
                return data
              }
         
      })
      .catch(err => {
          console.log("Error in DB for display conversation", err)
            var data = {
            wasSeen:false,
            fragment : "" 
          }
          return(<div>Nimic!</div> )
      })
        
} */
setConversationSeen = ( email ) =>{
alert("apelare setConversationSeen")
  axios.get("http://localhost:4000/setconversationseen", {
    headers: {
      token: window.localStorage.getItem("token"),
      hisemail: email
    }
      })
      .then(res => {
        console.log( "setConversationSeen   ->  res.data: ", res.data  );
     
      })
      .catch(err => {
          console.log(err)
      })


}
sendMessage = ( ) =>{
console.log(" toUserEmail",  this.state.message );
  if( this.state.message === "" ) return; 
   axios.post("http://localhost:4000/addmessage", {
    
      token: window.localStorage.getItem("token"),
      hisemail: this.state.display,
      message: this.state.message
    
      })
      .then(res => {
          console.log( "res.data: ", res.data  );
        this.display(this.state.display);
        this.setState( { message: "" })
        this.scrollUP(); 
      
        
      })
      .catch(err => {
          console.log(err)
      }) 
      this.scrollUP(); 
      
}
tryRegister = () => { 
  if ( this.state.rpassword !== this.state.password ) {
      this.setState({ inform:  "Passwords don't match!"})
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
      this.setState({ inform:  response.data.inform })
    })
    .catch((err) => {
      this.setState({ inform:  err.response.data.inform  })
      console.log(err)
    })
} 

tryLogin = () => {
    
  axios.post('http://localhost:4000/login', {
    email: this.state.myEmail,
    password: this.state.password
  })
    .then((response) => {
      this.secretToken = response.data.token;
      window.localStorage.setItem("token", response.data.token);
      console.log("response.data", response.data)
       this.setState({
         authorized: true,
         inform: response.data.inform
      }) 
      this.users();
    })
    .catch((err) => {
      this.setState({ inform: "Wrong combination or email invalidate!"})
      console.log(err)
      this.setState({
        inform: "Error!"
     }) 
    })
}
sendFriendRequest = (email) => {
  
   axios.post("http://localhost:4000/sendfriendrequest",{
     token: window.localStorage.getItem("token"),
     email_target: email
   })
   .then(response => {
      console.log("response.data.requestSentEmail", response.data );
     
       this.users();
   })
   .catch(error => {
     console.log(error, "eroare la accesare")
   });
   
}
revokeFriendRequest = (email) => {
  
   axios.post("http://localhost:4000/revokefriendrequest",{
     token: window.localStorage.getItem("token"),
     email_target: email
   })
   .then(response => {
    console.log("response.data.revokefriendrequest", response.data );
       this.users();
 
   })
   .catch(error => {
     console.log(error, "eroare la accesare")
   });
}
deniedFriendRequest = (email) => {
  
  axios.post("http://localhost:4000/deniedfriendrequest",{
    token: window.localStorage.getItem("token"),
    email_target: email
  })
  .then(response => {

      this.users();

  })
  .catch(error => {
    console.log(error, "eroare la accesare")
  });
}
acceptFriendRequest = (email) => {
        console.log(email);
         axios.post("http://localhost:4000/acceptfriendrequest",{
           token: window.localStorage.getItem("token"),
           email_target: email
               })
            .then( response => {
      console.log("response", response)
               
                   this.users();
           }) 
            .catch(error => {
               console.log(error, "eroare la accesare")
           }); 
           
 }

 removeFriend =(email) =>{
   alert("You will delete this user from your friends list. Are you sure?")
   axios.post("http://localhost:4000/removefriend",{
        token: window.localStorage.getItem("token"),
        email_target: email
      })
      .then(response => {
       console.log(" response",  response)
    
              this.users();
       
      })
      .catch(error => {
        console.log(error, "eroare la accesare")
      });
     
  }
editProfile=()=>{
  this.setState( { profile_edit: !this.state.profile_edit } )
}
checkToken = ()=>{

      axios.post("http://localhost:4000/checkToken",{
          token: window.localStorage.getItem("token")
        })
        .then(response => {
     
          this.setState( { authorized: response.data.authorized})
        })
        .catch(error => {
          console.log(error, "DB acces error")
        });
        
} 



render() {
 

    if ( this.state.authorized ){
     // this.reload(); 
        return( 
          <Messenger 
                logout ={this.logout}
                display={this.display}
                state={this.state}
                updateData={this.updateData} 
                sendMessage={this.sendMessage}
                sendFriendRequest={this.sendFriendRequest}
                revokeFriendRequest={this.revokeFriendRequest}
                deniedFriendRequest={this.deniedFriendRequest}
                acceptFriendRequest={this.acceptFriendRequest}
                removeFriend={this.removeFriend}
                showProfile={ this.showProfile }
                editProfile={ this.editProfile }
                getTextFragment={ this.getTextFragment }
                //users={this.users}
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
