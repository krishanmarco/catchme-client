/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../lib/daos/DaoLocation";
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import ModalUserLocationStatus from './ModalUserLocationStatus';
import React from 'react';
import {CACHE_ID_USER_LOCATION_STATUS} from "../../lib/redux-pool/cache/def/CacheDefUserLocationStatus";
import {CACHE_MAP_ID_LOCATION_PROFILES} from "../../lib/redux-pool/cache-map/def/CacheMapDefLocationProfiles";
import {Const} from "../../Config";
import {FORM_API_ID_EDIT_USER_LOCATION_STATUS} from "../../lib/redux-pool/api-form/def/ApiFormDefUserLocationStatus";
import {NullableObjects, Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import type {TApiFormPool} from "../../lib/redux-pool/api-form/ApiFormPool";
import type {TCacheMapPool} from "../../lib/redux-pool/cache-map/CacheMapPool";
import type {TNavigator} from "../../lib/types/Types";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";


// Const *************************************************************************************************
// Const *************************************************************************************************

export type TModalUserLocationStatusProps = {
	navigator: TNavigator,
	locationId: number,
	initialStatus?: TUserLocationStatus,
	onStatusConfirm?: (TUserLocationStatus) => void,
	postOnConfirm?: boolean
};

const defaultProps = {
	postOnConfirm: true
};

// _ScreenModalUserLocationStatus ***********************************************************************
// _ScreenModalUserLocationStatus ***********************************************************************

class _ScreenModalUserLocationStatus extends React.Component<any, TModalUserLocationStatusProps, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._onStatusConfirm = this._onStatusConfirm.bind(this);
	}

	componentWillMount() {
		const {locationId, navigator} = this.props;

		// Initialize the modals title
		this._cacheMapLocationProfiles().initializeItem(locationId)
			.then(locationProfile => navigator.setTitle({title: DaoLocation.gName(locationProfile)}));

		// Bind the initialStatus to the redux form status
		this._formApiEditUserLocationStatus().change(this._getInitialStatus());
	}

	_getInitialStatus() {
		const {initialStatus, locationId} = this.props;

		// If initialStatus props are set use
		// those as the initial status
		if (initialStatus)
			return initialStatus;


		// Redux pool fallback from initialStatus
		const data = this._cacheMapLocationProfiles().data;
		if (data) {
			const userLocationStatus = data
				.find(uls => DaoUserLocationStatus.gLocationId(uls) == locationId);

			if (userLocationStatus)
				return userLocationStatus;
		}


		// Create new initialStatus fallback from redux pool
		return DaoUserLocationStatus.newInstance(locationId);
	}


	_formApiEditUserLocationStatus(): TApiFormPool {
		return this.props[FORM_API_ID_EDIT_USER_LOCATION_STATUS];
	}

	_cacheMapLocationProfiles(): TCacheMapPool {
		return this.props[CACHE_MAP_ID_LOCATION_PROFILES];
	}

	_onStatusConfirm() {
		const {navigator, postOnConfirm, onStatusConfirm} = this.props;

		const newStatus = this._formApiEditUserLocationStatus().apiInput;

		if (postOnConfirm) {
			this._formApiEditUserLocationStatus().post()
				.then(success => {

					// Notify the parent component that the status has changed
					if (onStatusConfirm)
						onStatusConfirm(newStatus);
				});
		}

		navigator.dismissModal(Const.dismissModalConfig);
	}


	render() {
		const {locationId} = this.props;
		return (
			<Screen>
				<NullableObjects
					objects={[this._cacheMapLocationProfiles().get(locationId)]}
					renderChild={([locationProfile]) => (
						<ModalUserLocationStatus
							locationProfile={locationProfile}
							userLocationStatus={this._formApiEditUserLocationStatus().apiInput}
							onStatusChange={this._formApiEditUserLocationStatus().change}
							onStatusConfirm={this._onStatusConfirm}/>
					)}/>
			</Screen>
		);
	}

}


const ScreenModalUserLocationStatus = poolConnect(_ScreenModalUserLocationStatus,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_EDIT_USER_LOCATION_STATUS, CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_LOCATION_STATUS]
);
export default ScreenModalUserLocationStatus;

