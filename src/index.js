import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./index.css";
import Messenger from "./components/Messenger"
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import socketIOClient from "socket.io-client";
//import ReactInterval from 'react-interval';
import "./functions";


var  socket= null;
class FrontendApp extends React.Component {
  constructor() {
    super();
    
     this.initialstate = {
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
      me: "",
      users: [],
      autentificate: true,
      authorized: false,
      display: "",
      conversation: [],
      requests: [],
      friends: [],
      sugestions: [],
      requestSent: [],
      participants: [],
      show: false,
      profile_edit: false,
      data: [],
      response: false,
      endpoint: 'http://localhost:4001'
    };

    this.state = this.initialstate;
  
  }




 componentWillMount(){
  

  //var token = window.localStorage.getItem("token");
  //console.log("token--------------", token )
 /// socket.on("conversationAPI"+ token, data => this.setState({ conversation: data.messages, participants:data.participants}  , 
  // console.log("conversationAPI: ",data) ));
/*   if( this.state.users && 
    this.state.sugestions &&
    this.state.me &&
    this.state.friends &&
    this.state.users.length < 1 ){
    var users = [ ...this.state.sugestions, this.state.me, this.state.friends ]
    this.setState( { users: users })
    console.log("new Users", users)
   } */

  //first time load all users from db
//  this.users(); 


}

loadData=( myEmail )=>{
  var token = window.localStorage.getItem("token");
  if ( myEmail === "" && token ){
    this.logout();
  }
    if( !token ){
      return
    }    
   // const socket = socketIOClient( this.state.endpoint );
   socket = socketIOClient(this.state.endpoint);
          socket.on("usersAPI"+ myEmail, users => {
            
                var me = users.find( el => el.email === myEmail )
                var sugestions =me && users.filter( user => user.email !== me.email )
                .filter( el => el.email !== me.friends.find( email=> email === el.email ))
                .filter( elem => elem.email !== me.friends_requests.find( email=> email === elem.email ))
                .sort((a, b) => {
                  if (a.last_activity > b.last_activity) {
                      return -1;
                  } else if (a.last_activity < b.last_activity) {
                      return 1;
                  }
                  return 0;
                })
                var friends = me &&users.filter( friend => friend.email === me.friends.find( email=> email === friend.email ))
                .sort((a, b) => {
                  if (a.last_activity > b.last_activity) {
                      return -1;
                  } else if (a.last_activity < b.last_activity) {
                      return 1;
                  }
                  return 0;
                })
        
            this.setState({ users , me , sugestions , friends }  ,
              /*   console.log("users received: ",users) */  )} );


         /*  socket.on("meAPI" + token, me => this.setState({ me: me }  , 
                    console.log("me: ", me )   )); */
          
          socket.on("fragmentAPI"+ myEmail, data => this.setState({ data: data }  
              /*   console.log("data: ",data)  */ ));
                

           socket.on("conversationAPI"+ myEmail, data => this.setState({ conversation: data.messages, participants:data.participants}  
                /*   console.log("conversationAPI: ",data)  */)); 
 
}
componentDidMount() {
  
  this.checkToken( this.state.myEmail );

 
} 
  users = () => {
  
      if (window.localStorage.getItem("token")) {
            axios.get("http://localhost:4000/users", {
              headers: {
                token: window.localStorage.getItem("token")
              }
            })
            .then(res => {
            //this situation is when load only sugestions without friends
                 if ( res.data.me.friends.length === 0 ){
                  
                            if( !this.state.display){
                              console.log("nu este display!")
                              this.setState ( { display:  res.data.users[0].email} )
                            }
                 
                     } 
                     this.setState({
                     // me: res.data.me,
                      //sugestions: res.data.users,
                     // info: true,
                      loaded: true
                    
                      })
                  
                      
                      // this.display(this.state.display )

                       
            })
            .catch(err => {
              this.logout();
                console.log(err)
            })
        } else {
         // this.logout();
        }
       
  }
  display = (email) =>{
   // console.log("display-->email: ", email)
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
                   //console.log( "res.data.data.messages", res.data.data.messages)
                    this.setState({ 
                     display:  email,
                      //conversation: res.data.data.messages,
                      //participants: res.data.data.participants
                    });
              
                  } else{
                    var conversation = [ {
                      text: "Conversations are allowed only between friends :)).",
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
       
              this.setState({ 
                display:  email,
                conversation: [],
                participants: []
              });
              
          })
          //this.getTextFragment( email );
          this.scrollUP(); 
       
         
    
    }
  getTextFragment = ( ) => {
      
        var data={};
       console.log( data, " data ptr extragere fragment")
        if( this.state.me.friends !== undefined ){
              this.state.me.friends.map( email =>{
                
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
                                             this.setState({ data: data })
                                    
                                          } else{
                                          console.log( "res.data.data.messagesl, ", res.data.wasSeen, res.data.fragment );
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
                                      console.log("Error in DB for extract messages fragments", err)
                                        data = {
                                                  wasSeen:false,
                                                  fragment : "" 
                                                }
                                                this.setState({ data: data })
                                  
                                  })
                          
                                  return  data  
              })
                         
        }
  
  
 
}

updateData = (event) => {
    
    this.setState({
      [event.target.id]: event.target.value,
      inform: ""
    })
   
  }
