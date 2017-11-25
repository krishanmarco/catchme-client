/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect} from '../../redux/ReduxPool';
import FeaturedAdsList from '../../comp-buisness/featured-ads/FeaturedAdsList';

// Redux ************************************************************************************************
// Redux ************************************************************************************************

const featuredAdsInitState = {
  // Nothing for now
};

export function featuredAdsReducer(state = featuredAdsInitState, action) {
  switch (action.type) {
    // Nothing for now
  }

  return state;
}


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class FeaturedAdsPresentational extends React.Component {

  _navigator() {
    return this.props.navigator;
  }

  _authenticatedUserProfile() {
    return this.props.userProfile;
  }


  render() {
    return (
        <FeaturedAdsList
            userProfile={this._authenticatedUserProfile()}
            navigator={this._navigator()}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const FeaturedAds = poolConnect(
    // Presentational Component
    FeaturedAdsPresentational,

    // mapStateToProps
    (state) => state.featuredAdsReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);


export default FeaturedAds;


FeaturedAds.propTypes = {
  authenticatedUserProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************
