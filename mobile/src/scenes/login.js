import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import Styles from '../styles';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {Actions} from 'react-native-router-flux';

import FBLoginView from '../elements/fb.login.btn';
import LoginEmitter from '../emitters/login';
import ChatEmitter from '../emitters/chat';
import prettyData from '../helpers';

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
      console.log('------------------')
      console.log(data)
      console.log('------------------')
        ChatEmitter.emit('send_user_data', prettyData(data));
        ChatEmitter.addListener('login completed', (data) => {
          AsyncStorage.setItem(data.user_fb_id, JSON.stringify(data));
          console.log("Item set in storage");
          Actions.chat({profile: data.profile});
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
