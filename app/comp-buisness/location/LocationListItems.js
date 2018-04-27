/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import React from 'react';
import {Colors, Icons} from '../../Config';
import {ListItemWithActions} from "../../comp/Misc";
import type {TAction} from "../../lib/daos/DaoAction";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";
import {ListItemWithActionProps} from "../../comp/misc/ListItemsWithActions";


// ListItemLocation *************************************************************************************
// ListItemLocation *************************************************************************************

export type ListItemLocationProps = ListItemWithActionProps & {
	location: TLocation,
	content?: string,
	actions?: Array<TAction>
};

export class ListItemLocation extends React.PureComponent<void, ListItemLocationProps, void> {

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
		const {location, content, ...props} = this.props;

		return (
			<ListItemWithActions
				{...props}
				header={DaoLocation.gName(location)}
				content={content || DaoLocation.gDescription(location)}
				avatarUri={DaoLocation.gPictureUrl(location)}
				onPress={this._defaultOnPress}/>
		);
	}

}


// ListItemLocationFollow *******************************************************************************
// ListItemLocationFollow *******************************************************************************

export type ListItemLocationFollowProps = ListItemLocationProps & {
	addLocationToFavorites?: (TLocation) => void,
	removeLocationFromFavorites?: (TLocation) => void,
};

export class ListItemLocationFollow extends React.PureComponent<void, ListItemLocationFollowProps, void> {

	constructor(props, context) {
		super(props, context);
		this.initialize();
	}

	componentWillReceiveProps(props) {
		this.initialize(props);
	}

	initialize(props = this.props) {
		const {
			location,
			addLocationToFavorites,
			removeLocationFromFavorites,
		} = props;

		this.actions = [];

		if (addLocationToFavorites) {
			this.actions.push({
				icon: Icons.locationFollow,
				color: Colors.primary,
				onPress: () => addLocationToFavorites(location)
			});
		}

		if (removeLocationFromFavorites) {
			this.actions.push({
				icon: Icons.locationFollow,
				color: Colors.alertRed,
				onPress: () => removeLocationFromFavorites(location)
			});
		}

	}

	render() {
		const {addLocationToFavorites, removeLocationFromFavorites, ...props} = this.props;

		return (
			<ListItemLocation
				{...props}
				actions={this.actions}/>
		);
	}

}


// ListItemUserLocationStatus ***************************************************************************
// ListItemUserLocationStatus ***************************************************************************

type ListItemUserLocationStatusProps = ListItemLocation & {
	allowEdit: boolean,
	userLocationStatus: TUserLocationStatus,
	editUserLocationStatus: (TUserLocationStatus, TLocation) => void,
	removeUserLocationStatus: (TUserLocationStatus, TLocation) => void
}

export class ListItemUserLocationStatus extends React.PureComponent<void, ListItemUserLocationStatusProps, void> {

	constructor(props, context) {
		super(props, context);
		this.initialize(props);
	}

	componentWillReceiveProps(nextProps) {
		this.initialize(nextProps);
	}

	initialize(props) {
		const {
			location,
			userLocationStatus,
			allowEdit,
			editUserLocationStatus,
			removeUserLocationStatus
		} = props;

		this.actions = [];

		if (!allowEdit)
			return;

		if (editUserLocationStatus) {
			this.actions.push({
				icon: Icons.statusEdit,
				color: Colors.neutralOrange,
				onPress: () => editUserLocationStatus(userLocationStatus, location)
			});
		}

		if (removeUserLocationStatus) {
			this.actions.push({
				icon: Icons.statusDelete,
				color: Colors.alertRed,
				onPress: () => removeUserLocationStatus(userLocationStatus, location)
			});
		}

	}

	render() {
		const {editUserLocationStatus, removeUserLocationStatus, allowEdit, userLocationStatus, ...props} = this.props;
		return (
			<ListItemLocation
				{...props}
				content={DaoUserLocationStatus.getFormattedRange(userLocationStatus)}
				actions={this.actions}/>
		);
	}

}

