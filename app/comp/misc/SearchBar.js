/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Colors, Icons} from '../../Config';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {RkStyleSheet, RkTextInput} from 'react-native-ui-kitten';



// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  placeholder: ?string,
  onChange: Function,
};


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

export default class SearchBar extends React.Component<any, Props, any> {

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
        <View style={styles.searchContainer}>
          <RkTextInput
              style={styles.textInput}
              rkType='row rounded'
              autoCapitalize='none'
              autoCorrect={false}
              label={<Icon {...Icons.search} />}
              onChange={this._onChange}
              placeholder={this.props.placeholder}/>
        </View>
    );
  }

}

SearchBar.defaultProps = {
  placeholder: 'Search',
};


const styles = RkStyleSheet.create(theme => ({
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