profileChange = () =>{
        if ( this.state.firstname ){
          var firstname = this.state.firstname
        } else {
          firstname = this.state.me.firstname
        }
        if ( this.state.lastname ){
          var lastname = this.state.lastname
        } else {
          lastname = this.state.me.lastname
        }
        if ( this.state.tel ){
          var tel = this.state.tel
        } else {
          tel = this.state.me.tel
        }
        if ( this.state.photo ){
          var photo = this.state.photo
        } else {
          photo = this.state.me.photo
        }
      axios.post("http://localhost:4000/changeprofile",{
       
        token: window.localStorage.getItem("token"),
        firstname: firstname,
        lastname: lastname,
        original_pass: this.state.password,
        new_pass: this.state.rpassword,
        tel: tel,
        photo: photo
      })
      .then( response => {
        //this.users();
            console.log(" response",  response)
           
             if (this.state.me.email){
              this.setState( {
                 inform: response.data.inform,
                display: this.state.me.email
               })
            } 
           
      })
      .catch(error => {
            console.log(error, "eroare la accesare")
            this.setState( { inform: "Old password didn't match!"})
      });
}
changeForm =() =>{
    this.setState({ autentificate: !this.state.autentificate} );
  }

logout = () =>{

        /* axios.post("http://localhost:4000/stopdata",{
          token:  window.localStorage.getItem("token"),
          stop: true
        })
        .then(res => {
          console.log( "response stop load data:", res )
          

        })
        .catch(err => {
            console.log("Error in DB for stop load data", err)
            
          
        })
     */
        //socket.on= null;
        window.localStorage.removeItem("token");
      this.setState( this.initialstate );

}
 scrollUP =()=> {
  // console.log("acum scrollUP")
      var elmnt = document.getElementById("conversation");
      if ( elmnt !== null ){
        elmnt.scrollTop = elmnt.scrollHeight;
      }
  

}
showProfile = () => {
  this.setState( {
     show: !this.state.show ,
     display: this.state.me.email 
    } );

  
}
editProfile=()=>{
  if (this.state.me && this.state.display === this.state.me.email){
              if (this.state.friends && this.state.friends.length > 0){
                var dis = this.state.friends[0].email
              } else {
                dis = this.state.sugestions[0].email
              }   
  } else{
    dis = this.state.me.email
  }
  this.setState( {
   
     profile_edit: !this.state.profile_edit ,
     display: dis,
     inform: ""
    } )
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
         // console.log( "res.data: ", res.data  );
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
      //console.log("response.data", response.data)
       this.setState({
         authorized: true,
         inform: response.data.inform
      }) 
     
     this.checkToken( this.state.myEmail );
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
      //console.log("response.data.requestSentEmail", response.data );
      //this.setState( { display: email } )
     // this.users();  

      
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
      // this.users();
 
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
console.log(response)
    //  this.users();

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
               
                   //this.users();
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
    
             // this.users();
       
      })
      .catch(error => {
        console.log(error, "eroare la accesare")
      });
     
  }

checkToken = ( myEmail )=>{
 // console.log("this.checkToken(); ........." )
      axios.post("http://localhost:4000/checkToken",{
          token: window.localStorage.getItem("token")
        })
        .then(response => {
          console.log("check Token response OK!")
          this.setState( { authorized: response.data.authorized })
          
          this.loadData( myEmail );
        })
        .catch(error => {
          console.log(error, "DB acces error")
        });
        
} 

sortFriends = () => {
  if (this.state.me.friends) {
            return this.state.users.filter((friend) => {
                var exist = this.state.me.friends.some(email => email === friend.email);
                return exist;
            }).sort((a, b) => {
              if (a.last_activity > b.last_activity) {
                  return -1;
              } else if (a.last_activity < b.last_activity) {
                  return 1;
              }
              return 0;
            })


  } else {
          return []
  }
};
sortSugestions=()=>{
  if( this.state.me.friends && this.state.users ){
        return this.state.users.filter(user => 
          user.email !== this.state.me.friends.find( el => el === user.email )
        )
        .filter( x => x.email !== this.state.me.email )

   }
}
/*  
 componentWillReceiveProps(){

  if ( this.state.friends && 
    this.state.friends !== undefined && 
    this.state.me.friends &&
    this.state.me.friends.length > 0 ){
      if (JSON.stringify(this.state.friends) !== JSON.stringify(this.sortFriends())) {
        
        this.setState({ friends: this.sortFriends() })
        console.log(" s-a activat functia de sortare prieteni din componentDidUpdate ", this.state.me.friends[0].email )
        this.display( this.sortFriends()[0].email )
      }
} 
if(this.state.users && this.state.sugestions){
console.log(" s-a activat sortarea sugestiilor");
    if (JSON.stringify(this.state.sugestions) !== JSON.stringify(this.sortSugestions())) {
            console.log(" s-a activat functia de sortare sugestii din componentDidUpdate ")
            this.setState({ sugestions: this.sortSugestions() })
            if( this.state.me.friends && this.state.me.friends.length === 0 ){
                  this.display( this.sortSugestions()[0].email )
            }
    }
} 
    
}
 
 */
render() {

/*   if(this.state.me && this.state.display === ""){
    console.log("me loadet!", this.state.display)
    this.display( this.state.me.email );
  } else{
    console.log("not loadet me!")
  } */
  

    if ( this.state.authorized ){
   
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
                profileChange={this.profileChange}
                scrollUP ={this.scrollUP }
        
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
