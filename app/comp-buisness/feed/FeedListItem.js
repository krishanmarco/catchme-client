/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ActionHandler from '../../lib/helpers/ActionHandler';

import DaoFeed from "../../lib/daos/DaoFeed";

import HTMLView from 'react-native-htmlview';

import React from 'react';
import {AvatarCircle, Touchable} from "../../comp/Misc";
import {Col, Grid} from "react-native-easy-grid";
import {ListItemActionIcon} from '../../comp/misc/ListItemsWithActions';
import {RkButton, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {TouchableNativeFeedback, View} from 'react-native';
import type {TFeed} from "../../lib/daos/DaoFeed";
import type {TNavigator} from "../../lib/types/Types";


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	navigator: TNavigator,
	feed: TFeed
};

type State = {
	// Nothing for now
};


// FeedListItem *****************************************************************************************
// FeedListItem *****************************************************************************************

export default class FeedListItem extends React.Component<any, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onItemPress = this._onItemPress.bind(this);
	}

	_navigator(): TNavigator {
		return this.props.navigator;
	}

	_feed(): TFeed {
		return this.props.feed;
	}


	_onItemPress() {
		const clickAction = DaoFeed.gClickAction(this._feed());

		if (clickAction && ActionHandler.clickActionIsValid(clickAction, this._feed()))
			ActionHandler.handleAction(clickAction, this._feed(), this._navigator());

	}


	render() {
		return (
			<Touchable onPress={this._onItemPress}>
				<Grid style={styles.listItem}>
					<Col size={100} style={{marginRight: 8}}>
						<View style={styles.listItemHeaderContent}>
							{this._renderLeftAvatar()}
							<View style={styles.listItemContent}>
								<HTMLView
									style={styles.htmlView}
									value={DaoFeed.gContent(this._feed())}/>
							</View>
						</View>
					</Col>
					{this._renderActions()}
					{this._renderRightAvatar()}
				</Grid>
			</Touchable>
		);
	}


	_renderLeftAvatar() {
		const leftAvatar = DaoFeed.gLeftAvatar(this._feed());
		return leftAvatar && <AvatarCircle uri={leftAvatar}/>;
	}

	_renderRightAvatar() {
		const rightAvatar = DaoFeed.gRightAvatar(this._feed());
		return rightAvatar && (<Col size={20}><AvatarCircle uri={rightAvatar}/></Col>);
	}


	_renderActions() {
		const actions = DaoFeed.gActions(this._feed())
			.filter(clickAction => ActionHandler.clickActionIsValid(clickAction, this._feed()));

		return actions.map((clickAction, key) => {

			const marginRight = key === actions.length ? 0 : 8;
			const actionProps = {
				icon: ActionHandler.mapActionToIcon(clickAction),
				onPress: () => ActionHandler.handleAction(clickAction, this._feed(), this._navigator())
			};

			return (
				<Col key={key} size={15} style={{marginRight}}>
					<ListItemActionIcon {...actionProps}/>
				</Col>
			);

		});
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

	htmlView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap'
	}
}));