/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ActionHandler from '../../lib/helpers/ActionHandler';
import DaoFeaturedAd from '../../lib/daos/DaoFeaturedAd';
import React from 'react';
import {Icon} from 'react-native-elements';
import {Image, View, StyleSheet} from 'react-native';
import {RkButton, RkCard, RkText} from 'react-native-ui-kitten';
import {Touchable} from '../../comp/Misc';
import type {TFeaturedAd} from '../../lib/daos/DaoFeaturedAd';
import {Colors} from "../../Config";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	featuredAd: TFeaturedAd,
	handleClickAction: Function
};

// FeaturedAdsListItem **********************************************************************************
// FeaturedAdsListItem **********************************************************************************

export default class FeaturedAdsListItem extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onFeaturedAdItemPress = this._onFeaturedAdItemPress.bind(this);
		this._handleClickAction = this._handleClickAction.bind(this);
	}

	_onFeaturedAdItemPress(): Promise {
		const {featuredAd} = this.props;
		return this._handleClickAction(DaoFeaturedAd.gClickAction(featuredAd), true);
	}

	_handleClickAction(clickAction: string, neverConsume = false): Promise {
		const {featuredAd, handleClickAction} = this.props;

		// Note a featuredAd is also a TAction type
		return handleClickAction(clickAction, featuredAd, neverConsume);
	}


	render() {
		const {featuredAd} = this.props;

		return (
			<Touchable onPress={this._onFeaturedAdItemPress}>
				<RkCard rkType='backImg'>
					<Image rkCardImg source={{uri: DaoFeaturedAd.gImage(featuredAd)}}/>
					<View rkCardImgOverlay rkCardContent style={styles.overlay}>
						<RkText rkType='header2 inverseColor'>{DaoFeaturedAd.gTitle(featuredAd).toUpperCase()}</RkText>
						<RkText rkType='secondary2 inverseColor'>{DaoFeaturedAd.gSubTitle(featuredAd)}</RkText>
						<View rkCardFooter style={styles.footer}>
							{this._renderActionBar()}
						</View>
					</View>
				</RkCard>
			</Touchable>
		);
	}


	_renderActionBar() {
		const {featuredAd} = this.props;

		const actions = DaoFeaturedAd.gActions(featuredAd)
			.filter(clickAction => ActionHandler.clickActionIsValid(clickAction, featuredAd));

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

const styles = StyleSheet.create({

	listItem: {
		display: 'flex',
		paddingHorizontal: 12,
		alignItems: 'center',
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
		flex: 1,
		marginLeft: 12
	},

	root: {
		backgroundColor: Colors.background
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
});