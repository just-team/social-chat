import React, { Component } from 'react';
import { StyleSheet,Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginEmitter from '../emitters/login';

export default class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object
    };

  constructor(props) {
      super(props);
      LoginEmitter.addListener('setBtnText', (data) => {
          console.log(data.state.buttonText);
          this.setState({text: data.state.buttonText});
      });

      LoginEmitter.addListener('forceLogout', () => {
          this.context.logout()
            .then(() => {
                return this.context.login();
            });
      });
    }

    state = {text: "Login with Facebook"};
    
    changeText() {
        this.setState({text: this.context.isLoggedIn?"Login with Facebook": "Logout"});
    }
    
    handlePress() {
        if(!this.context.isLoggedIn){
            this.context.login();
            return this.changeText()
        }  
            this.context.logout()
            this.changeText()
    }


    render(){
        return (
            <Icon.Button 
                name="facebook" 
                backgroundColor="#3b5998" 
                onPress={this.handlePress.bind(this)}
                >
                {this.state.text}
            </Icon.Button>
      )
    }
}