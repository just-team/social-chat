import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from  'react-native';

const window = Dimensions.get('window');

import Styles from '../styles';

module.exports = class Menu extends Component {
 getUsers(users) {
     return users.map((user) => {
         return (
            <View style={Styles.item} key={Math.floor(Math.random() * 120000) + Date.now()}>
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
        {this.getUsers(this.props.users)}
      </ScrollView>
      </View>
    );
  }
};