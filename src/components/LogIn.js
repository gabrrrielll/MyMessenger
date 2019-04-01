import React from 'react';
const LogIn = (props)=> {
    
        return (
            <form>
            <input type="text" id="email" className="fadeIn second" name="login" placeholder="login" 
            onChange={props.updateData} value={props.email}/>
            <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"
            onChange={props.updateData} value={props.password}/>
            <input type="submit" class="fadeIn fourth" value="Log In" onClick={props.logIn} />      
        </form>
        );
   
}

export default LogIn;