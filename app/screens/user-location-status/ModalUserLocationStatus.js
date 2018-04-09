/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../lib/daos/DaoLocation";
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import moment from 'moment';
import React from 'react';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Colors, Const, Icons} from '../../Config';
import {compareTimeSmaller} from "../../lib/HelperFunctions";
import {Icon} from 'react-native-elements';
import {Image, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {poolConnect} from '../../redux/ReduxPool';
import {RkButton, RkText} from "react-native-ui-kitten";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";
import {Touchable} from "../../comp/Misc";




// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	locationProfile: TLocation,
	userLocationStatus: TUserLocationStatus,
	onStatusConfirm: (TUserLocationStatus) => {},
	onStatusChange: (TUserLocationStatus) => {},

	dtDateVisible: boolean,
	dtFromVisible: boolean,
	dtUntilVisible: boolean
};

type State = {
	// Nothing for now
};


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const modalUserLocationStatusInitState = {
	dtDateVisible: false,
	dtFromVisible: false,
	dtUntilVisible: false
};

const ACTION_SET_DATE_MODAL_VISIBILITY = 'ACTION_SET_DATE_MODAL_VISIBILITY';
const ACTION_SET_FROM_MODAL_VISIBILITY = 'ACTION_SET_FROM_MODAL_VISIBILITY';
const ACTION_SET_UNTIL_MODAL_VISIBILITY = 'ACTION_SET_UNTIL_MODAL_VISIBILITY';

export function modalUserLocationStatusReducer(state = modalUserLocationStatusInitState, action) {
	switch (action.type) {

		case ACTION_SET_DATE_MODAL_VISIBILITY:
			return Object.assign({}, state, {
				dtDateVisible: action.visible
			});

		case ACTION_SET_FROM_MODAL_VISIBILITY:
			return Object.assign({}, state, {
				dtFromVisible: action.visible
			});

		case ACTION_SET_UNTIL_MODAL_VISIBILITY:
			return Object.assign({}, state, {
				dtUntilVisible: action.visible
			});

	}

	return state;
}

function modalUserLocationStatusSetDateModalVisibility(visible) {
	return {
		type: ACTION_SET_DATE_MODAL_VISIBILITY,
		visible
	};
}

function modalUserLocationStatusSetFromModalVisibility(visible) {
	return {
		type: ACTION_SET_FROM_MODAL_VISIBILITY,
		visible
	};
}

function modalUserLocationStatusSetUntilModalVisibility(visible) {
	return {
		type: ACTION_SET_UNTIL_MODAL_VISIBILITY,
		visible
	};
}

// _ModalUserLocationStatus *****************************************************************************
// _ModalUserLocationStatus *****************************************************************************

class _ModalUserLocationStatus extends React.Component<any, Props, State> {
	static DATE_TIME_NOW = new Date();

	constructor(props, context) {
		super(props, context);
		this._onDatePicked = this._onDatePicked.bind(this);
		this._onFromPicked = this._onFromPicked.bind(this);
		this._onUntilPicked = this._onUntilPicked.bind(this);
		this._onHereNowPressed = this._onHereNowPressed.bind(this);
		this._onHereLaterPressed = this._onHereLaterPressed.bind(this);
	}


	_locationProfile(): TLocation {
		return this.props.locationProfile;
	}

	_userLocationStatus(): TUserLocationStatus {
		return this.props.userLocationStatus;
	}

	_onStatusChange(objectToMerge) {
		this.props.onStatusChange(objectToMerge);
	}

	_onDatePicked(date: Date) {
		const currentFrom = this._getFromDate();

		currentFrom.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

		this._onStatusChange({[DaoUserLocationStatus.pFromTs]: moment(currentFrom).unix()});
		this.props.setDateModalVisibility(false);
	}

	_onFromPicked(date) {
		const currentFrom = this._getFromDate();

		currentFrom.setHours(date.getHours(), date.getMinutes(), 0, 0);

		this._onStatusChange({[DaoUserLocationStatus.pFromTs]: moment(currentFrom).unix()});
		this.props.setFromModalVisibility(false);
	}

