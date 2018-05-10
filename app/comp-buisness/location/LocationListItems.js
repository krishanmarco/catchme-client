/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import React from 'react';
import {Colors, Icons} from '../../Config';
import {ListItemWithActionProps} from "../../comp/misc/ListItemsWithActions";
import {ListItemWithActions} from "../../comp/Misc";
import type {TAction} from "../../lib/daos/DaoAction";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TLocationWithULS} from "../../lib/helpers/ULSListManager";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";


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
				avatarSource={{uri: DaoLocation.gPictureUrl(location)}}
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
				onPress: () => addLocationToFavorites(location)
			});
		}

		if (removeLocationFromFavorites) {
			this.actions.push({
				icon: Icons.locationUnfollow,
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
	locationWithULS: TLocationWithULS,
	allowEdit: boolean,
	userLocationStatus: TUserLocationStatus,
	editUserLocationStatus: (TLocationWithULS) => void,
	removeUserLocationStatus: (TLocationWithULS) => void
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
			locationWithULS,
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
				onPress: () => editUserLocationStatus(locationWithULS)
			});
		}

		if (removeUserLocationStatus) {
			this.actions.push({
				icon: Icons.statusDelete,
				onPress: () => removeUserLocationStatus(locationWithULS)
			});
		}

	}

	render() {
		const {
			editUserLocationStatus,
			removeUserLocationStatus,
			allowEdit,
			locationWithULS,
			...props
		} = this.props;

		const userLocationStatus = DaoLocation.gUserLocationStatus(locationWithULS);
		const formattedTime = DaoUserLocationStatus.getFormattedRange(userLocationStatus);
		return (
			<ListItemLocation
				{...props}
				location={locationWithULS}
				content={formattedTime}
				actions={this.actions}/>
		);
	}

}

