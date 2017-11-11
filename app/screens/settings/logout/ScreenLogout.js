/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect, CACHE_ID_USER_PROFILE} from '../../../redux/ReduxPool';
import {NullableObjects} from "../../../comp/Misc";
import Logout from './Logout';

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenLogoutPresentational extends React.Component {

  componentWillMount() {
    this.props[CACHE_ID_USER_PROFILE].initialize();
  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  render() {
    return (
        <NullableObjects
            objects={[this._authenticatedUserProfile()]}
            renderChild={([authenticatedUserProfile]) => (
                <Logout
                    navigator={this.props.navigator}
                    authenticatedUserProfile={authenticatedUserProfile}/>
            )}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenLogout = poolConnect(
    // Presentational Component
    ScreenLogoutPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE]
);
export default ScreenLogout;

ScreenLogout.propTypes = {

};