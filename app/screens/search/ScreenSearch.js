/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import Search from './Search';
import {poolConnect} from '../../redux/ReduxPool';
import {NullableObjects, Screen} from '../../comp/Misc';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";

// _ScreenSearch ****************************************************************************************
// _ScreenSearch ****************************************************************************************

class _ScreenSearch extends React.Component {

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
					objects={[this._userProfile()]}
					renderChild={([userProfile]) => (
						<Search
							navigator={this.props.navigator}
							userProfile={userProfile}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSearch = poolConnect(_ScreenSearch,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);


export default ScreenSearch;