/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Const} from "../../../Config";
import {DefaultLoader, SearchBar} from "../../Misc";
import {FlatList, StyleSheet, View} from 'react-native';
import {t} from "../../../lib/i18n/Translations";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props<T> = FlatList.props & {
	data: Array<T>,
	renderOnListEmpty: () => Node,
	renderOnSearchResultsEmpty: () => Node,
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
};

type State = {
	searchText: string
};

const defaultProps = {
	searchPlaceholder: t('t_search'),
	minTriggerChars: 0,
	autoFilter: true,
	onEndReachedThreshold: Const.defaultOnEndReachedThreshold
};

// SearchableFlatList ***********************************************************************************
// SearchableFlatList ***********************************************************************************

export default class SearchableFlatList extends React.PureComponent<void, Props, State> {
	static defaultProps = defaultProps;

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
			// Escape regex special chars
			const searchTextEscaped = String(searchText)
				.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

			const regExp = new RegExp(searchTextEscaped || '', 'i');
			return data.filter((item) => filterExtractor(item, regExp));

		} catch (exception) {
			// Invalid regular expression, do not filter
			return data;
		}
	}

	render() {
		const {
			searchPlaceholder,
			onSearchPressed,
			...flatListProps
		} = this.props;

		return (
			<FlatList
				{...flatListProps}
				data={this._getFilteredData()}

				ListEmptyComponent={this._renderOnListEmpty}
				ListHeaderComponent={
					<View style={styles.searchBar}>
						<SearchBar
							placeholder={searchPlaceholder}
							onSearchPressed={onSearchPressed}
							onChange={this._onSearchChanged}/>
					</View>
				}
				ListFooterComponent={this._renderFooterLoader}/>
		);
	}

	_renderOnListEmpty() {
		const {searchText} = this.state;
		const {renderOnSearchResultsEmpty, renderOnListEmpty} = this.props;

		if (renderOnSearchResultsEmpty && searchText.length > 0) {
			// List empty but the search box is not
			return renderOnSearchResultsEmpty(searchText);
		}

		// The list is empty or a search callback wasn't specified
		if (renderOnListEmpty)
			return renderOnListEmpty();

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

const styles = StyleSheet.create({
	searchBar: {
		marginTop: 8
	}
});
