/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import _ from 'lodash';

import {Colors} from '../../Config';

import {connect} from 'react-redux';

import DaoUser from '../../lib/daos/DaoUser';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {initialize, chatMessagesSendMessage, chatMessagesLoadMore} from './ReducerChat';

import {DefaultLoader} from "../Misc";
import {View, StyleSheet} from 'react-native';
import {RkText} from 'react-native-ui-kitten';
import type {TUser} from "../../lib/daos/DaoUser";
import type {TFirebaseChatMessage, TFirebaseChatUser, TGetFirebaseMessages} from "../../lib/data/Firebase";
import type {TReducerChatState} from "./ReducerChat";

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  chatId: string,
  user: TUser,
  getFirebaseMessages: TGetFirebaseMessages,
  placeholder: ?string,

  messages: Array<TFirebaseChatMessage>,
  fetchedAllItems: boolean,
  loadMore: (TGetFirebaseMessages) => {},
  runningBulkFetch: boolean
};


type State = TReducerChatState & {
  initialize: (TGetFirebaseMessages, TUser) => {},
  sendMessage: (TGetFirebaseMessages, TFirebaseChatMessage) => {},
  loadMore: (TGetFirebaseMessages) => {}
};


// ChatPresentational ***********************************************************************************
// ChatPresentational ***********************************************************************************

class ChatPresentational extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
    this._onSend = this._onSend.bind(this);
    this._onPressAvatar = this._onPressAvatar.bind(this);
    this._renderBubble = this._renderBubble.bind(this);
    this._renderBubbleHeader = this._renderBubbleHeader.bind(this);
  }


  _getChatUser(): TFirebaseChatUser {
    return {
      _id: DaoUser.gId(this.props.user),
      name: DaoUser.gName(this.props.user),
      avatar: DaoUser.gPictureUrl(this.props.user),
    };
  }


  componentWillMount() {
    this.props.initialize(this.props.getFirebaseMessages, this._getChatUser());
  }

  componentDidMount() {
    // Workaround for keyboard overlaps messages on android
    this.giftedChat.getKeyboardHeight = () => this.giftedChat._keyboardHeight;
  }


  _onPressAvatar(user: TUser) {

  }


  _onSend(messages = []) {
    if (messages && messages.length <= 0)
      return;

    let message = messages[0];
    message.createdAt = new Date().toString();

    this.props.sendMessage(this.props.getFirebaseMessages, message);
  }


  render() {
    return (
        <GiftedChat
            ref={component => {this.giftedChat = component;}}

            messages={this.props.messages}
            user={this._getChatUser()}

            onSend={this._onSend}

            loadEarlier={!this.props.fetchedAllItems}
            onLoadEarlier={() => this.props.loadMore(this.props.getFirebaseMessages)}
            isLoadingEarlier={this.props.runningBulkFetch}


            placeholder={this.props.placeholder}
            isAnimated={true}
            renderLoading={() => <DefaultLoader/>}


            renderAvatarOnTop={true}
            onPressAvatar={this._onPressAvatar}

            renderBubble={this._renderBubble}
            renderCustomView={this._renderBubbleHeader}

        />
    );
  }


  _renderBubble(props) {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
              left: styles.bubbleLeft,
              right: styles.bubbleRight
            }}
        />
    );
  }


  _renderBubbleHeader(props) {
    const senderId = _.get(props, 'currentMessage.user._id', -1);
    if (senderId == DaoUser.gId(this.props.user))
      return null;


    return (
        <View style={styles.bubbleHeader}>
          <RkText style={styles.bubbleHeaderText} rkType='secondary6'>{props.currentMessage.user.name}</RkText>
          <View style={styles.bubbleHeaderFooter}/>
        </View>
    );
  }

}


const ChatContainer = connect(
    // mapStateToProps
    (state) => state.chatReducer,

    // mapDispatchToProps
    (dispatch) => ({
      initialize: (getFirebaseMessages, user) => dispatch(initialize(getFirebaseMessages, user)),
      sendMessage: (getFirebaseMessages, message) => dispatch(chatMessagesSendMessage(getFirebaseMessages, message)),
      loadMore: (getFirebaseMessages) => dispatch(chatMessagesLoadMore(getFirebaseMessages))
    })
)(ChatPresentational);
export default ChatContainer;


ChatContainer.defaultProps = {
  placeholder: 'Type a message...'
};



// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
  bubbleLeft: {
    backgroundColor: Colors.grey,
  },
  bubbleRight: {
    backgroundColor: Colors.primary
  },
  bubbleHeader: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4
  },
  bubbleHeaderText: {
    fontSize: 10
  },
  bubbleHeaderFooter: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1
  },
});