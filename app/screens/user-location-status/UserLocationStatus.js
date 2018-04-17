/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../lib/daos/DaoLocation";
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import moment from 'moment';
import React from 'react';
import TimestampFormatter from "../../lib/helpers/TimestampFormatter";
import {bindActionCreators} from 'redux';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Colors, Const, Icons} from '../../Config';
import {compareTimeSmaller} from "../../lib/HelperFunctions";
import {Icon} from 'react-native-elements';
import {Image, StyleSheet, View} from 'react-native';
import {poolConnect} from '../../redux/ReduxPool';
import {RkButton, RkText} from "react-native-ui-kitten";
import {Touchable} from "../../comp/Misc";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	locationProfile: TLocation,
	userLocationStatus: TUserLocationStatus,
	onStatusConfirm: (TUserLocationStatus) => void,
	onStatusChange: (TUserLocationStatus) => void,

	dtDateVisible: boolean,
	dtFromVisible: boolean,
	dtUntilVisible: boolean,

	showDateModal: Function,
	hideDateModal: Function,
	showFromModal: Function,
	hideFromModal: Function,
	showUntilModal: Function,
	hideUntilModal: Function
};

type State = {
	// Nothing for now
};


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const userLocationStatusInitState = {
	dtDateVisible: false,
	dtFromVisible: false,
	dtUntilVisible: false
};

const ACTION_SET_DATE_MODAL_VISIBILITY = 'ACTION_SET_DATE_MODAL_VISIBILITY';
const ACTION_SET_FROM_MODAL_VISIBILITY = 'ACTION_SET_FROM_MODAL_VISIBILITY';
const ACTION_SET_UNTIL_MODAL_VISIBILITY = 'ACTION_SET_UNTIL_MODAL_VISIBILITY';

