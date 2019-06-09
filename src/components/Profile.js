import React, { Component } from 'react';

class Profile extends Component {
    render() {
        var user = this.props.state.sugestions.find( el => (el.email ===this.props.state.display) ) ;
         
        if (user === undefined) {
           return <h3>Please select a user</h3>
        } 
        
        return ( 
            <div className="profile">
                   <div className="title">Profile</div>
                    <div className="name">
                         {user.firstname} {user.lastname}
                    </div>
                    <img src={ user.photo } alt={ user.email } />
                    <div className="tel">
                         Phone: { user.tel }
                    </div>
                    <div className="email">
                        Email: { user.email }
                    </div>    
            </div>
        );
    }
}

export default Profile;