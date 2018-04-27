/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import AddContacts from './AddContacts';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from "../../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from '../../../comp/Misc';
import {poolConnect} from '../../../redux/ReduxPool';
import type {TCachePool} from "../../../lib/redux-pool/cache/CachePool";
import type {TNavigator} from "../../../lib/types/Types";

// Config ***********************************************************************************************
// Config ***********************************************************************************************

type Props = {
	navigator: TNavigator
};

// _ScreenSearch ****************************************************************************************
// _ScreenSearch ****************************************************************************************

class _ScreenSearch extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._renderAddContacts = this._renderAddContacts.bind(this);
	}

	componentWillMount() {
		this._cacheUserProfile().initialize();
	}

	_cacheUserProfile(): TCachePool {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._cacheUserProfile().data]}
					renderChild={this._renderAddContacts}/>
			</Screen>
		);
	}

	_renderAddContacts([userProfile]) {
		const {navigator} = this.props;
		return (
			<AddContacts
				navigator={navigator}
				userProfile={userProfile}/>
		);
	}

}

const ScreenSearch = poolConnect(_ScreenSearch,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenSearch;