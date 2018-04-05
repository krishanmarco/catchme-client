/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import FeaturedAdsList from '../../comp-buisness/featured-ads/FeaturedAdsList';
import PropTypes from 'prop-types';
import React from 'react';
import {poolConnect} from '../../redux/ReduxPool';
import {View} from 'react-native';
import {FIREBASE_DATA_ID_FEATURED_ADS} from "../../lib/redux-pool/firebase-data/def/FirebaseDataDefFeaturedAds";

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

  constructor(props, context) {
    super(props, context);
    this._loadMore = this._loadMore.bind(this);
  }

  componentWillMount() {
    this._firebaseDataFeaturedAds().initialize(DaoUser.gId(this._userProfile()));
  }

  _navigator() {
    return this.props.navigator;
  }

  _userProfile() {
    return this.props.authenticatedUserProfile;
  }

  _firebaseDataFeaturedAds() {
    return this.props[FIREBASE_DATA_ID_FEATURED_ADS];
  }

  _loadMore() {
    this._firebaseDataFeaturedAds().loadMore(DaoUser.gId(this._userProfile()));
  }


  render() {
    return (
        <View>
          <FeaturedAdsList
              userProfile={this._userProfile()}
              navigator={this._navigator()}

              featuredAdsList={this._firebaseDataFeaturedAds().data}
              loading={this._firebaseDataFeaturedAds().runningBulkFetch}
              loadMore={this._loadMore}/>
        </View>
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
    [FIREBASE_DATA_ID_FEATURED_ADS]
);


export default FeaturedAds;


FeaturedAds.propTypes = {
  authenticatedUserProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************
