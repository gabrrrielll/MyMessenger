import React, { Component } from 'react';
import axios from 'axios';
//import {users_data } from   "./users_data";

class Users extends Component {
 
     constructor() {
        super();
        this.state =//this.props.state
         {
            requests: [],
             friends: [],
             sugestions: [],
             requestSent: []
           
        } 
      }  
/* componentDidMount() {
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
            (a,b) => (a.last_activity > b.last_activity) ? 1 : ((b.last_activity > a.last_activity) ? -1 : 0)
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
  } */
  sendFriendsRequest = (email) => {
   console.log(email);
    axios.post("http://localhost:4000/sendFriendsRequest",{
      token: window.localStorage.getItem("token"),
      email: email,
      message: this.props.state.message
    })
    .then(response => {
        console.log("response.data.requestSentEmail", response.data );
        var newRequest = this.state.sugestions.find( user => user.email === email )
         //console.log("newRequest", newRequest)
        var newDataRequest = [ ...this.state.requestSent, newRequest ]
        this.setState({
        requestSent : newDataRequest
        }) 
  
    })
    .catch(error => {
      console.log(error, "eroare la accesare")
    });
 }

 acceptFriendsRequest = (email) => {
         console.log(email);
          axios.post("http://localhost:4000/acceptFriendsRequest",{
            token: window.localStorage.getItem("token"),
                    email: email
                })
             .then( response => {
        console.log(response)
                 var newAccepted = this.state.requests.find( el => { return el.email === email });
                var newData = [ ...this.state.friends, newAccepted ];
        
                var newRamainRequest = this.state.requests.filter( el => { return el.email !== email }); 
                console.log("friends: ", this.state.requests );
            
                    this.setState({
                    requests:  newRamainRequest,
                    friends: newData
                    })  
            }) 
             .catch(error => {
                console.log(error, "eroare la accesare")
            }); 
            
  }
  

  removeFriend =(email) =>{
    axios.post("http://localhost:4000/removefriend",{
         token: window.localStorage.getItem("token"),
         email: email
       })
       .then(response => {
        console.log(" this.state.friends",  this.state.friends)
          //var newAccepted = this.state.requests.find(el => { return el.email === email });
         var newData = this.state.friends.filter( el => el.email !== email)
 console.log("newData", newData)
               this.setState({
                 friends: newData
               })  
            /*
          var newRamainRequest = this.state.requests.filter( el => { return el.email !== email });
         console.log("friends: ", this.state.friends);
        
               this.setState({
               requests:  newRamainRequest
               })  */
       })
       .catch(error => {
         console.log(error, "eroare la accesare")
       });
      
   }
 
    render() { 
       //console.log ( "this.props.state.message",  this.props.state.message)
       
        return (
            <div className="users">
                    <div className="title">Friends </div> 
                            { 
                             this.props.state.requests ?  
                             ( 
                                this.props.state.requests.map(user =>{
                                    return (
                                    <div className="user" 
                                            onClick={ ()=>this.props.display( user.email ) }
                                            key={ user._id}>
                                        <img src={ user.photo }  alt={ user.username } />
                                        <span className="firstname">{user.firstname} </span>
                                        <span className="lastname">{user.lastname} </span>
                                        <span className="addFriend">
                                                    <button title="Remove friend"
                                                            onClick= { ()=>this.acceptFriendsRequest( user.email ) }>
                                                            Accept
                                                    </button>
                                        </span>
                                    </div>
                                    
                                    )
                                })
    
                             )
                              : null
                            }

                            {this.props.state.friends
                            
                            .map(user =>{
                                return (
                                <div className="user" 
                                        onClick={ ()=>this.props.display( user.email ) }
                                        key={ user._id}>
                                    <img src={ user.photo }  alt={ user.username } />
                                    <span className="firstname">{user.firstname} </span>
                                    <span className="lastname">{user.lastname} </span>
                                    <span className="addFriend">
                                                <button title="Remove friend"
                                                        onClick= { ()=>this.removeFriend( user.email ) }>
                                                        Remove
                                                </button>
                                    </span>
                                </div>
                                
                                )
                            })
                        }

                    <div className="title">Sugestions</div> 
                        {
                            this.props.state.sugestions.map(user =>{
                                return (
                                <div className="user" 
                                        onClick={ ()=>this.props.display( user.email ) }
                                        key={ user._id}>
                                    <img src={ user.photo }  alt={ user.username } />
                                    <span className="firstname">{user.firstname} </span>
                                    <span className="lastname">{user.lastname} </span>
                                    {
                                        ( !this.state.requestSent.some( el =>  el.email === user.email ))?
                                        ( 
                                            <span className="addFriend">
                                            <button title="Send friendship request"
                                                    onClick= { ()=>this.sendFriendsRequest( user.email ) }>
                                                    Send
                                            </button>
                                </span>
                                        ) : null
                                    }
                                   
                                </div>
                                
                                )
                            })
                        }
            </div>
        );
    }
}

export default Users;