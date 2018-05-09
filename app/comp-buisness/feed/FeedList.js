/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoFeed from "../../lib/daos/DaoFeed";
import FeedListItem from "./FeedListItem";
import React from 'react';
import {Const} from "../../Config";
import {DefaultLoader, FlatListEmpty} from "../../comp/Misc";
import {FlatList} from 'react-native';
import {t} from "../../lib/i18n/Translations";
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
		this._renderEmptyList = this._renderEmptyList.bind(this);
	}

	render() {
		const {feedList, loadMore} = this.props;

		return (
			<FlatList
				data={feedList}
				renderItem={this._renderItem}
				keyExtractor={DaoFeed.gId}

				onEndReached={loadMore}
				onEndReachedThreshold={Const.defaultOnEndReachedThreshold}

				ListFooterComponent={this._renderFooterLoader}
				ListEmptyComponent={this._renderEmptyList}/>
		);
	}

	_renderEmptyList() {
		return (
			<FlatListEmpty
				text={t('t_empty_feed')}
				image={require('../../assets/images/empty-feed.png')}/>
		);
	}

	_renderItem({item}: { item: TFeed }) {
		const {handleClickAction} = this.props;
		return (
			<FeedListItem
				feed={item}
				handleClickAction={handleClickAction}/>
		);
	}

	_renderFooterLoader() {
		const {loading} = this.props;
		return loading
			? (<DefaultLoader size={8}/>)
			: null;
	}

}

