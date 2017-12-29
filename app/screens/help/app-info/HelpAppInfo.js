/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import ApiClient from '../../../lib/data/ApiClient';
import RealmIO from '../../../lib/data/RealmIO';
import {boolToIntString, intStringToBool} from '../../../lib/HelperFunctions';

import {startApplication} from "../../../App";
import {Icons} from '../../../Config';

import {View} from 'react-native';
import {scaleVertical} from '../../../lib/utils/scale';
import {RkText, RkButton, RkStyleSheet} from 'react-native-ui-kitten';
import {RkSwitch} from '../../../comp/misc/forms/RkInputs';
import DaoUser from "../../../lib/daos/DaoUser";
import {ScreenInfo} from "../../../comp/Misc";




// FlowProps ********************************************************************************************
// FlowProps ********************************************************************************************

type Props = {
  navigator: Navigator
};

type State = {
  // Nothing for now
};


// Component ********************************************************************************************
// Component ********************************************************************************************

export default class HelpAppInfo extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <View>
          <ScreenInfo
              imageContainerStyle={{marginTop: 64}}
              imageContainerScale={550}
              imageHeight={100}
              imageWidth={150}
              imageSource={require('../../../assets/images/splashBack.png')}
              textText='Catchme info...'/>
        </View>
    );
  }

}



// Style ************************************************************************************************
// Style ************************************************************************************************

let Styles = RkStyleSheet.create(theme => ({
  buttonCont: {
    marginTop: 64,
    alignItems: 'center'
  },
  button: {
    alignItems: 'center'
  }
}));