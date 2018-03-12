/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {Icon} from 'react-native-elements';

import {View, TouchableNativeFeedback, Image} from 'react-native';
import {RkStyleSheet, RkText, RkButton, RkCard} from 'react-native-ui-kitten';
import DaoFeed from "../../lib/daos/DaoFeed";
import ActionHandler from '../../lib/helpers/ActionHandler';
import DaoFeaturedAd from "../../lib/daos/DaoFeaturedAd";
import type {TFeaturedAd} from "../../lib/daos/DaoFeaturedAd";
import type {TNavigator} from "../../lib/types/Types";

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	navigator: TNavigator,
	featuredAd: TFeaturedAd,

};

// Component ********************************************************************************************
// Component ********************************************************************************************

export default class FeaturedAdsListItem extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._handleClickAction = this._handleClickAction.bind(this);
		this._onItemPress = this._onItemPress.bind(this);
	}

	_featuredAd(): TFeaturedAd {
		return this.props.featuredAd;
	}

	_navigator(): TNavigator {
		return this.props.navigator;
	}


	_onItemPress() {
		const clickAction = DaoFeed.gClickAction(this._featuredAd());

		if (clickAction && ActionHandler.clickActionIsValid(clickAction, this._featuredAd()))
			this._handleClickAction(clickAction);
	}


	_handleClickAction(clickAction: string) {
		ActionHandler.handleAction(clickAction, this._featuredAd(), this._navigator());
	}


	render() {
		return (
			<TouchableNativeFeedback onPress={this._onItemPress}>
				<RkCard rkType='backImg'>
					<Image rkCardImg source={{uri: DaoFeaturedAd.gImage(this._featuredAd())}}/>
					<View rkCardImgOverlay rkCardContent style={styles.overlay}>
						<RkText rkType='header2 inverseColor'>{DaoFeaturedAd.gTitle(this._featuredAd()).toUpperCase()}</RkText>
						<RkText rkType='secondary2 inverseColor'>{DaoFeaturedAd.gSubTitle(this._featuredAd())}</RkText>
						<View rkCardFooter style={styles.footer}>
							{this._renderActionBar()}
						</View>
					</View>
				</RkCard>
			</TouchableNativeFeedback>
		);
	}


	_renderActionBar() {
		const actions = DaoFeaturedAd.gActions(this._featuredAd())
			.filter(clickAction => ActionHandler.clickActionIsValid(clickAction, this._featuredAd()));

		return (
			<View style={styles.actionBarContainer}>
				{actions.map((clickAction, key) => (
					<View key={key} style={styles.actionBarSection}>
						<RkButton rkType='clear' onPress={() => this._handleClickAction(clickAction)}>
							<Icon color='#fff' size={30} {...ActionHandler.mapActionToIcon(clickAction)}/>
						</RkButton>
					</View>
				))}
			</View>
		);
	}

}


// Config *************************************************************************************************
// Config *************************************************************************************************

const styles = RkStyleSheet.create(theme => ({

	listItem: {
		paddingHorizontal: 12,
		display: 'flex',
		alignItems: 'center',
		borderBottomWidth: 0,
		borderColor: theme.colors.border.base,
	},

	listItemHeaderContent: {
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},


	listItemContentText: {
		marginBottom: 3
	},

	listItemContent: {
		marginLeft: 12,
		flex: 1
	},

	root: {
		backgroundColor: theme.colors.screen.base
	},
	overlay: {
		justifyContent: 'flex-end',
	},
	footer: {
		width: '100%'
	},

	actionBarContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	actionBarSection: {
		paddingHorizontal: 8,
		marginLeft: 12,
	},
}));