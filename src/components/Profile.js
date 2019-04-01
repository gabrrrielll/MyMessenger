import React, { Component } from 'react';

class Profile extends Component {
    render() {
        var user = { ...this.props.state.display };
        var media = Number(user.media).toFixed(2);
        console.log(user.nume)

        return ( 
            <div className="profile">
                <div className="title">Profile</div>
                <img src={ user.photo_url } alt={ user.nume } />
                <div className="name">
                 {user.nume} {user.prenume}
                </div>
                <div className="profile-data">
                    <div className="born">
                   
                    {user.data_nasterii.anul}
                    </div>
                    <div className="tel">Telefon: { user.nr_telefon }</div>
                    <div className="cnp">CNP: { user.cnp }</div>
                    <div className="med">Media: { media }</div>
                </div>
                
            </div>
        );
    }
}

export default Profile;