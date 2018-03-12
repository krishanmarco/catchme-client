/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Screen} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';
import HelpAppInfo from './HelpAppInfo';

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenHelpAppInfoPresentational extends React.Component {

  render() {
    return (
        <Screen>
          <HelpAppInfo
              navigator={this.props.navigator}/>
        </Screen>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenHelpAppInfo = poolConnect(
    // Presentational Component
    ScreenHelpAppInfoPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);
export default ScreenHelpAppInfo;

ScreenHelpAppInfo.propTypes = {};