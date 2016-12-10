import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from  'react-native';

import ChatEmitter from '../emitters/chat';

const window = Dimensions.get('window');

import Styles from '../styles';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        let self = this;

        this.state = {users: this.getUsers(this.props.users)};

        ChatEmitter.addListener('get users', (data) => {
            console.log('get users', data);
            self.setState({users: this.getUsers(data)});
            console.log("State changed, users are: ", this.state.users);
        });
    }

    getUsers(users) {
        let views = [];
        for(let i in users) {
            views.push(
                <View style={Styles.item} key={`user${i}`}>
                    <Text style={Styles.userListName} onPress={() => {this.props.onClick(users[i].profile)}}>{users[i].profile.name}</Text>
                </View>);
        }
        return views;
    }

    render() {
        return (
            <View style={[Styles.userMenu, Styles.flex, Styles.flexStart, Styles.flexCol]}>
                <View style={[Styles.avatarContainer, Styles.paddingLeft]}>
                    <Image
                        style={Styles.avatar}
                        source={{uri: this.props.imageUrl}}/>
                    <Text style={Styles.name}>{this.props.name}</Text>
                </View>
                <ScrollView scrollsToTop={false} containerStyle={[Styles.userMenu, Styles.flex, Styles.flexCenter, Styles.flexCol, Styles.paddingLeft]}>
                    {this.state.users}
                </ScrollView>
            </View>
        );
    }
};
