/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Logout from './Logout';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from "../../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';
import type {TCachePool} from "../../../lib/redux-pool/cache/CachePool";
import type {TNavigator} from "../../../lib/types/Types";

// Config ***********************************************************************************************
// Config ***********************************************************************************************

type Props = {
	navigator: TNavigator
};

// _ScreenLogout ****************************************************************************************
// _ScreenLogout ****************************************************************************************

class _ScreenLogout extends React.Component<void, Props, void> {

	componentWillMount() {
		this._cacheUserProfile().initialize();
	}

	_cacheUserProfile(): TCachePool {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	render() {
		const {navigator} = this.props;
		return (
			<Screen>
				<NullableObjects
					objects={[this._cacheUserProfile().data]}
					renderChild={([authUserProfile]) => (
						<Logout
							navigator={navigator}
							authUserProfile={authUserProfile}/>
					)}/>
			</Screen>
		);
	}

}

const ScreenLogout = poolConnect(_ScreenLogout,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenLogout;
