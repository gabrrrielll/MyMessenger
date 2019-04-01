
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Messenger from "./components/Messenger"
//import LogIn from "./components/LogIn";

class Config {
  constructor() {
    this.date = {
      cheieDeAutorizarePentruUtilizatoriLogati: [],
      users: [{
        authData: {
          email: "a",
          password: "a"
        }
      }]
    }
   // console.log(this.date)
  }

  insertKey = (data) => {
    this.date = {
      cheieDeAutorizarePentruUtilizatoriLogati: [
        ...this.date.cheieDeAutorizarePentruUtilizatoriLogati,
        data
      ]
    }
  }

  post = (url, data) => {
   // console.log(data);
    if (url === "/login") {
      var find = this.date.users.filter((x) => {
        return x.authData.email === data.email &&
               x.authData.password === data.password;
      })
      if (find.length === 0) {
        return {status: "eroare", motiv: "Combinatie gresita"}
      } else {
        
        var token = "ocheiesecreta";
        
        this.insertKey({id: find.id, token})
        //console.log("a ajuns aici");
        return {status: "success", token}
        
      }
    }
  }
}

var dataBase = new Config();

var ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

class FrontendApp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      tel: "",
      users: [],
      autentificare: true,
      acces: false,
      display: {}
    };
  }

  updateData = event => {
    event.preventDefault();
    //console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
    //console.log(this.state);
  };

  logIn = () => {
    
    var response = dataBase.post('/login', {email: this.state.email, password: this.state.password});
    if (response.status === "eroare") {
      alert(response.motiv);
    } else {
      alert("te-ai autentificat cu succes si tokenul este " + response.token);
      this.setState({acces: true});
    }
  } 
  registration = (e) => {
    e.preventDefault();
    const users = [...this.state.users];
   users.push( {key: ID(),
                       email: this.state.email,
                      pass: this.state.password,
                      } );
    //const users = [...this.state.users];
    //const date={};
   // alert(e.target.email.value);
   this.setState({ users });
   //console.log( this.state);
   return  this.state.users;
  }

  schimba =() =>{
    this.setState({ autentificare: !this.state.autentificare} );
  }

  logout = () =>{
    this.setState({ acces: false });
}
display = (user) =>{
 // console.log(cnp);
  this.setState({ "display":  user});
 // console.log(this.state);
}
 

  render() {
    if (!this.state.acces){
      return( 
        <Messenger  logout ={this.logout} display={this.display} state={this.state}/>
      )

    } else {
      if (this.state.autentificare){
        return (
          <div className="wrapper fadeInDown">
              <div id="formContent">
              <div class="fadeIn first">
              <i class="fa fa-user"> Login</i>
              </div>
              <form>
              <input type="text" id="email" className="fadeIn second" name="Email" placeholder="Email" 
              onChange={this.updateData} value={this.email}/>
              <input type="text" id="password" className="fadeIn third" name="password" placeholder="Password"
              onChange={this.updateData} value={this.password}/>
              <input type="submit" class="fadeIn fourth" value="Log In" onClick={this.logIn} />      
          </form>
          <div id="formFooter">
            <a class="underlineHover"  onClick={this.schimba}>You don't have a count? Register!</a>
          </div>
          </div>
        </div>
      );
  
      }else {
        return (
          <div className="wrapper fadeInDown">
              <div id="formContent" >
              <div class="fadeIn first">
              <i class="fa fa-user"> Register</i>
              </div>
              <form  onSubmit={this.registration}>
              <input type="text" id="email" className="fadeIn second" name="email" placeholder="Email"
               onChange={this.updateData}/>
              <input type="text" id="password" className="fadeIn second" name="password"  placeholder="Password"
               onChange={this.updateData}/>
               <input type="text" id="password" className="fadeIn second" name="password2"  placeholder=" Repeat password"
               onChange={this.updateData} value=""/>
               <input type="text" id="tel" className="fadeIn second" name="tel" placeholder="Phone"
               onChange={this.updateData} />
              <input type="submit" class="fadeIn fourth" value="Register"  />      
          </form>
          <div id="formFooter">
            <a class="underlineHover"  onClick={this.schimba}>Do you have a count? Login!</a>
          </div>
          </div>
        </div>
      );
      }

    }
   
    
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<FrontendApp />, rootElement);
