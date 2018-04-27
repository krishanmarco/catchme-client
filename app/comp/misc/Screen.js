/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 18/01/18 © **/
import Logger from "../../lib/Logger";
import React from 'react';
import {Colors} from "../../Config";
import {connect} from 'react-redux';
import {Dimensions, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import type {TNavigator} from "../../lib/types/Types";


// Const **********************************************************************************************
// Const **********************************************************************************************

type Props = {
	navigator: TNavigator,
	style: ?Object,
	children: Node,
	disablePointerEvents: boolean,
};

type State = {
	// Nothing for now
};


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const ACTION_SET_DISABLE_POINTER_EVENTS = 'ACTION_SET_DISABLE_POINTER_EVENTS';

const screenInitState = {
	disablePointerEvents: false
};

export function screenReducer(state = screenInitState, action) {
	switch (action.type) {

		case ACTION_SET_DISABLE_POINTER_EVENTS:
			return Object.assign({}, state, {
				disablePointerEvents: action.disablePointerEvents
			});
	}
	return state;
}

function screenSetDisablePointerEvents(disablePointerEvents: boolean) {
	return (dispatch) => {
		Logger.v(`Screen screenSetDisablePointerEvents: disablePointerEvents ${disablePointerEvents}`);
		dispatch({type: ACTION_SET_DISABLE_POINTER_EVENTS, disablePointerEvents});
	};
}

export function screenDisablePointerEvents() {
	return screenSetDisablePointerEvents(true);
}

export function screenEnablePointerEvents() {
	return screenSetDisablePointerEvents(false);
}

// Screen ***********************************************************************************************
// Screen ***********************************************************************************************

class Screen extends React.PureComponent<void, Props, State> {

	render() {
		const {children, style, disablePointerEvents} = this.props;
		const {width, height} = Dimensions.get('window');
		return (
			<KeyboardAvoidingView
				style={styles.keyboardAvoidingView}
				behaviour='padding'>
				<View
					style={[{width, height}, styles.view, style]}
					pointerEvents={disablePointerEvents ? 'none' : 'auto'}>
					{children}
				</View>
			</KeyboardAvoidingView>
		);
	}

}

export default connect(
	// mapStateToProps
	(state) => state.screenReducer,

	// mapDispatchToProps
	(dispatch) => ({})
)(Screen);


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1
	},
	view: {
		flex: 1,
		backgroundColor: Colors.background
	},
});
