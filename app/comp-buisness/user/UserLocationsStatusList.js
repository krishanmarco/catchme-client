/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from '../../lib/daos/DaoUser';

import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import moment from 'moment';

import React from 'react';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import {ListItemLocation, ListItemLocationFollow, ListItemUserLocationStatus} from '../location/LocationListItems';
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";

type Props = {
	allowEdit: boolean,
	userProfile: TUser,
	onLocationPress: (TLocation) => void,
	favoriteIds?: Array<number>
};

type TLocationWithUserLocationStatus = TLocation & {
	status?: TUserLocationStatus
}

type State = {
	top: Array<TLocation>,
	past: Array<TLocationWithUserLocationStatus>,
	now: Array<TLocationWithUserLocationStatus>,
	future: Array<TLocationWithUserLocationStatus>,
}



export default class UserLocationsStatusList extends React.Component<any, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._renderItem = this._renderItem.bind(this);
		this.state = this._mapPropsToState(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this._mapPropsToState(nextProps));
	}


	_mapPropsToState(props) {
		const user = props.userProfile;

		const state = {
			// top:       Array of TLocation
			// past:      Array of TLocationWithUserLocationStatus
			// now:       Array of TLocationWithUserLocationStatus
			// later:     Array of TLocationWithUserLocationStatus
		};

		// Calculate the top, past, now, later fields with only one iteration of locations

		// Initialize the raw state
		state.top = DaoUser.gLocationsTopIds(user);   // Array of ids
		state.past = [];                              // Array of TUserLocationStatus
		state.now = [];                               // Array of TUserLocationStatus
		state.future = [];                            // Array of TUserLocationStatus

		// Iterate the UserLocationStatuses and populate past, now, later accordingly
		const userLocationStatuses = DaoUser.gLocationsUserLocationStatuses(user);
		const now = moment();
		for (let i = 0; i < userLocationStatuses.length; i++) {
			const uls = userLocationStatuses[i];
			const from = moment(DaoUserLocationStatus.gFromTs(uls) * 1000);
			const until = moment(DaoUserLocationStatus.gUntilTs(uls) * 1000);

			if (now.isBefore(from))
				state.future.push(uls);
			else if (now.isBetween(from, until))
				state.now.push(uls);
			else
				state.past.push(uls);
		}

		// Iterate the Locations and map the ids from state.top, state.past
		// state.now, state.future to TLocation Objects
		const locations = DaoUser.gLocationsLocations(user);
		for (let i = 0; i < locations.length; i++) {
			const location = locations[i];
			const locationId = DaoLocation.gId(location);

			const isUserLocationStatusThisLocation = (userLocationStatus) =>
				DaoUserLocationStatus.gLocationId(userLocationStatus) == locationId;


			// state.top is an array of numbers (ids), use simple indexOf
			const indexOfInTop = state.top.indexOf(locationId);
			if (indexOfInTop !== -1)
				state.top[indexOfInTop] = location;


			// state.past is an array of UserLocationStatuses, use indexOf with callback
			const indexOfInPast = _.findIndex(state.past, isUserLocationStatusThisLocation);
			if (indexOfInPast !== -1)
				state.past[indexOfInPast] = {...location, status: state.past[indexOfInPast]};


			// state.now is an array of UserLocationStatuses, use indexOf with callback
			const indexOfInNow = _.findIndex(state.now, isUserLocationStatusThisLocation);
			if (indexOfInNow !== -1)
				state.now[indexOfInNow] = {...location, status: state.now[indexOfInNow]};


			// state.future is an array of UserLocationStatuses, use indexOf with callback
			const indexOfInFuture = _.findIndex(state.future, isUserLocationStatusThisLocation);
			if (indexOfInFuture !== -1)
				state.future[indexOfInFuture] = {...location, status: state.future[indexOfInFuture]};
		}

		return state;
	}


	_getSections() {
		return [
			{title: 'NOW', data: this.state.now},
			{title: 'LATER', data: this.state.future},
			{title: 'TOP 5 PLACES', data: this.state.top}
		].filter(section => section.data.length > 0);
	}


	render() {
		return (
			<StaticSectionList
				sections={this._getSections()}
				renderItem={({item}) => this._renderItem(item)}/>
		);
	}



	_renderItem(location: TLocationWithUserLocationStatus) {
		const {favoriteIds} = this.props;

		const listItemProps = {
			location,
			onPress: this.props.onLocationPress
		};


		if (location.status) {
			return (
				<ListItemUserLocationStatus
					{...listItemProps}
					allowEdit={this.props.allowEdit}
					status={location.status}/>
			);
		}

		if (favoriteIds && !favoriteIds.includes(DaoLocation.gId(location)))
			return <ListItemLocationFollow {...listItemProps}/>;

		return <ListItemLocation {...listItemProps}/>;
	}


}
