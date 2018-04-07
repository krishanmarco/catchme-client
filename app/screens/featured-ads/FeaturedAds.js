/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import FeaturedAdsList from '../../comp-buisness/featured-ads/FeaturedAdsList';
import FirebaseDataDefFeaturedAds, {FIREBASE_DATA_ID_FEATURED_ADS} from "../../lib/redux-pool/firebase-data/def/FirebaseDataDefFeaturedAds";
import React from 'react';
import {bindActionCreators} from 'redux';
import {poolConnect} from '../../redux/ReduxPool';
import {TActionHandlerParams} from "../../lib/helpers/ActionHandler";
import {View} from 'react-native';
import type {TAction} from "../../lib/daos/DaoAction";
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	userProfile: TUser,
	navigator: TNavigator,
	handleClickAction: Function
};


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const featuredAdsInitState = {
	// Nothing for now
};

export function featuredAdsReducer(state = featuredAdsInitState, action) {
	switch (action.type) {
		// Nothing for now
	}

	return state;
}


function featuredAdsHandleClickAction(actionHandlerParams: TActionHandlerParams): Promise {
	return (dispatch, getState) => {
		// ActionHandler.handleAction(string, TAction, TNavigator, TThunk): Promise
		return FirebaseDataDefFeaturedAds.handleClickAction({...actionHandlerParams, thunk: {dispatch, getState}});
	};
}


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class _FeaturedAds extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._loadMore = this._loadMore.bind(this);
		this._handleClickAction = this._handleClickAction.bind(this);
	}

	componentWillMount() {
		const {userProfile} = this.props;
		this._firebaseDataFeaturedAds().initialize(DaoUser.gId(userProfile));
	}

	_firebaseDataFeaturedAds() {
		return this.props[FIREBASE_DATA_ID_FEATURED_ADS];
	}

	_handleClickAction(clickAction: string, action: TAction): Promise {
		const {handleClickAction, navigator} = this.props;
		return handleClickAction({clickAction, action, navigator});
	}

	_loadMore() {
		const {userProfile} = this.props;
		this._firebaseDataFeaturedAds().loadMore(DaoUser.gId(userProfile));
	}


	render() {
		const {userProfile} = this.props;
		return (
			<View>
				<FeaturedAdsList
					userProfile={userProfile}
					handleClickAction={this._handleClickAction}

					featuredAdsList={this._firebaseDataFeaturedAds().data}
					loading={this._firebaseDataFeaturedAds().runningBulkFetch}
					loadMore={this._loadMore}/>
			</View>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const FeaturedAds = poolConnect(
	// Presentational Component
	_FeaturedAds,

	// mapStateToProps
	(state) => state.featuredAdsReducer,

	// mapDispatchToProps
	(dispatch) => ({
		handleClickAction: bindActionCreators(featuredAdsHandleClickAction, dispatch)
	}),

	// Array of pools to subscribe to
	[FIREBASE_DATA_ID_FEATURED_ADS]
);
export default FeaturedAds;

// Style ************************************************************************************************
// Style ************************************************************************************************
