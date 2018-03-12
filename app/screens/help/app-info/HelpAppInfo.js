/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {View} from 'react-native';
import {RkStyleSheet} from 'react-native-ui-kitten';
import {ScreenInfo} from "../../../comp/Misc";




// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  navigator: Navigator
};


// Component ********************************************************************************************
// Component ********************************************************************************************

export default class HelpAppInfo extends React.Component<any, Props, any> {

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