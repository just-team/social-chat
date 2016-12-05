import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
  eg.
  Please note:
  - if buttonView is not set then a default view will be shown
  - this is not meant to be a full example but highlights what you have access to
**/

class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object
  };

  constructor(props) {
      super(props);
  }

  render(){
      return (
        <View>
          <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => {
              if(!this.context.isLoggedIn){
                this.context.login()
              }else{
                this.context.logout()
              }

            }}>
            Login with Facebook
          </Icon.Button>
        </View>
    );
  }
}

export default FBLoginView;
