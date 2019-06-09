import React from 'react';
const LogIn = (props)=> {
    
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                    <div className="fadeIn first">
                          <i className="fa fa-user"> Login</i>
                    </div>    
                    <input type="text" id="email" className="fadeIn second" name="Email" placeholder="Email" 
                            onChange={props.updateData} value={props.email}/>
                    <input type="text" id="password" className="fadeIn third" name="password" placeholder="Password"
                            onChange={props.updateData} value={props.password}/>
                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={props.tryLogin} />   <br/>   
                    <label >{props.state.message}</label>
                <div id="formFooter">
                        <p className="underlineHover"  onClick={props.changeForm}>You don't have a count? <b>Register!</b></p>
                </div>
            </div>
      </div>
    );
   
}

export default LogIn;