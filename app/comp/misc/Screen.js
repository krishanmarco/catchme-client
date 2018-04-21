/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 18/01/18 © **/
import _ from 'lodash';
import Logger from "../../lib/Logger";
import React from 'react';
import {bindActionCreators} from 'redux';
import {Colors} from "../../Config";
import {connect} from 'react-redux';
import {Dimensions, KeyboardAvoidingView, StyleSheet, View} from 'react-native';


// Const **********************************************************************************************
// Const **********************************************************************************************

type Props = {
	style: ?Object,
	children: Node,
	height: number,
	disablePointerEvents: boolean,
	setHeight: (Object) => void
};

type State = {
	// Nothing for now
};

const ScreenConst = {
	lastRegisteredHeight: 0,
	initialHeight: 0
};

// Redux ************************************************************************************************
// Redux ************************************************************************************************

const ACTION_SET_HEIGHT = 'ACTION_SET_HEIGHT';
const ACTION_SET_DISABLE_POINTER_EVENTS = 'ACTION_SET_DISABLE_POINTER_EVENTS';

const screenInitState = {
	height: ScreenConst.lastRegisteredHeight,
	disablePointerEvents: false
};

export function screenReducer(state = screenInitState, action) {
	switch (action.type) {
		case ACTION_SET_HEIGHT:
			return Object.assign({}, state, {
				height: action.height
			});

		case ACTION_SET_DISABLE_POINTER_EVENTS:
			return Object.assign({}, state, {
				disablePointerEvents: action.disablePointerEvents
			});
	}
	return state;
}

function screenSetHeight(layout: Object) {
	return (dispatch, getState) => {
		// layout: {nativeEvent: { layout: {x, y, width, height}}}
		const measuredHeight = _.get(layout, 'nativeEvent.layout.height');
		const currentHeight = getState().screenReducer.height;

		// Check if the height of this screen has changed
		if (currentHeight !== ScreenConst.initialHeight)
			return;

		if (currentHeight === measuredHeight)
			return;

		// The height has changed, save it to the screenLastRegisteredHeight so the
		// next component might save a re-render
		Logger.v("Screen screenSetHeight: Updating for new height: " + measuredHeight);

		ScreenConst.lastRegisteredHeight = measuredHeight;
		dispatch({
			type: ACTION_SET_HEIGHT,
			height: measuredHeight
		});

	};
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
		const {children, style, height, disablePointerEvents, setHeight} = this.props;
		return (
			<View
				style={[styles.view, style]}
				onLayout={setHeight}
				pointerEvents={disablePointerEvents ? 'none' : 'auto'}>
				<View style={{height}}>
					<KeyboardAvoidingView
						behaviour='padding'
						style={styles.view}>
						{children}
					</KeyboardAvoidingView>
				</View>
			</View>
		);
	}

}

export default connect(
	// mapStateToProps
	(state) => state.screenReducer,

	// mapDispatchToProps
	(dispatch) => ({
		setHeight: bindActionCreators(screenSetHeight, dispatch)
	})
)(Screen);


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: Colors.background
	},
});
