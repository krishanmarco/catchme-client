/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoFeed from "../../lib/daos/DaoFeed";

import FeedListItem from "./FeedListItem";
import React from 'react';
import {DefaultLoader} from "../../comp/Misc";

import {FlatList} from 'react-native';
import type {TFeed} from "../../lib/daos/DaoFeed";
import type {TUser} from "../../lib/daos/DaoUser";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	userProfile: TUser,
	handleClickAction: Function,
	feedList: Array<TFeed>,
	loading: boolean,
	loadMore: boolean
};



// FeedList *********************************************************************************************
// FeedList *********************************************************************************************

export default class FeedList extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._renderFooterLoader = this._renderFooterLoader.bind(this);
		this._renderItem = this._renderItem.bind(this);
	}

	render() {
		const {feedList, loadMore} = this.props;

		return (
			<FlatList
				data={feedList}
				renderItem={this._renderItem}
				keyExtractor={DaoFeed.gId}

				ListEmptyComponent={null}

				onEndReached={loadMore}
				onEndReachedThreshold={5}

				ListFooterComponent={this._renderFooterLoader}/>
		);
	}


	_renderItem({item}: {item: TFeed}) {
		const {handleClickAction} = this.props;
		return (
			<FeedListItem
				feed={item}
				handleClickAction={handleClickAction}/>
		);
	}

	_renderFooterLoader() {
		return this.props.loading
			? (<DefaultLoader size={8}/>)
			: null;
	}

}

