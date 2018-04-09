/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {DefaultLoader, SearchBar} from "../../Misc";
import {FlatList, StyleSheet} from 'react-native';



// Const *************************************************************************************************
// Const *************************************************************************************************

type Props<T> = {
	data: Array<T>,

	onListEmpty: () => Node,
	onSearchResultsEmpty: () => Node,

	filterExtractor: (T, RegExp) => boolean,
	searchPlaceholder?: string,
	numTriggerChars?: number,
	onSearchChanged?: (string) => {},
	onSearchPressed?: (string) => {},

};

type State = {
	searchText: string
};

// SearchableFlatList ***********************************************************************************
// SearchableFlatList ***********************************************************************************

export default class SearchableFlatList extends React.PureComponent<any, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onSearchChanged = this._onSearchChanged.bind(this);
		this._renderOnListEmpty = this._renderOnListEmpty.bind(this);
		this._renderFooterLoader = this._renderFooterLoader.bind(this);
		this.state = {searchText: ''};
	}


	_onSearchChanged(searchText) {
		if (this.props.onSearchChanged)
			this.props.onSearchChanged(searchText);


		// If autoFilter is set then also change the internal state so
		// the input list gets filtered using searchText with _filterExtractor
		if (this.props.autoFilter)
			this._autoFilter(searchText);
	}

	_autoFilter(searchText) {
		if (searchText.length < this.props.minTriggerChars)
			searchText = '';

		this.setState({searchText});
	}


	_getFilteredData() {
		let regExp;
		try {
			regExp = new RegExp(String(this.state.searchText), 'i');

		} catch (exception) {
			// Invalid regular expression, do not filter
			return this.props.data;
		}

		const helper = (item) => this.props.filterExtractor(item, regExp);
		return this.props.data.filter(helper);
	}


	render() {

		return (
			<FlatList
				data={this._getFilteredData()}
				renderItem={this.props.renderItem}
				keyExtractor={this.props.keyExtractor}

				ListEmptyComponent={this._renderOnListEmpty}
				ListHeaderComponent={
					<SearchBar
						placeholder={this.props.searchPlaceholder}
						onSearchPressed={this.props.onSearchPressed}
						onChange={this._onSearchChanged}/>
				}

				onEndReached={this.props.onEndReached}
				onEndReachedThreshold={this.props.onEndReachedThreshold}

				refreshing={this.props.refreshing}
				onRefresh={this.props.onRefresh}


				ListFooterComponent={this._renderFooterLoader}

			/>
		);
	}


	_renderOnListEmpty() {

		if (this.state.searchText.length > 0 && this.props.onSearchResultsEmpty) {
			// List empty but the search box is not
			return this.props.onSearchResultsEmpty(this.state.searchText);
		}

		// The list is empty or a search callback wasn't specified
		if (this.props.onListEmpty)
			return this.props.onListEmpty();

		return null;
	}


	_renderFooterLoader() {
		const {loading} = this.props;

		return loading
			? (<DefaultLoader size={8}/>)
			: null;
	}


}

// Config ***********************************************************************************************
// Config ***********************************************************************************************

SearchableFlatList.defaultProps = {
	searchPlaceholder: 'Search',
	minTriggerChars: 0,
	onEndReachedThreshold: 24
};


const styles = StyleSheet.create({});

