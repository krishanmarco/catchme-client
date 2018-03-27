/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/01/18 © **/
import DefaultTabBar from './DefaultTabBar';
import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Colors} from "../../../Config";


type Props = {
	icons: Array<Object>,
	children: Array<Node>,
	allowIndexChange?: Function,
	onPreTabChange?: Function,
	onTabChanged?: Function,
	locked?: boolean,
	activeColor?: ?string,
	inactiveColor?: ?string
};

type State = {
	selectedTab: number
};

const DefaultProps = {
	activeColor: Colors.primary,
	inactiveColor: Colors.black,
	locked: false
};

// ScrollableIconTabView ******************************************************************
// ScrollableIconTabView ******************************************************************

export default class ScrollableIconTabView extends React.Component<any, Props, State> {
	static defaultProps = DefaultProps;

	constructor(props, context) {
		super(props, context);
		this._onPreTabChange = this._onPreTabChange.bind(this);
		this._allowTabChange = this._allowTabChange.bind(this);
		this._onTabChanged = this._onTabChanged.bind(this);
		this._renderDefaultTabBar = this._renderDefaultTabBar.bind(this);
		this.state = {selectedTab: 0};
	}

	_allowTabChange(nextIndex) {
		const {allowIndexChange} = this.props;
		const {selectedTab} = this.state;

		if (allowIndexChange)
			return allowIndexChange(selectedTab, nextIndex);

		return true;
	}

	_onPreTabChange(nextIndex) {
		const {onPreTabChange} = this.props;
		const currentTab = this.state.selectedTab;

		if (onPreTabChange)
			onPreTabChange(currentTab, nextIndex);

		// Important: Do not use setState because if you
		// trigger an update you will get indirect recursion
		this.state.selectedTab = nextIndex;
	}

	_onTabChanged({i, ref}) {
		const changedToIndex = i;
		const {onTabChanged} = this.props;

		if (onTabChanged)
			onTabChanged(changedToIndex, changedToIndex, ref);
	}


	render() {
		const {children, locked} = this.props;
		const {selectedTab} = this.state;

		return (
			<ScrollableTabView
				onChangeTab={this._onTabChanged}
				renderTabBar={this._renderDefaultTabBar}
				locked={locked}

				scrollWithoutAnimation={true}
				prerenderingSiblingsNumber={2}>
				{children}
			</ScrollableTabView>
		);
	}

	_renderDefaultTabBar(props) {
		const {activeColor, inactiveColor, icons} = this.props;
		return (
			<DefaultTabBar
				{...props}
				onPreTabChange={this._onPreTabChange}
				allowTabChange={this._allowTabChange}
				activeColor={activeColor}
				inactiveColor={inactiveColor}
				icons={icons}/>
		);
	}

}

