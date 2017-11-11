/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../../Config';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {RkStyleSheet, RkText, RkTextInput} from 'react-native-ui-kitten';


// label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}


export default class SearchBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    this.props.onChange(event.nativeEvent.text);
    event.stopPropagation();
  }


  render() {
    return (
        <View style={Styles.searchContainer}>
          <RkTextInput
              style={Styles.textInput}
              autoCapitalize='none'
              autoCorrect={false}
              onChange={this._onChange}
              label={<Icon {...Icons.search} />}
              rkType='row rounded'
              placeholder={this.props.placeholder}/>
        </View>
    );
  }

}

SearchBar.defaultProps = {
  placeholder: 'Search',
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};


let Styles = RkStyleSheet.create(theme => ({
  searchContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  textInput: {
    marginVertical: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
  }
}));