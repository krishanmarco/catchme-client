/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoFeaturedAd from "../../lib/daos/DaoFeaturedAd";
import FeaturedAdsListItem from "./FeaturedAdsListItem";
import React from 'react';
import {DefaultLoader} from "../../comp/Misc";
import {FlatList} from 'react-native';
import type {TFeaturedAd} from "../../lib/daos/DaoFeaturedAd";
import type {TUser} from "../../lib/daos/DaoUser";


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

export default class FeaturedAdsList extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._renderItem = this._renderItem.bind(this);
		this._renderFooterLoader = this._renderFooterLoader.bind(this);
	}

	render() {
		const {loadMore, featuredAdsList} = this.props;

		return (
			<FlatList
				data={featuredAdsList}
				renderItem={this._renderItem}
				keyExtractor={DaoFeaturedAd.gId}

				ListEmptyComponent={null}

				onEndReached={loadMore}
				onEndReachedThreshold={5}

				ListFooterComponent={this._renderFooterLoader}

			/>
		);
	}


	_renderItem({item}: {item: TFeaturedAd}) {
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

