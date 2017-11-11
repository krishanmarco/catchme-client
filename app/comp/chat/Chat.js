/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors, Icons} from '../../Config';

import {connect} from 'react-redux';

import DaoUser from '../../lib/daos/DaoUser';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {initialize, chatMessagesSendMessage, chatMessagesLoadMore} from './ReducerChat';

import {DefaultLoader} from "../Misc";
import {View} from 'react-native';
import {RkStyleSheet, RkText, RkTextInput} from 'react-native-ui-kitten';



class ChatPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._onSend = this._onSend.bind(this);
    this._onPressAvatar = this._onPressAvatar.bind(this);
    this._renderBubble = this._renderBubble.bind(this);
    this._renderCustomView = this._renderCustomView.bind(this);
  }


  _getChatUser() {
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


  _onPressAvatar(user) {

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
            ref={component => this.giftedChat = component}

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
            renderCustomView={this._renderCustomView}

        />
    );
  }


  _renderBubble(props) {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#f0f0f0',
              },
              right: {
                backgroundColor: Colors.primary
              }
            }}
        />
    );
  }


  _renderCustomView(props) {
    return (
        <View style={{paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4}}>
          <RkText style={{fontSize: 10}} rkType='secondary6'>{props.currentMessage.user.name}</RkText>
          <View style={{borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1}}/>
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

ChatContainer.propTypes = {
  chatId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  getFirebaseMessages: PropTypes.func.isRequired,

  placeholder: PropTypes.string,
};