	_onUntilPicked(date) {
		const from = this._getFromDate();
		const until = this._getUntilDate();

		until.setHours(date.getHours(), date.getMinutes(), 0, 0);

		const dateIncr = compareTimeSmaller(until, from) ? 1 : 0;
		until.setFullYear(from.getFullYear(), from.getMonth(), from.getDate() + dateIncr);

		this._onStatusChange({[DaoUserLocationStatus.pUntilTs]: moment(until).unix()});
		this.props.setUntilModalVisibility(false);
	}



	_onHereNowPressed() {
		const from = new Date();
		const until = new Date();

		until.setHours(until.getHours() + Const.UserLocationStatus.defaultStayHrs);

		this._onStatusChange({
			[DaoUserLocationStatus.pFromTs]: moment(from).unix(),
			[DaoUserLocationStatus.pUntilTs]: moment(until).unix(),
		});
		this.forceUpdate();
	}

	_onHereLaterPressed() {
		const from = new Date();
		const until = new Date();

		const startHrs = Const.UserLocationStatus.defaultLaterStartHrs;
		const stayHrs = Const.UserLocationStatus.defaultStayHrs;

		if (from.getHours() < startHrs)
			from.setHours(startHrs, 0, 0, 0);
		else from.setHours(from.getHours(), 0, 0, 0);

		until.setHours(startHrs + stayHrs, 0, 0, 0);

		this._onStatusChange({
			[DaoUserLocationStatus.pFromTs]: moment(from).unix(),
			[DaoUserLocationStatus.pUntilTs]: moment(until).unix(),
		});
		this.forceUpdate();
	}


	_getStatusDateString() {
		return this._getFromMoment().calendar(null, {
			sameDay: `[${'Today'}], ddd Do`,
			nextDay: `[${'Tomorrow'}], ddd Do`,
			nextWeek: 'dddd Do',
			lastDay: 'dddd Do',
			lastWeek: 'dddd Do',
			sameElse: 'dddd Do'
		});
	}

	_getFromDate() {
		const fromSec = DaoUserLocationStatus.gFromTs(this._userLocationStatus());
		return new Date(fromSec * 1000);
	}

	_getUntilDate() {
		const untilSec = DaoUserLocationStatus.gUntilTs(this._userLocationStatus());
		return new Date(untilSec * 1000);
	}

	_getFromMoment() {
		const fromSec = DaoUserLocationStatus.gFromTs(this._userLocationStatus());
		return moment(fromSec * 1000);
	}

	_getUntilMoment() {
		const untilSec = DaoUserLocationStatus.gUntilTs(this._userLocationStatus());
		return moment(untilSec * 1000);
	}

	_getHereNowColor() {
		if (moment().isBetween(this._getFromMoment(), this._getUntilMoment()))
			return Colors.primary;

		return Colors.black;
	}

	_getHereLaterColor() {
		if (moment().isBefore(this._getFromMoment()))
			return Colors.primary;

		return Colors.black;
	}


	render() {
		return (
			<View style={{flex: 1}}>
				<Grid style={styles.mainGrid}>
					<Row size={30} style={styles.imageRow}>{this._renderHeaderImage()}</Row>
					<Row size={25} style={styles.contentRow}>{this._renderContent()}</Row>
					<Row size={35} style={styles.timeActionRow}>{this._renderTimeActionButtons()}</Row>
					<Row size={20} style={styles.actionRow}>{this._renderActionButtons()}</Row>
				</Grid>
				<DateTimePicker
					mode='date'
					minimumDate={_ModalUserLocationStatus.DATE_TIME_NOW}
					isVisible={this.props.dtDateVisible}
					date={this._getFromDate()}
					onConfirm={this._onDatePicked}
					onCancel={() => this.props.setDateModalVisibility(false)}/>
				<DateTimePicker
					mode='time'
					isVisible={this.props.dtFromVisible}
					date={this._getFromDate()}
					onConfirm={this._onFromPicked}
					onCancel={() => this.props.setFromModalVisibility(false)}/>
				<DateTimePicker
					mode='time'
					isVisible={this.props.dtUntilVisible}
					date={this._getUntilDate()}
					onConfirm={this._onUntilPicked}
					onCancel={() => this.props.setUntilModalVisibility(false)}/>
			</View>
		);
	}


