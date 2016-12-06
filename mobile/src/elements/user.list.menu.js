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

module.exports = class Menu extends Component {

    constructor(props) {
        super(props);
        let self = this;

        this.state = {users: this.getUsers(this.props.users)}

        ChatEmitter.addListener('receive users', (data) => {
            self.setState({users: data});
        });
    }

    getUsers(users) {
        return users.map((user, index) => {
            return (
                <View style={Styles.item} key={`user${index}`}>
                    <Text style={Styles.userListName} onPress={() => {this.props.onClick(user.name)}}>{user.name}</Text>
                </View>)
        });
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