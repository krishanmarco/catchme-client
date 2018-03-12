/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {poolConnect, CACHE_ID_USER_PROFILE} from '../../redux/ReduxPool';
import {Screen, NullableObjects} from "../../comp/Misc";
import FeaturedAds from './FeaturedAds';


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenFeaturedAdsPresentational extends React.Component {

  componentWillMount() {
    this.props[CACHE_ID_USER_PROFILE].initialize();
  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  render() {
    return (
        <Screen>
          <NullableObjects
              objects={[this._authenticatedUserProfile()]}
              renderChild={([authenticatedUserProfile]) => (
                  <FeaturedAds
                      navigator={this.props.navigator}
                      authenticatedUserProfile={authenticatedUserProfile}/>
              )}/>
        </Screen>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenFeaturedAds = poolConnect(
    // Presentational Component
    ScreenFeaturedAdsPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE]
);

export default ScreenFeaturedAds;
