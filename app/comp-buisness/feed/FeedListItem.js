/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ActionHandler from '../../lib/helpers/ActionHandler';
import DaoFeed from "../../lib/daos/DaoFeed";
import HTMLView from 'react-native-htmlview';
import React from 'react';
import {AvatarCircle, Touchable} from "../../comp/Misc";
import {Col, Grid} from "react-native-easy-grid";
import {ListItemAction} from '../../comp/misc/ListItemsWithActions';
import {RkStyleSheet} from 'react-native-ui-kitten';
import {View} from 'react-native';
import type {TFeed} from "../../lib/daos/DaoFeed";
import {listItemActions} from "../../lib/theme/Styles";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	feed: TFeed,
	handleClickAction: Function
};

type State = {
	// Nothing for now
};


// FeedListItem *****************************************************************************************
// FeedListItem *****************************************************************************************

export default class FeedListItem extends React.PureComponent<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onFeedItemPress = this._onFeedItemPress.bind(this);
		this._handleClickAction = this._handleClickAction.bind(this);
	}

	_onFeedItemPress(): Promise {
		const {feed} = this.props;

		// Note a feed is also a TAction type
		return this._handleClickAction(DaoFeed.gClickAction(feed), true);
	}

	_handleClickAction(clickAction: string, neverConsume = false): Promise {
		const {handleClickAction, feed} = this.props;
		return handleClickAction(clickAction, feed, neverConsume);
	}

	render() {
		const {feed} = this.props;
		return (
			<Touchable onPress={this._onFeedItemPress}>
				<Grid style={styles.listItem}>
					<Col size={100}>
						<View style={styles.listItemHeaderContent}>
							{this._renderLeftAvatar()}
							<View style={styles.listItemContent}>
								<HTMLView
									style={styles.htmlView}
									value={DaoFeed.gContent(feed)}/>
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
		const {feed} = this.props;
		const leftAvatar = DaoFeed.gLeftAvatar(feed);
		return leftAvatar && (<AvatarCircle source={{uri: leftAvatar}}/>);
	}

	_renderRightAvatar() {
		const {feed} = this.props;
		const rightAvatar = DaoFeed.gRightAvatar(feed);
		return rightAvatar && (<Col size={20}><AvatarCircle source={{uri: rightAvatar}}/></Col>);
	}

	_renderActions() {
		const {feed} = this.props;

		const actions = DaoFeed.gActions(feed)
			.filter(clickAction => ActionHandler.clickActionIsValid(clickAction, feed));

		return actions.map((clickAction, key) => (
			<Col key={key} size={15} style={key === actions.length ? listItemActions.action : listItemActions.actionLast}>
				<ListItemAction
					icon={ActionHandler.mapActionToIcon(clickAction)}
					onPress={() => this._handleClickAction(clickAction)}/>
			</Col>
		));
	}
}


// Config *************************************************************************************************
// Config *************************************************************************************************

const styles = RkStyleSheet.create(theme => ({

	listItem: {
		display: 'flex',
		paddingHorizontal: 12,
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
		flex: 1,
		marginLeft: 12
	},

	htmlView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap'
	}
}));