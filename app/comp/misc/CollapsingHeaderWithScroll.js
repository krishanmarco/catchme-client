/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
// import Interactable from 'react-native-interactable';


export default class CollapsingHeader extends React.PureComponent {

  // Used to access the ref object
  static refInteractable = 'InteractableView';


  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
  }



  snapToTop() {
    // this.refs[CollapsingHeader.refInteractable].snapTo({index: 1})
  }

  snapToBottom() {
    // this.refs[CollapsingHeader.refInteractable].snapTo({index: 0});
  }


  render() {
    return (
        <View style={Styles.container}>

          <View style={{height: this.props.headerHeight}}>
            <Animated.View style={{
              transform: [
                {
                  translateY: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [-150, -150, 0, 0]
                  })
                },
                {
                  scale: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [1, 1, 1, 1]
                  })
                }
              ]
            }}>

              <View style={{height: this.props.headerHeight}}>
                {this.props.header}
              </View>

            </Animated.View>
          </View>

          <View style={{left: 0, right: 0, height: this.props.contentHeight}}>
            {this.props.interactable}
          </View>

        </View>
    );
  }


}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});