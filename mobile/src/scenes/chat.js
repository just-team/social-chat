import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView, AsyncStorage, Image} from 'react-native';
import SideMenu from 'react-native-side-menu';

import Icon from 'react-native-vector-icons/MaterialIcons';
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
          self.setMessagesToStorage(data).bind(self)();
      });
      ChatEmitter.addListener('receive users', (data) => {
          self.setState({users: data});
      });
      ChatEmitter.addListener('userTyping', (data) => {

      });
  }


  state = {
    isOpen: true,
    messages: [
        {
            content: "Barev",
            sender: '1233'
        },
        {
            content: "Hajox",
            sender: this.props.profile.user_fb_id
        },
        {
            content: "Inch ka chka? Vonces?",
            sender: "213132"
        },
        {
            content: "Ankap eli",
            sender: this.props.profile.user_fb_id
        },
        {
            content: "Ba urish?",
            sender: "12312312"
        },
        {
            content: "Lyoqsh",
            sender: this.props.profile.user_fb_id
        },
        {
            content: "Lav de davay",
            sender: "21312311231"
        },
        {
            content: "Ankap eli",
            sender: this.props.profile.user_fb_id
        },
        {
            content: "Ba urish?",
            sender: "12312312"
        },
        {
            content: "Lyoqsh",
            sender: this.props.profile.user_fb_id
        },
        {
            content: "Lav de davay",
            sender: "21312311231"
        }
    ],
    friendName: "Hambal",
    friendId: "",
    message: "",
    friendPicture: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
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
      const message = {
          to: this.state.friendId,
          from: this.props.profile.userId,
          content: this.state.message,
          date: Date.now()
      };
      this.state.messages.push(message);
      this.setState({messages: this.state.messages});
      ChatEmitter.emit('send message', {
          socketId: this.state.friendSocketId,
          message: message
      });
      this.setMessageToStorage(message);
      this.setState({message: ""});
  }

  onUserSelected = (data) => {
    this.setState({
      isOpen: false,
      friendName: data.name,
      friendId: data.user_fb_id,
      friendPicture: data.picture
    });
    let self = this;

    this.getMessagesFromStorage(data.user_fb_id)
        .then((messages) => {
            self.setState({messages: messages || []});
    })
  };

  onChangeText(text) {
      this.setState({message: text});
  }

  render() {
    const menu = <Menu onClick={this.onUserSelected.bind(this)} imageUrl={this.props.profile.picture} name={this.props.profile.name} users={[]} user_fb_id={this.props.profile.user_fb_id}/>;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={[Styles.flex, Styles.flexStart, Styles.bgWhite, Styles.flexCol]}>
            <View style={[Styles.header]}>
                <Image
                    style={Styles.friendAvatar}
                    source={{uri: this.state.friendPicture}}/>
                <Text style={[Styles.headerText, Styles.flex, Styles.selfCenter]}>{this.state.friendName}</Text>
            </View>
            <ScrollView scrollToTop={false} containerStyle={[Styles.flex, Styles.flexCol, Styles.flexStart, Styles.selfBottom, Styles.messageBox]}>
                {
                    this.state.messages.map((message, i) => {
                        const styles = [Styles.bubble];
                        let src = this.state.friendPicture;
                        if(message.sender == this.props.profile.user_fb_id) {
                            styles.push(Styles.bubbleRight, Styles.bgDarkBlue);
                            src = this.props.profile.picture;
                        }
                        return (
                            <View style={styles} key={i}>
                                {(message.sender != this.props.profile.user_fb_id)?
                                    (<Image
                                        style={[Styles.friendAvatar, Styles.bubbleImg]}
                                        source={{uri: src}}/>
                                    ): null

                                }
                                <Text> {message.content}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>
            <View style={[Styles.flex, Styles.flexStart, Styles.inputGroup]}>
                <TextInput placeholder="Write a message..." style={Styles.input} onChangeText={this.onChangeText.bind(this)} value={this.state.message}/>
                <Icon.Button name="message" backgroundColor="#757575" onPress={this.sendMessage.bind(this)} style={Styles.flex, Styles.flexCenter , {height: 32, width: 64, borderRadius: 0}}>
                </Icon.Button>
            </View>
        </View>
      </SideMenu>
    );
  }
};
