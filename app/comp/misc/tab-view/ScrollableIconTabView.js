/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/01/18 © **/
import DefaultTabBar from './DefaultTabBar';
import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Colors} from "../../../Config";


type Props = {
	allowIndexChange?: Function,
	onPreTabChange?: Function,
	onTabChanged?: Function,
	icons: Array<Object>,
	children: Array<Node>
};

type State = {
	selectedTab: number
};

// ScrollableIconTabView ******************************************************************
// ScrollableIconTabView ******************************************************************

export default class ScrollableIconTabView extends React.Component<any, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onPreTabChange = this._onPreTabChange.bind(this);
		this._allowTabChange = this._allowTabChange.bind(this);
		this._onTabChanged = this._onTabChanged.bind(this);
		this._renderCustomTabBar = this._renderCustomTabBar.bind(this);
		this.state = {selectedTab: 0};
	}

	_allowTabChange(nextIndex) {
		const {selectedTab} = this.state;

		if (this.props.allowIndexChange)
			return this.props.allowIndexChange(selectedTab, nextIndex);

		return true;
	}

	_onPreTabChange(nextIndex) {
		const {selectedTab} = this.state;

		if (this.props.onPreTabChange)
			this.props.onPreTabChange(selectedTab, nextIndex);
	}

	_onTabChanged({i, ref}) {
		const changedToIndex = i;

		// Important: Do not use setState because if you
		// trigger an update you will get indirect recursion
		this.state.selectedTab = changedToIndex;

		if (this.props.onTabChanged)
			this.props.onTabChanged(changedToIndex, ref);
	}


	render() {
		return (
			<ScrollableTabView
				initialPage={this.state.selectedTab}
				onChangeTab={this._onTabChanged}
				renderTabBar={this._renderCustomTabBar}

				scrollWithoutAnimation={true}
				prerenderingSiblingsNumber={2}>
				{this.props.children}
			</ScrollableTabView>
		);
	}

	_renderCustomTabBar(props) {
		return (
			<DefaultTabBar
				{...props}
				onPreTabChange={this._onPreTabChange}
				allowTabChange={this._allowTabChange}
				activeColor={Colors.primary}
				inactiveColor={Colors.black}
				icons={this.props.icons}/>
		);
	}

}

