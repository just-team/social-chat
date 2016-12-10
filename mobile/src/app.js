import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import LoginComponent from './scenes/login';
import ChatComponent from './scenes/chat';

import './config/netInfo';

class chatFB_Mobile extends Component {
    render() {
        return(
            <Router>
                <Scene key="root">
                    <Scene key="login" initial={true} component={LoginComponent} title="Login"/>
                    <Scene key="chat" hideNavBar={true} hideTabBar={true} component={ChatComponent} duration={3} panHandlers={null}/>
                </Scene>
            </Router>
        )
    }
}

AppRegistry.registerComponent('chatFB_Mobile', () => chatFB_Mobile);
