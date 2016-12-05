import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import Styles from '../styles';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {Actions} from 'react-native-router-flux';

import FBLoginView from '../elements/fb.login.btn';
import LoginEmitter from '../emitters/login';
import Config from '../config/oneSignal';


export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        let self = this;
        LoginEmitter.addListener('loggedin', (userId) => {
            return self.onloginFound({credentials: {userId: userId}});
        });
    }


    onloginFound(data) {
        AsyncStorage.getItem(data.credentials.userId)
            .then(function(profile) {
                if(!profile) {
                    return LoginEmitter.emit('forceLogout');
                }
                console.log("Profiles is", JSON.parse(profile));
                Actions.chat({profile: JSON.parse(profile)});
            });
    }

    onLogin(data) {
        AsyncStorage.setItem(data.credentials.userId, JSON.stringify(data.profile));
        console.log("Item set in storage");
        ChatEmitter.emit('send_user_data', {
                user_fb_id: data.profile.id,
                user_note_id: Config.userId,
                profile: {
                    name: data.profile.name,
                    email: data.profile.email,
                    age: data.profile.age_range,
                    profile_url: data.profile.link,
                    picture: data.profile.picture.data.url
                }
        });
    } 
    
    render() {
        return(
            <View style={[Styles.flex, Styles.flexCol, Styles.flexCenter]}>
                    <FBLogin 
                        buttonView={<FBLoginView />}
                        ref={(fbLogin) => {
                            LoginEmitter.emit('setBtnText', fbLogin)
                            this.fbLogin = fbLogin
                         }}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        permissions={["email","user_friends"]}
                        onLogin={this.onLogin}
                        onLoginFound={this.onloginFound}
                        onLoginNotFound={function(e){console.log(e)}}
                        onLogout={function(e){console.log(e)}}
                        onCancel={function(e){console.log(e)}}
                        onPermissionsMissing={function(e){console.log(e)}}
                    />
            </View>
        )
    }
}

