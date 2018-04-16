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
	onSearchChanged?: (string) => void,
	onSearchPressed?: (string) => void,

	// Should be true while the data-set is loading
	loading: boolean,

	// If true the SearchableFlatList filters the
	// data-set automatically
	autoFilter: boolean,

	// Threshold after which the search
	// filter is enabled
	minTriggerChars: number,

	// FlatList renderItem function
	renderItem: ({item: T}) => Node,

	// FlatList keyExtractor
	keyExtractor: T => string|number,

	// FlatList extra props
	onEndReached?: Function,
	onEndReachedThreshold?: number,
	refreshing?: boolean,
	onRefresh: Function,
};

type State = {
	autoFilter: true,
	searchText: string,
	minTriggerChars: 3
};

// SearchableFlatList ***********************************************************************************
// SearchableFlatList ***********************************************************************************

export default class SearchableFlatList extends React.PureComponent<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onSearchChanged = this._onSearchChanged.bind(this);
		this._renderOnListEmpty = this._renderOnListEmpty.bind(this);
		this._renderFooterLoader = this._renderFooterLoader.bind(this);
		this.state = {searchText: ''};
	}


	_onSearchChanged(searchText) {
		const {onSearchChanged, autoFilter} = this.props;

		if (onSearchChanged)
			onSearchChanged(searchText);


		// If autoFilter is set then also change the internal state so
		// the input list gets filtered using searchText with _filterExtractor
		if (autoFilter)
			this._autoFilter(searchText);
	}

	_autoFilter(searchText) {
		const {minTriggerChars} = this.props;

		if (searchText.length < minTriggerChars)
			searchText = '';

		this.setState({searchText});
	}


	_getFilteredData() {
		const {data, filterExtractor} = this.props;
		const {searchText} = this.state;

		try {
			const regExp = new RegExp(String(searchText), 'i');
			const helper = (item) => filterExtractor(item, regExp);
			return data.filter(helper);

		} catch (exception) {
			// Invalid regular expression, do not filter
			return data;
		}
	}


	render() {
		const {
			searchPlaceholder,
			onSearchPressed,
			renderItem,
			keyExtractor,
			onEndReached,
			onEndReachedThreshold,
			refreshing,
			onRefresh
		} = this.props;

		return (
			<FlatList
				data={this._getFilteredData()}

				ListEmptyComponent={this._renderOnListEmpty}
				ListHeaderComponent={
					<SearchBar
						placeholder={searchPlaceholder}
						onSearchPressed={onSearchPressed}
						onChange={this._onSearchChanged}/>
				}
				ListFooterComponent={this._renderFooterLoader}

				renderItem={renderItem}
				keyExtractor={keyExtractor}
				onEndReached={onEndReached}
				onEndReachedThreshold={onEndReachedThreshold}
				refreshing={refreshing}
				onRefresh={onRefresh}/>
		);
	}


	_renderOnListEmpty() {
		const {searchText} = this.state;
		const {onSearchResultsEmpty, onListEmpty} = this.props;

		if (searchText.length > 0 && onSearchResultsEmpty) {
			// List empty but the search box is not
			return onSearchResultsEmpty(searchText);
		}

		// The list is empty or a search callback wasn't specified
		if (onListEmpty)
			return onListEmpty();

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

