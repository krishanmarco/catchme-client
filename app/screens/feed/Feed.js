/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from '../../lib/daos/DaoUser';
import FeedList from '../../comp-buisness/feed/FeedList';
import FirebaseDataDefFeed, {FIREBASE_DATA_ID_FEED} from '../../lib/redux-pool/firebase-data/def/FirebaseDataDefFeed';
import React from 'react';
import {bindActionCreators} from 'redux';
import {poolConnect} from '../../redux/ReduxPool';
import {TActionHandlerParams} from '../../lib/helpers/ActionHandler';
import {TFirebaseDataPool} from '../../lib/redux-pool/firebase-data/FirebaseDataPool';
import {View} from 'react-native';
import type {TAction} from '../../lib/daos/DaoAction';
import type {TNavigator, TThunk} from '../../lib/types/Types';
import type {TUser} from '../../lib/daos/DaoUser';


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	userProfile: TUser,
	handleClickAction: Function
};

type State = {
	// Nothing for now
};


function feedHandleClickAction(actionHandlerParams: TActionHandlerParams): Promise {
	return (dispatch, getState) => {
		// ActionHandler.handleAction(string, TAction, TNavigator, TThunk): Promise
		return FirebaseDataDefFeed.handleClickAction({...actionHandlerParams, thunk: {dispatch, getState}});
	};
}


// _Feed ************************************************************************************************
// _Feed ************************************************************************************************

class _Feed extends React.Component<void, Props, State> {
	
	constructor(props, context) {
		super(props, context);
		this._loadMore = this._loadMore.bind(this);
		this._handleClickAction = this._handleClickAction.bind(this);
	}
	
	componentWillMount() {
		const {userProfile} = this.props;
		this._firebaseDataFeed().initialize(DaoUser.gId(userProfile));
	}
	
	_firebaseDataFeed(): TFirebaseDataPool {
		return this.props[FIREBASE_DATA_ID_FEED];
	}

	_handleClickAction(clickAction: string, action: TAction, neverConsume = false): Promise {
		const {handleClickAction, navigator} = this.props;
		return handleClickAction({clickAction, action, navigator, neverConsume});
	}

	_loadMore() {
		const {userProfile} = this.props;
		this._firebaseDataFeed().loadMore(DaoUser.gId(userProfile));
	}
	
	
	render() {
		const {userProfile} = this.props;

		return (
			<View>
				<FeedList
					userProfile={userProfile}
					handleClickAction={this._handleClickAction}

					feedList={this._firebaseDataFeed().data}
					loading={this._firebaseDataFeed().runningBulkFetch}
					loadMore={this._loadMore}/>
			</View>
		);
	}
	
}

const Feed = poolConnect(_Feed,
	// mapStateToProps
	(state) => ({}),
	
	// mapDispatchToProps
	(dispatch) => ({
		handleClickAction: bindActionCreators(feedHandleClickAction, dispatch)
	}),
	
	// Array of pools to subscribe to
	[FIREBASE_DATA_ID_FEED]
);
export default Feed;
