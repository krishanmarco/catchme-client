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
	static ScreenInitialHeight = 0;

	constructor(props, context) {
		super(props, context);
		this._onLayout = this._onLayout.bind(this);
		this.state = {height: 0};
	}

	_onLayout(layout) {
		const {height} = this.state;

		// layout: {nativeEvent: { layout: {x, y, width, height}}}
		const measuredHeight = _.get(layout, 'nativeEvent.layout.height');
		if (height === Screen.ScreenInitialHeight) {
			Logger.v("Screen _onLayout: Updating for new height: " + measuredHeight);
			this.setState({height: measuredHeight});
		}
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