	_renderHeaderImage() {
		return (
			<Image
				style={{width: '100%', height: 'auto'}}
				source={ImageURISourceAuth.fromUrl(DaoLocation.gPictureUrl(this._locationProfile()))}/>
		);
	}


	_renderContent() {
		return (
			<Grid>
				<Row size={30} style={{width: '100%'}}>
					<RkText rkType='secondary3'>
						{DaoLocation.gAddress(this._locationProfile())}
					</RkText>
				</Row>
				<Row size={30} style={{marginTop: 24}}>
					<Col style={styles.center}>
						<Touchable onPress={() => this.props.setDateModalVisibility(true)}>
							<RkText>{this._getStatusDateString()}</RkText>
						</Touchable>
					</Col>
				</Row>
				<Row size={30}>
					<Col size={10} style={styles.right}>
						<Touchable onPress={() => this.props.setFromModalVisibility(true)}>
							<RkText rkType='header1'>{this._getFromMoment().format('HH:mm')}</RkText>
						</Touchable>
					</Col>
					<Col size={2} style={styles.center}>
						<RkText rkType='header1'>-</RkText>
					</Col>
					<Col size={10} style={styles.left}>
						<Touchable onPress={() => this.props.setUntilModalVisibility(true)}>
							<RkText rkType='header1'>{this._getUntilMoment().format('HH:mm')}</RkText>
						</Touchable>
					</Col>
				</Row>
			</Grid>
		);
	}


	_renderTimeActionButtons() {
		return (
			<Grid>
				<Col style={styles.center}>
					<View>
						<Touchable onPress={this._onHereNowPressed}>
							<Icon
								size={55}
								{...{...Icons.locationPersonFuture, color: this._getHereNowColor()}}/>
							<RkText rkType='secondary2'>I am here now</RkText>
						</Touchable>
					</View>
				</Col>
				<Col style={styles.center}>
					<View>
						<Touchable onPress={this._onHereLaterPressed}>
							<Icon
								size={55}
								{...{...Icons.locationPersonFuture, color: this._getHereLaterColor()}}/>
							<RkText rkType='secondary2'>I will be here later</RkText>
						</Touchable>
					</View>
				</Col>
			</Grid>
		);
	}


	_renderActionButtons() {
		return (
			<Grid>
				<Col style={styles.center}>
					<RkButton style={styles.buttonPositive} onPress={this.props.onStatusConfirm}>Confirm</RkButton>
				</Col>
			</Grid>
		);
	}

}


const ModalUserLocationStatus = poolConnect(_ModalUserLocationStatus,
	// mapStateToProps
	(state) => state.modalUserLocationStatusReducer,

	// mapDispatchToProps
	(dispatch) => ({
		setDateModalVisibility: (visible) => dispatch(modalUserLocationStatusSetDateModalVisibility(visible)),
		setFromModalVisibility: (visible) => dispatch(modalUserLocationStatusSetFromModalVisibility(visible)),
		setUntilModalVisibility: (visible) => dispatch(modalUserLocationStatusSetUntilModalVisibility(visible))
	}),

	// Array of pools to subscribe to
	[]
);
export default ModalUserLocationStatus;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	mainGrid: {
		flex: 1,
		flexDirection: 'column'
	},
	imageRow: {
		maxHeight: '40%'
	},
	contentRow: {
		paddingHorizontal: 16,
		marginTop: 16,
	},
	timeActionRow: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	actionRow: {
		alignItems: 'flex-end'
	},
	center: {
		alignItems: 'center',
		width: '100%'
	},
	left: {
		alignItems: 'flex-start',
		width: '100%'
	},
	right: {
		alignItems: 'flex-end',
		width: '100%'
	},

	buttonPositive: {
		borderRadius: 0,
		width: '100%',
		height: 55,
		backgroundColor: '#25A59A'
	},
	buttonNegative: {
		borderRadius: 0,
		width: '100%',
		height: 55,
		backgroundColor: '#BA000D'
	},
});