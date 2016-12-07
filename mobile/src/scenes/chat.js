import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView, AsyncStorage} from 'react-native';
import SideMenu from 'react-native-side-menu';

import Menu from '../elements/user.list.menu';
import Styles from '../styles';
import ChatEmitter from '../emitters/chat';
import '../socket';
import prettyData from '../helpers';

export default class ChatComponent extends Component {

  constructor(props) {
      super(props);
      let self = this;
      ChatEmitter.addListener('get message', (data) => {
          self.setMessageToStorage(data).bind(self)();
      });
      ChatEmitter.addListener('get messages', (data) => {
          self.setMessagesToStorage(data).bind(self)()
      });
      ChatEmitter.addListener('receive users', (data) => {
          self.setState({users: data});
      });
      ChatEmitter.addListener('userTyping', (data) => {

      });
      console.log(this.props.profile);
      ChatEmitter.emit("connect", prettyData(this.props));
  }


  state = {
    isOpen: true,
    messages: [],
    friendName: "",
    friendId: "",
    message: ""
  };

  setMessageToStorage(message) {
      let self = this;
    AsyncStorage.getItem(`${self.state.friendId}msg`)
        .then(function(messages) {
            messages = messages || JSON.stringify([]);
            messages = JSON.parse(messages);     
            messages.push(message);
            AsyncStorage.setItem(`${self.state.friendId}msg`, JSON.stringify(messages));
            self.setState({messages: messages})
        });      
  }

  setMessagesToStorage(messages) {
    AsyncStorage.setItem(`${this.state.friendId}msg`, JSON.stringify(messages));
  }

  getMessagesFromStorage() {
      return AsyncStorage.getItem(`${this.state.friendId}msg`)
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  sendMessage() {
      ChatEmitter.emit('send message', {
          socketId: this.state.friendId, 
          message: {
              to: this.state.friendUserId,
              from: this.props.profile.userId,
              content: this.state.message,
              date: Date.now()
          }
        });
      setMessageToStorage(this.state.message);
        this.setState({message: ""});
  }

  onUserSelected = (data) => {
    console.log(data);
    this.setState({
      isOpen: false,
      friendName: data.name,
      friendId: data.user_fb_id
    });
    let self = this;

    this.getMessagesFromStorage(data.user_fb_id)
        .then((messages) => {
            self.setState({messages: messages});
    })
  };

  onChangeText(text) {
      this.setState({message: text});
  }

  render() {
    let self = this;
    const users = [ ];
    for(let i = 0; i < 30; i++) {
        let name = `User${i + 1}`;
        users.push({
            profile: {
                name: name
            }
        });
    }
    const menu = <Menu onClick={this.onUserSelected.bind(this)} imageUrl={this.props.profile.picture.data.url} name={this.props.profile.name} users={users} user_fb_id={this.props.profile.user_fb_id}/>;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={[Styles.flex, Styles.flexStart, Styles.bgWhite, Styles.flexCol]}>
            <View style={[Styles.header]}>
                <Text style={[Styles.headerText, Styles.flex, Styles.selfCenter]}>{this.state.friendName}</Text>
            </View>
            <ScrollView scrollToTop={false} containerStyle={[Styles.flex, Styles.flexCol, Styles.flexStart, Styles.selfBottom, Styles.messageBox]}>
                <Text>Message</Text>
            </ScrollView>
            <View>
                <TextInput placeholder="Write a message..." style={Styles.input} onChangeText={this.onChangeText.bind(this)} value={this.state.message}/>
            </View>        
        </View>
      </SideMenu>
    );
  }
};