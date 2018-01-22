/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Colors, Const, Icons} from '../../Config';
import {Screen} from "../../comp/Misc";
import PropTypes from 'prop-types';
import {poolConnect, FORM_API_ID_EDIT_USER_LOCATION_STATUS} from '../../redux/ReduxPool';
import {Row, Grid, Col} from "react-native-easy-grid";
import {RkText, RkButton} from "react-native-ui-kitten";
import {View, StyleSheet, Image, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import {compareTimeSmaller} from "../../lib/HelperFunctions";
import moment from 'moment';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import DaoLocation from "../../lib/daos/DaoLocation";
import {Icon} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import type {TLocation} from "../../lib/daos/DaoLocation";


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  location: TLocation,
  onStatusConfirm: () => {}, // todo define a LocationStatus type
  initialStatus: Object // todo define a LocationStatus type
};

export type TModalUserLocationStatusProps = Props;

type State = {

};

// ModalUserLocationStatus ******************************************************************************
// ModalUserLocationStatus ******************************************************************************

class ModalUserLocationStatusPresentational extends React.Component<any, Props, State> {
  static DATE_TIME_NOW = new Date();

  constructor(props, context) {
    super(props, context);
    this._onDatePressed = this._onDatePressed.bind(this);
    this._onFromPressed = this._onFromPressed.bind(this);
    this._onUntilPressed = this._onUntilPressed.bind(this);
    this._onDateCanceled = this._onDateCanceled.bind(this);
    this._onFromCanceled = this._onFromCanceled.bind(this);
    this._onUntilCanceled = this._onUntilCanceled.bind(this);
    this._onDatePicked = this._onDatePicked.bind(this);
    this._onFromPicked = this._onFromPicked.bind(this);
    this._onUntilPicked = this._onUntilPicked.bind(this);
    this._onStatusConfirm = this._onStatusConfirm.bind(this);
    this._onHereNowPressed = this._onHereNowPressed.bind(this);
    this._onHereLaterPressed = this._onHereLaterPressed.bind(this);

    this.state = {
      dtDateVisible: false,
      dtFromVisible: false,
      dtUntilVisible: false
    };

  }


  componentWillMount() {
    let initialStatus = this._initialStatus();

    if (!initialStatus)
      initialStatus = DaoUserLocationStatus.createInitialStatus(DaoLocation.gId(this._location()));
    
    this._formApiEditUserLocationStatus().change(initialStatus);
  }


  _formApiEditUserLocationStatus() { return this.props[FORM_API_ID_EDIT_USER_LOCATION_STATUS]; }
  _formApiEditUserLocationStatusInput() { return this.props[FORM_API_ID_EDIT_USER_LOCATION_STATUS].apiInput; }

  _initialStatus() { return this.props.initialStatus; }
  _location() { return this.props.location; }
  _onStatusConfirm() { this.props.onStatusConfirm(this._formApiEditUserLocationStatusInput()); }


  _onDatePressed() { this.setState({dtDateVisible: true}); }
  _onFromPressed() { this.setState({dtFromVisible: true}); }
  _onUntilPressed() { this.setState({dtUntilVisible: true}); }

  _onDateCanceled() { this.setState({dtDateVisible: false}); }
  _onFromCanceled() { this.setState({dtFromVisible: false}); }
  _onUntilCanceled() { this.setState({dtUntilVisible: false}); }


  _onDatePicked(date: Date) {
    const currentFrom = this._getFromDate();

    currentFrom.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    this._formApiEditUserLocationStatus().change({
      [DaoUserLocationStatus.pFromTs]: moment(currentFrom).unix(),
    });
    this.setState({dtDateVisible: false});
  }

  _onFromPicked(date) {
    const currentFrom = this._getFromDate();

    currentFrom.setHours(date.getHours(), date.getMinutes(), 0, 0);

    this._formApiEditUserLocationStatus().change({
      [DaoUserLocationStatus.pFromTs]: moment(currentFrom).unix()
    });
    this.setState({dtFromVisible: false});
  }

  _onUntilPicked(date) {
    const from = this._getFromDate();
    const until = this._getUntilDate();

    until.setHours(date.getHours(), date.getMinutes(), 0, 0);

    const dateIncr = compareTimeSmaller(until, from) ? 1 : 0;
    until.setFullYear(from.getFullYear(), from.getMonth(), from.getDate() + dateIncr);


    this._formApiEditUserLocationStatus().change({
      [DaoUserLocationStatus.pUntilTs]: moment(until).unix()
    });
    this.setState({dtUntilVisible: false});
  }


