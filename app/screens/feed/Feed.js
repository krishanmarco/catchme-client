/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {poolConnect, FIREBASE_DATA_ID_FEED} from '../../redux/ReduxPool';
import FeedList from '../../comp-buisness/feed/FeedList';
import DaoUser from "../../lib/daos/DaoUser";
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";


// Flow *************************************************************************************************
// Flow *************************************************************************************************

const Props = {
	navigator: TNavigator,
	userProfile: TUser
};

const State = {
	// Nothing for now
};


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const feedInitState = {
	// Nothing for now
};

export function feedReducer(state = feedInitState, action) {
	switch (action.type) {
		// Nothing for now
	}
	
	return state;
}



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class FeedPresentational extends React.Component<any, Props, State> {
	
	constructor(props, context) {
		super(props, context);
		this._loadMore = this._loadMore.bind(this);
	}
	
	componentWillMount() {
		this._firebaseDataFeed().initialize(DaoUser.gId(this._userProfile()));
	}
	
	_firebaseDataFeed() {
		return this.props[FIREBASE_DATA_ID_FEED];
	}
	
	_userProfile() {
		return this.props.userProfile;
	}
	
	_navigator() {
		return this.props.navigator;
	}
	
	_loadMore() {
		this._firebaseDataFeed().loadMore(DaoUser.gId(this._userProfile()));
	}
	
	
	render() {
		return (
			<View>
				<FeedList
					userProfile={this._userProfile()}
					navigator={this._navigator()}
					
					feedList={this._firebaseDataFeed().data}
					loading={this._firebaseDataFeed().runningBulkFetch}
					loadMore={this._loadMore}/>
			</View>
		);
	}
	
}

const Feed = poolConnect(
	// Presentational Component
	FeedPresentational,
	
	// mapStateToProps
	(state) => state.feedReducer,
	
	// mapDispatchToProps
	(dispatch) => ({}),
	
	// Array of pools to subscribe to
	[FIREBASE_DATA_ID_FEED]
);
export default Feed;

// Style ************************************************************************************************
// Style ************************************************************************************************
