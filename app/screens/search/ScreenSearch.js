/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {poolConnect, CACHE_ID_USER_PROFILE} from '../../redux/ReduxPool';
import {NullableObjects} from '../../comp/Misc';
import Search from './Search';

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
        <NullableObjects
            objects={[this._userProfile()]}
            renderChild={([userProfile]) => (
                <Search
                    navigator={this.props.navigator}
                    userProfile={userProfile}/>
            )}/>
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