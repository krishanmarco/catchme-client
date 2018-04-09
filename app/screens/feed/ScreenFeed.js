/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Context from '../../lib/Context';
import Feed from './Feed';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import type {TNavigator} from "../../lib/types/Types";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};

type State = {
	// Nothing for now
};

// _ScreenFeed ******************************************************************************************
// _ScreenFeed ******************************************************************************************

class _ScreenFeed extends React.Component<any, Props, State> {
	
	componentWillMount() {
		this.props[CACHE_ID_USER_PROFILE].initialize();
	}
	
	_userProfile() {
		return this.props[CACHE_ID_USER_PROFILE].data;
	}
	
	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._userProfile(), Context.getFirebaseUser()]}
					renderChild={([userProfile]) => (
						<Feed
							userProfile={userProfile}
							navigator={this.props.navigator}/>
					)}/>
			</Screen>
		);
	}
	
}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenFeed = poolConnect(_ScreenFeed,
	// mapStateToProps
	(state) => ({}),
	
	// mapDispatchToProps
	(dispatch) => ({}),
	
	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenFeed;