/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import AddContacts from './AddContacts';
import React from 'react';
import {poolConnect} from '../../../redux/ReduxPool';
import {NullableObjects, Screen} from '../../../comp/Misc';
import {CACHE_ID_USER_PROFILE} from "../../../lib/redux-pool/cache/CachePool";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenSearchPresentational extends React.Component {

  componentWillMount() {
    this.props[CACHE_ID_USER_PROFILE].initialize();
  }

  _userProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  render() {
    return (
        <Screen>
          <NullableObjects
              objects={[this._userProfile()]}
              renderChild={([userProfile]) => (
                  <AddContacts
                      navigator={this.props.navigator}
                      userProfile={userProfile}/>
              )}/>
        </Screen>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSearch = poolConnect(
    // Presentational Component
    ScreenSearchPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE]
);


export default ScreenSearch;