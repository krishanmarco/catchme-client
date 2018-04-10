/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import HelpAppInfo from './HelpAppInfo';
import React from 'react';
import {poolConnect} from '../../../redux/ReduxPool';
import {Screen} from "../../../comp/Misc";

// _ScreenHelpAppInfo ***********************************************************************************
// _ScreenHelpAppInfo ***********************************************************************************

class _ScreenHelpAppInfo extends React.Component {

	render() {
		return (
			<Screen>
				<HelpAppInfo
					navigator={this.props.navigator}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenHelpAppInfo = poolConnect(_ScreenHelpAppInfo,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[]
);
export default ScreenHelpAppInfo;

ScreenHelpAppInfo.propTypes = {};