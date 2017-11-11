/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {poolConnect, CACHE_ID_USER_PROFILE} from '../../redux/ReduxPool';
import Context from '../../lib/Context';
import {NullableObjects} from "../../comp/Misc";
import Feed from './Feed';


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenFeedPresentational extends React.Component {

  componentWillMount() {
    this.props[CACHE_ID_USER_PROFILE].initialize();
  }

  _userProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  render() {
    return (
        <NullableObjects
            objects={[this._userProfile(), Context.getFirebaseUser()]}
            renderChild={([userProfile]) => (
                <Feed
                    userProfile={userProfile}
                    navigator={this.props.navigator}/>
            )}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenFeed = poolConnect(
    // Presentational Component
    ScreenFeedPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE]
);
export default ScreenFeed;