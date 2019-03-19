
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

class Config {
  constructor() {
    this.date = {
      cheieDeAutorizarePentruUtilizatoriLogati: [],
      users: [{
        authData: {
          email: "andrei@yahoo.com",
          password: "andrei@yahoo.com"
        }
      }]
    }
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
    console.log(data);
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
        console.log("a ajuns aici");
        return {status: "success", token}
        
      }
    }
  }
}

var dataBase = new Config();

class FrontendApp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  updateData = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  logIn = () => {
    
    var response = dataBase.post('/login', {email: this.state.email, password: this.state.password});
    if (response.status === "eroare") {
      alert(response.motiv);
    } else {
      alert("te-ai autentificat cu succes si tokenul este " + response.token);
    }
  }

  render() {
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
            <div class="fadeIn first">
            <i class="fa fa-user"></i>
            </div>

            <form>
                <input type="text" id="email" className="fadeIn second" name="login" placeholder="login" 
                onChange={this.updateData} value={this.state.email}/>
                <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"
                onChange={this.updateData} value={this.state.password}/>
                <input type="submit" class="fadeIn fourth" value="Log In" onClick={this.logIn} />      
            </form>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<FrontendApp />, rootElement);
