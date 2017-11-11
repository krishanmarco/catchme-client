/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {RkButton, RkText, RkComponent} from 'react-native-ui-kitten';


export default class GradientButton extends RkComponent {

  // Needed for this.defineStyles()
  componentName = 'GradientButton';
  typeMapping = {button: {}, gradient: {}, text: {}};

  constructor(props, context) {
    super(props, context);
  }


  render() {
    let {button, gradient, text: textStyle} = this.defineStyles();
    let {style, ...otherProps} = this.props;

    return (
        <RkButton
            {...otherProps}
            rkType='stretch'
            style={[button, style]}>

          <LinearGradient
              colors={this.props.colors || this.extractNonStyleValue(gradient, 'colors')}
              start={this.props.gradientStart}
              end={this.props.gradientEnd}
              style={gradient}>

            {!this.props.text
                ? this.props.children
                : <RkText style={textStyle}>{this.props.text}</RkText>}

          </LinearGradient>

        </RkButton>
    )
  }

}

GradientButton.defaultProps = {
  gradientStart: {x: 0.0, y: 0.5},
  gradientEnd: {x: 1, y: 0.5}
};

GradientButton.propTypes = {
  colors: PropTypes.array,
  text: PropTypes.string,
  children: PropTypes.node,
  gradientStart: PropTypes.object,
  gradientEnd: PropTypes.object
};
