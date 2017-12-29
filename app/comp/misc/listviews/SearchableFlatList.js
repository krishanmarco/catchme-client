/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors} from '../../../Config';

import {FlatList, Text, SectionList} from 'react-native';

import {DefaultLoader, SearchBar} from "../../Misc";


export default class SearchableFlatList extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onListEmpty = this._onListEmpty.bind(this);
    this._renderFooterLoader = this._renderFooterLoader.bind(this);
  }


  state = {
    searchText: ''
  };


  _onSearchChange(searchText) {

    if (searchText.length < this.props.minTriggerChars)
      searchText = '';

    this.setState({searchText});
  }


  _onListEmpty() {

    if (this.state.searchText.length > 0 && this.props.onSearchResultsEmpty) {
      // List empty but the search box is not
      return this.props.onSearchResultsEmpty(this.state.searchText);
    }

    // The list is empty or a search callback wasn't specified
    if (this.props.onListEmpty)
      return this.props.onListEmpty();

    return null;
  }


  _getFilteredData() {
    let regExp = new RegExp(String(this.state.searchText), 'i');
    let helper = (item) => this.props.filterExtractor(item, regExp);
    return this.props.data.filter(helper);
  }


  render() {

    return (
        <FlatList
            style={{backgroundColor: Colors.background}}
            data={this._getFilteredData()}
            renderItem={this.props.renderItem}
            keyExtractor={this.props.keyExtractor}

            ListEmptyComponent={this._onListEmpty}
            ListHeaderComponent={
                <SearchBar
                    placeholder={this.props.searchPlaceholder}
                    onSearchPressed={this.props.onSearchPressed}
                    onChange={this.props.onSearchChanged || this._onSearchChange}/>
            }

            onEndReached={this.props.onEndReached}
            onEndReachedThreshold={this.props.onEndReachedThreshold}

            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}


            ListFooterComponent={this._renderFooterLoader}

        />
    );
  }


  _renderFooterLoader() {

    if (!this.props.loading)
      return null;

    return (
        <DefaultLoader style={{marginVertical: 16}} size={8}/>
    );
  }


}

SearchableFlatList.defaultProps = {
  searchPlaceholder: 'Search',
  minTriggerChars: 4,
  onEndReachedThreshold: 0.5
};

SearchableFlatList.propTypes = {
  data: PropTypes.array.isRequired,

  onListEmpty: PropTypes.func,
  onSearchResultsEmpty: PropTypes.func,

  filterExtractor: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  minTriggerChars: PropTypes.number,
  onSearchChanged: PropTypes.func,
  onSearchPressed: PropTypes.func,

};