export function userLocationStatusReducer(state = userLocationStatusInitState, action) {
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

const ulsShowDateModal = ({type: ACTION_SET_DATE_MODAL_VISIBILITY, visible: true});
const ulsHideDateModal = ({type: ACTION_SET_DATE_MODAL_VISIBILITY, visible: false});
const ulsShowFromModal = ({type: ACTION_SET_FROM_MODAL_VISIBILITY, visible: true});
const ulsHideFromModal = ({type: ACTION_SET_FROM_MODAL_VISIBILITY, visible: false});
const ulsShowUntilModal = ({type: ACTION_SET_UNTIL_MODAL_VISIBILITY, visible: true});
const ulsHideUntilModal = ({type: ACTION_SET_UNTIL_MODAL_VISIBILITY, visible: false});


// _UserLocationStatus *****************************************************************************
// _UserLocationStatus *****************************************************************************

class _UserLocationStatus extends React.Component<void, Props, State> {
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
		const {locationProfile} = this.props;
		return locationProfile;
	}

	_userLocationStatus(): TUserLocationStatus {
		const {userLocationStatus} = this.props;
		return userLocationStatus;
	}

	_onStatusChange(objectToMerge) {
		const {onStatusChange} = this.props;
		onStatusChange(objectToMerge);
	}

	_onDatePicked(date: Date) {
		const {hideDateModal} = this.props;

		const currentFrom = this._getFromDate();

		currentFrom.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

		this._onStatusChange({[DaoUserLocationStatus.pFromTs]: moment(currentFrom).unix()});
		hideDateModal();
	}

	_onFromPicked(date) {
		const {hideFromModal} = this.props;

		const currentFrom = this._getFromDate();

		currentFrom.setHours(date.getHours(), date.getMinutes(), 0, 0);

		this._onStatusChange({[DaoUserLocationStatus.pFromTs]: moment(currentFrom).unix()});

		hideFromModal();
	}

	_onUntilPicked(date) {
		const {hideUntilModal} = this.props;

		const from = this._getFromDate();
		const until = this._getUntilDate();

		until.setHours(date.getHours(), date.getMinutes(), 0, 0);

		const dateIncr = compareTimeSmaller(until, from) ? 1 : 0;
		until.setFullYear(from.getFullYear(), from.getMonth(), from.getDate() + dateIncr);

		this._onStatusChange({[DaoUserLocationStatus.pUntilTs]: moment(until).unix()});

		hideUntilModal();
	}



	_onHereNowPressed() {
		const from = new Date();
		const until = new Date();

		until.setHours(until.getHours() + Const.userLocationStatusDefaultStayHrs);

		this._onStatusChange({
			[DaoUserLocationStatus.pFromTs]: moment(from).unix(),
			[DaoUserLocationStatus.pUntilTs]: moment(until).unix(),
		});
		this.forceUpdate();
	}

	_onHereLaterPressed() {
		const from = new Date();
		const until = new Date();

		const startHrs = Const.userLocationStatusDefaultLaterStartHrs;
		const stayHrs = Const.userLocationStatusDefaultStayHrs;

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
		const {
			hideDateModal,
			hideFromModal,
			hideUntilModal,
			dtDateVisible,
			dtFromVisible,
			dtUntilVisible
		} = this.props;

		return (
			<View style={styles.root}>
				<Grid style={styles.mainGrid}>
					<Row size={30} style={styles.imageRow}>{this._renderHeaderImage()}</Row>
					<Row size={25} style={styles.contentRow}>{this._renderContent()}</Row>
					<Row size={35} style={styles.timeActionRow}>{this._renderTimeActionButtons()}</Row>
					<Row size={20} style={styles.actionRow}>{this._renderActionButtons()}</Row>
				</Grid>
				<DateTimePicker
					mode='date'
					minimumDate={_UserLocationStatus.DATE_TIME_NOW}
					isVisible={dtDateVisible}
					date={this._getFromDate()}
					onConfirm={this._onDatePicked}
					onCancel={hideDateModal}/>
				<DateTimePicker
					mode='time'
					isVisible={dtFromVisible}
					date={this._getFromDate()}
					onConfirm={this._onFromPicked}
					onCancel={hideFromModal}/>
				<DateTimePicker
					mode='time'
					isVisible={dtUntilVisible}
					date={this._getUntilDate()}
					onConfirm={this._onUntilPicked}
					onCancel={hideUntilModal}/>
			</View>
		);
	}


	_renderHeaderImage() {
		return (
			<Image
				style={styles.headerImage}
				source={ImageURISourceAuth.fromUrl(DaoLocation.gPictureUrl(this._locationProfile()))}/>
		);
	}


	_renderContent() {
		const {showDateModal, showFromModal, showUntilModal} = this.props;
		return (
			<Grid>
				<Row size={30} style={styles.contentAddress}>
					<RkText rkType='secondary3'>
						{DaoLocation.gAddress(this._locationProfile())}
					</RkText>
				</Row>
				<Row size={30} style={styles.contentDate}>
					<Col style={styles.center}>
						<Touchable onPress={showDateModal}>
							<RkText>{TimestampFormatter.parseFromDate(this._getFromMoment())}</RkText>
						</Touchable>
					</Col>
				</Row>
				<Row size={30}>
					<Col size={10} style={styles.right}>
						<Touchable onPress={showFromModal}>
							<RkText rkType='header1'>{this._getFromMoment().format('HH:mm')}</RkText>
						</Touchable>
					</Col>
					<Col size={2} style={styles.center}>
						<RkText rkType='header1'>-</RkText>
					</Col>
					<Col size={10} style={styles.left}>
						<Touchable onPress={showUntilModal}>
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
		const {onStatusConfirm} = this.props;
		return (
			<Grid>
				<Col style={styles.center}>
					<RkButton style={styles.buttonPositive} onPress={onStatusConfirm}>
						Confirm
					</RkButton>
				</Col>
			</Grid>
		);
	}

}


const UserLocationStatus = poolConnect(_UserLocationStatus,
	// mapStateToProps
	(state) => state.userLocationStatusReducer,

	// mapDispatchToProps
	(dispatch) => ({

		showDateModal: bindActionCreators(ulsShowDateModal, dispatch),
		hideDateModal: bindActionCreators(ulsHideDateModal, dispatch),
		showFromModal: bindActionCreators(ulsShowFromModal, dispatch),
		hideFromModal: bindActionCreators(ulsHideFromModal, dispatch),
		showUntilModal: bindActionCreators(ulsShowUntilModal, dispatch),
		hideUntilModal: bindActionCreators(ulsHideUntilModal, dispatch),
	}),

	// Array of pools to subscribe to
	[]
);
export default UserLocationStatus;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
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
	headerImage: {
		width: '100%',
		height: 'auto'
	},
	contentAddress: {
		width: '100%'
	},
	contentDate: {
		marginTop: 24
	}
});