/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoFeaturedAd from "../../lib/daos/DaoFeaturedAd";
import FeaturedAdsListItem from "./FeaturedAdsListItem";
import React from 'react';
import {Const} from "../../Config";
import {DefaultLoader, FlatListEmpty} from "../../comp/Misc";
import {FlatList} from 'react-native';
import type {TFeaturedAd} from "../../lib/daos/DaoFeaturedAd";
import type {TUser} from "../../lib/daos/DaoUser";
import {t} from "../../lib/i18n/Translations";


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	userProfile: TUser,
	featuredAdsList: Array<TFeaturedAd>,
	loading: boolean,
	loadMore: Function,
	handleClickAction: Function
}


// FeaturedAdsList **************************************************************************************
// FeaturedAdsList **************************************************************************************

export default class FeaturedAdsList extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._renderItem = this._renderItem.bind(this);
		this._renderFooterLoader = this._renderFooterLoader.bind(this);
		this._renderEmptyList = this._renderEmptyList.bind(this);
	}

	render() {
		const {loadMore, featuredAdsList} = this.props;

		return (
			<FlatList
				data={featuredAdsList}
				renderItem={this._renderItem}
				keyExtractor={DaoFeaturedAd.gId}

				onEndReached={loadMore}
				onEndReachedThreshold={Const.defaultOnEndReachedThreshold}

				ListFooterComponent={this._renderFooterLoader}
				ListEmptyComponent={this._renderEmptyList}/>
		);
	}

	_renderEmptyList() {
		return (
			<FlatListEmpty
				text={t('t_empty_featured_ads')}
				image={require('../../assets/images/empty-featured.png')}/>
		);
	}

	_renderItem({item}: { item: TFeaturedAd }) {
		const {handleClickAction} = this.props;
		return (
			<FeaturedAdsListItem
				featuredAd={item}
				handleClickAction={handleClickAction}/>
		);
	}

	_renderFooterLoader() {
		const {loading} = this.props;

		if (!loading)
			return null;

		return (<DefaultLoader size={8}/>);
	}

}

