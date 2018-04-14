/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import React from 'react';
import TimestampFormatter from "../../lib/helpers/TimestampFormatter";
import {Colors, Icons} from '../../Config';
import {ListItemWithActions} from "../../comp/Misc";
import type {TAction} from "../../lib/daos/DaoAction";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";


// ListItemLocation *************************************************************************************
// ListItemLocation *************************************************************************************

type ListItemLocationProps = {
	location: TLocation,
	onPress?: (TLocation) => void,
	content: ?string,
	image: ?string,
	actions: Array<TAction>
};

export class ListItemLocation extends React.Component<void, ListItemLocationProps, void> {

	constructor(props, context) {
		super(props, context);
		this._defaultOnPress = this._defaultOnPress.bind(this);
	}

	_defaultOnPress() {
		const {location, onPress} = this.props;

		if (onPress)
			onPress(location);
	}


	render() {
		const {content, image, actions, location} = this.props;

		return (
			<ListItemWithActions
				onPress={this._defaultOnPress}
				header={DaoLocation.gName(location)}
				content={content || DaoLocation.gDescription(location)}
				avatarUri={DaoLocation.gPictureUrl(location)}
				image={image}
				actions={actions}/>
		);
	}

}


// ListItemLocationFollow *******************************************************************************
// ListItemLocationFollow *******************************************************************************

export const ListItemLocationFollow = ({location, onPress}: ListItemLocationProps) => (
	<ListItemLocation
		location={location}
		onPress={onPress}
		actions={[{
			icon: Icons.locationFollow,
			color: Colors.primary,
			onPress: () => ApiClient.userLocationsFavoritesAddLid(DaoLocation.gId(location))
		}]}/>
);




// ListItemUserLocationStatus ***************************************************************************
// ListItemUserLocationStatus ***************************************************************************

type ListItemUserLocationStatusProps = TLocation & {
	allowEdit: boolean,
	userLocationStatus: TUserLocationStatus,
	onEditPress: (TUserLocationStatus, TLocation) => void,
	onDeletePress: (TUserLocationStatus) => void
}

export class ListItemUserLocationStatus extends React.Component<void, ListItemUserLocationStatusProps, void> {

	constructor(props, context) {
		super(props, context);
		this._onEditPress = this._onEditPress.bind(this);
		this._onDeletePress = this._onDeletePress.bind(this);
		this._setActions(props);
	}

	componentWillReceiveProps(nextProps) {
		this._setActions(nextProps);
	}

	_setActions(props) {
		const {allowEdit} = props;

		if (!allowEdit) {
			this.editActions = [];
			return;
		}

		this.editActions = [{
			icon: Icons.statusEdit,
			color: Colors.neutralOrange,
			onPress: this._onEditPress
		}, {
			icon: Icons.statusDelete,
			color: Colors.alertRed,
			onPress: this._onDeletePress
		}];

	}

	_getFormattedRange() {
		const {userLocationStatus} = this.props;
		const fromTs = DaoUserLocationStatus.gFromTs(userLocationStatus);
		const toTs = DaoUserLocationStatus.gUntilTs(userLocationStatus);
		return TimestampFormatter.parseFromTo(fromTs, toTs);
	}

	_onEditPress() {
		const {userLocationStatus, location, onEditPress} = this.props;
		onEditPress(userLocationStatus, location);
	}

	_onDeletePress() {
		const {userLocationStatus, onDeletePress} = this.props;
		onDeletePress(userLocationStatus);
	}

	render() {
		const {location, onPress} = this.props;
		return (
			<ListItemLocation
				location={location}
				onPress={onPress}
				content={this._getFormattedRange()}
				actions={this.editActions}/>
		);
	}

}

