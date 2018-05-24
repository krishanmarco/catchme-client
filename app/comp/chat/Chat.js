/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoUser from '../../lib/daos/DaoUser';
import React from 'react';
import Router from "../../lib/navigation/Router";
import {bindActionCreators} from 'redux';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {chatMessagesLoadMore, chatMessagesSendMessage, initialize} from './ChatReducer';
import {Colors} from '../../Config';
import {connect} from 'react-redux';
import {DefaultLoader} from "../Misc";
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import type {TChatReducerState} from "./ChatReducer";
import type {TFirebaseChatMessage, TFirebaseChatUser, TGetFirebaseMessages} from "../../lib/data/Firebase";
import type {TUser} from "../../lib/daos/DaoUser";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = TChatReducerState & {
	chatId: string,
	user: TUser,
	getFirebaseMessages: TGetFirebaseMessages,
	placeholder: ?string,

	messages: Array<TFirebaseChatMessage>,
	fetchedAllItems: boolean,
	runningBulkFetch: boolean,

	initialize: (TGetFirebaseMessages, TFirebaseChatUser) => void,
	sendMessage: (TGetFirebaseMessages, TFirebaseChatMessage) => void,
	loadMore: (TGetFirebaseMessages) => void
};

const defaultProps = {
	placeholder: 'Type a message...'
};


// _Chat ************************************************************************************************
// _Chat ************************************************************************************************

class _Chat extends React.Component<void, Props, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._onSend = this._onSend.bind(this);
		this._onLoadMore = this._onLoadMore.bind(this);
		this._onPressAvatar = this._onPressAvatar.bind(this);
		this._renderBubble = this._renderBubble.bind(this);
		this._renderBubbleHeader = this._renderBubbleHeader.bind(this);
		this._renderLoading = this._renderLoading.bind(this);
		this._setRefGiftedChat = this._setRefGiftedChat.bind(this);
	}

	_getChatUser(): TFirebaseChatUser {
		const {user} = this.props;
		return {
			_id: DaoUser.gId(user),
			name: DaoUser.gName(user),
			avatar: DaoUser.gPictureUrl(user),
		};
	}

	componentWillMount() {
		const {getFirebaseMessages, initialize} = this.props;
		initialize(getFirebaseMessages, this._getChatUser());
	}

	componentDidMount() {
		// Workaround for keyboard overlaps messages on android
		this.refGiftedChat.getKeyboardHeight = () => this.refGiftedChat._keyboardHeight;
	}

	_onPressAvatar(user: TUser) {
		const {navigator} = this.props;

		// If the user pressed on his own avatar do nothing
		if (DaoUser.gId(user) == this._getChatUser()._id)
			return;

		Router.toModalUserProfile(
			navigator,
			{userId: DaoUser.gId(user)},
			DaoUser.gName(user)
		);
	}

	_onSend(messages = []) {
		const {sendMessage, getFirebaseMessages} = this.props;

		if (messages && messages.length <= 0)
			return;

		let message = messages[0];
		message.createdAt = new Date().toString();

		sendMessage(getFirebaseMessages, message);
	}

	_onLoadMore() {
		const {loadMore, getFirebaseMessages} = this.props;
		loadMore(getFirebaseMessages);
	}

	_setRefGiftedChat(ref) {
		this.refGiftedChat = ref;
	}

	render() {
		const {
			messages,
			fetchedAllItems,
			runningBulkFetch,
			placeholder
		} = this.props;

		return (
			<GiftedChat
				ref={this._setRefGiftedChat}

				messages={messages}
				user={this._getChatUser()}

				loadEarlier={!fetchedAllItems}
				isLoadingEarlier={runningBulkFetch}
				onSend={this._onSend}
				onLoadEarlier={this._onLoadMore}

				placeholder={placeholder}
				isAnimated={true}

				renderAvatarOnTop={true}
				onPressAvatar={this._onPressAvatar}

				renderLoading={this._renderLoading}
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
		const {user} = props;

		const senderId = _.get(props, 'currentMessage.user._id', -1);
		if (senderId == DaoUser.gId(user))
			return null;

		return (
			<View style={styles.bubbleHeader}>
				<RkText style={styles.bubbleHeaderText} rkType='secondary6'>
					{props.currentMessage.user.name}
				</RkText>
				<View style={styles.bubbleHeaderFooter}/>
			</View>
		);
	}

	_renderLoading() {
		return (<DefaultLoader/>);
	}

}


const ChatContainer = connect(
	// mapStateToProps
	(state) => state.chatReducer,

	// mapDispatchToProps
	(dispatch) => ({
		initialize: bindActionCreators(initialize, dispatch),
		sendMessage: bindActionCreators(chatMessagesSendMessage, dispatch),
		loadMore: bindActionCreators(chatMessagesLoadMore, dispatch)
	})
)(_Chat);
export default ChatContainer;


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
		paddingHorizontal: 8,
		paddingVertical: 4
	},
	bubbleHeaderText: {
		fontSize: 10
	},
	bubbleHeaderFooter: {
		borderBottomColor: 'rgba(0, 0, 0, 0.1)',
		borderBottomWidth: 1
	},
});