  _onHereNowPressed() {
    const from = new Date();
    const until = new Date();

    until.setHours(until.getHours() + Const.UserLocationStatus.defaultStayHrs);

    this._formApiEditUserLocationStatus().change({
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

    this._formApiEditUserLocationStatus().change({
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
    const fromSec = DaoUserLocationStatus.gFromTs(this._formApiEditUserLocationStatusInput());
    return new Date(fromSec * 1000);
  }

  _getUntilDate() {
    const untilSec = DaoUserLocationStatus.gUntilTs(this._formApiEditUserLocationStatusInput());
    return new Date(untilSec * 1000);
  }

  _getFromMoment() {
    const fromSec = DaoUserLocationStatus.gFromTs(this._formApiEditUserLocationStatusInput());
    return moment(fromSec * 1000);
  }

  _getUntilMoment() {
    const untilSec = DaoUserLocationStatus.gUntilTs(this._formApiEditUserLocationStatusInput());
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
        <Screen>
          <Grid style={Styles.mainGrid}>
            <Row size={30} style={Styles.imageRow}>{this._renderHeaderImage()}</Row>
            <Row size={25} style={Styles.contentRow}>{this._renderContent()}</Row>
            <Row size={35} style={Styles.timeActionRow}>{this._renderTimeActionButtons()}</Row>
            <Row size={20} style={Styles.actionRow}>{this._renderActionButtons()}</Row>
          </Grid>
          <DateTimePicker
              mode='date'
              minimumDate={ModalUserLocationStatusPresentational.DATE_TIME_NOW}
              isVisible={this.state.dtDateVisible}
              date={this._getFromDate()}
              onConfirm={this._onDatePicked}
              onCancel={this._onDateCanceled}/>
          <DateTimePicker
              mode='time'
              isVisible={this.state.dtFromVisible}
              date={this._getFromDate()}
              onConfirm={this._onFromPicked}
              onCancel={this._onFromCanceled}/>
          <DateTimePicker
              mode='time'
              isVisible={this.state.dtUntilVisible}
              date={this._getUntilDate()}
              onConfirm={this._onUntilPicked}
              onCancel={this._onUntilCanceled}/>
        </Screen>
    );
  }


  _renderHeaderImage() {
    return (
        <Image
            style={{width: '100%', height: 'auto'}}
            source={ImageURISourceAuth.fromUrl(DaoLocation.gPictureUrl(this._location()))}/>
    );
  }


  _renderContent() {
    return (
        <Grid>
          <Row size={30} style={{width: '100%'}}>
            <RkText rkType='secondary3'>
              {DaoLocation.gAddress(this._location())}
            </RkText>
          </Row>
          <Row size={30} style={{marginTop: 24}}>
            <Col style={Styles.center}>
              <TouchableNativeFeedback onPress={this._onDatePressed}>
                <RkText>{this._getStatusDateString()}</RkText>
              </TouchableNativeFeedback>
            </Col>
          </Row>
          <Row size={30}>
            <Col size={10} style={Styles.right}>
              <TouchableNativeFeedback onPress={this._onFromPressed}>
                <RkText rkType='header1'>{this._getFromMoment().format('HH:mm')}</RkText>
              </TouchableNativeFeedback>
            </Col>
            <Col size={2} style={Styles.center}>
              <RkText rkType='header1'>-</RkText>
            </Col>
            <Col size={10} style={Styles.left}>
              <TouchableNativeFeedback onPress={this._onUntilPressed}>
                <RkText rkType='header1'>{this._getUntilMoment().format('HH:mm')}</RkText>
              </TouchableNativeFeedback>
            </Col>
          </Row>
        </Grid>
    );
  }


  _renderTimeActionButtons() {
    return (
        <Grid>
          <Col style={Styles.center}>
            <View>
              <TouchableOpacity onPress={this._onHereNowPressed}>
                <Icon
                    size={55}
                    {...{...Icons.locationPersonFuture, color: this._getHereNowColor()}}/>
                <RkText rkType='secondary2'>I am here now</RkText>
              </TouchableOpacity>
            </View>
          </Col>
          <Col style={Styles.center}>
            <View>
              <TouchableOpacity onPress={this._onHereLaterPressed}>
                <Icon
                    size={55}
                    {...{...Icons.locationPersonFuture, color: this._getHereLaterColor()}}/>
                <RkText rkType='secondary2'>I will be here later</RkText>
              </TouchableOpacity>
            </View>
          </Col>
        </Grid>
    );
  }


  _renderActionButtons() {
    return (
        <Grid>
          <Col style={Styles.center}>
            <RkButton style={Styles.buttonPositive} onPress={this._onStatusConfirm}>Confirm</RkButton>
          </Col>
        </Grid>
    );
  }

}


const ModalUserLocationStatus = poolConnect(
    // Presentational Component
    ModalUserLocationStatusPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_EDIT_USER_LOCATION_STATUS]
);
export default ModalUserLocationStatus;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const Styles = StyleSheet.create({
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