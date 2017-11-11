/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect} from '../../redux/ReduxPool';
import FeedList from '../../comp-buisness/feed/FeedList';


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const feedInitState = {
  // Nothing for now
};

export function feedReducer(state = feedInitState, action) {
  switch (action.type) {
    // Nothing for now
  }

  return state;
}



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class FeedPresentational extends React.Component {

  _userProfile() { return this.props.userProfile; }
  _navigator() { return this.props.navigator; }


  render() {
    return (
        <FeedList
            userProfile={this._userProfile()}
            navigator={this._navigator()}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const Feed = poolConnect(
    // Presentational Component
    FeedPresentational,

    // mapStateToProps
    (state) => state.feedReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);
export default Feed;


Feed.propTypes = {
  userProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************
