/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 18/01/18 © **/
import _ from 'lodash';
import Logger from "../../lib/Logger";
import React from 'react';
import {Colors} from "../../Config";
import {Keyboard, StyleSheet, View} from 'react-native';
import {RkAvoidKeyboard} from 'react-native-ui-kitten';

// Flow ***********************************************************************************************
// Flow ***********************************************************************************************

type Props = {
	style: ?Object,
	children: Node
};

type State = {
	height: number
};

// Screen ***********************************************************************************************
// Screen ***********************************************************************************************

export default class Screen extends React.Component<any, Props, State> {
	static screenInitialHeight = 0;
	static screenLastRegisteredHeight = 0;

	constructor(props, context) {
		super(props, context);
		this._onLayout = this._onLayout.bind(this);
		this.state = {height: Screen.screenLastRegisteredHeight};
	}

	_onLayout(layout) {
		// layout: {nativeEvent: { layout: {x, y, width, height}}}
		const measuredHeight = _.get(layout, 'nativeEvent.layout.height');
		const currentHeight = this.state.height;

		// Check if the height of this screen has changed
		if (currentHeight !== Screen.screenInitialHeight)
			return;

		if (currentHeight === measuredHeight)
			return;

		// The height has changed, save it to the screenLastRegisteredHeight so the
		// next component might save a re-render
		Logger.v("Screen _onLayout: Updating for new height: " + measuredHeight);

		Screen.screenLastRegisteredHeight = measuredHeight;
		this.setState({height: measuredHeight});
	}

	render() {
		const {children, style} = this.props;
		const {height} = this.state;

		return (
			<View style={[styles.view, style]} onLayout={this._onLayout}>
				<View style={{height}}>
					<RkAvoidKeyboard style={styles.view} onResponderRelease={event => Keyboard.dismiss()}>
						{children}
					</RkAvoidKeyboard>
				</View>
			</View>
		);
	}

}

// Screen ***********************************************************************************************
// Screen ***********************************************************************************************

const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: Colors.background
	}
});
