/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
// https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/DefaultTabBar.js
import Button from './button/Button';
import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Colors} from "../../../Config";
import {Icon} from 'react-native-elements';
import type {TIcon} from "../../../lib/types/Types";


type Props = {
	allowTabChange?: (number) => boolean,
	onPreTabChange?: (number) => void,

	activeColor?: string,
	inactiveColor?: string,

	tabs: Array<Node>,
	icons: Array<{[string]: TIcon}>,

	tabStyle?: Object,
	style?: Object,

	// Props coming from ScrollableIconTabView
	goToPage: (number) => void,
	activeTab: number,
	containerWidth: number,
	scrollValue: Object,
}

const DefaultProps = {
	activeColor: 'navy',
	inactiveColor: 'black',
};


export default class DefaultTabBar extends React.Component<void, Props, void> {
	static defaultProps = DefaultProps;

	constructor(props, context) {
		super(props, context);
		this._onTabChange = this._onTabChange.bind(this);
		this._renderTab = this._renderTab.bind(this);
	}


	_getForegroundColor(icon, isTabActive) {
		const {activeColor, inactiveColor} = this.props;

		if (isTabActive) {
			if (activeColor)
				return activeColor;

			if (icon.color)
				return icon.color;

			return Colors.primary;
		}

		if (inactiveColor)
			return inactiveColor;

		if (icon.color)
			return icon.color;

		return Colors.black;
	}


	_onTabChange(page, name) {
		const {goToPage, allowTabChange, onPreTabChange} = this.props;

		const index = parseInt(name, 10);

		if (allowTabChange && !allowTabChange(index))
			return;

		if (onPreTabChange)
			onPreTabChange(index);

		goToPage(index);
	}



	render() {
		const {containerWidth, tabs, style, scrollValue} = this.props;

		const tabWidth = containerWidth / tabs.length;

		const translateX = scrollValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, tabWidth],
		});

		return (
			<View style={[styles.tabs, style]}>

				{tabs.map(this._renderTab)}

				<Animated.View style={[styles.tabUnderline, {
					width: tabWidth,
					transform: [{translateX}]
				}]}/>

			</View>
		);
	}



	_renderTab(name, page) {
		const {activeTab, icons, tabStyle} = this.props;

		const isTabActive = activeTab === page;
		const icon = icons[parseInt(name, 10)];

		return (
			<Button
				style={styles.button}
				key={name}
				accessible={true}
				accessibilityLabel={name}
				accessibilityTraits='button'
				onPress={() => this._onTabChange(page, name)}>
				<View style={[styles.tab, tabStyle]}>
					<Icon
						{...icon}
						color={this._getForegroundColor(icon, isTabActive)}
						size={24}/>
				</View>
			</Button>
		);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 8,
		paddingTop: 5,
	},
	tabs: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderColor: '#ccc',
		backgroundColor: Colors.background
	},
	tabUnderline: {
		position: 'absolute',
		width: '100%',
		height: 2,
		backgroundColor: Colors.primary,
		bottom: 0,
	},
	button: {
		flex: 1
	}
});

