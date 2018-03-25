/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoFeed from "../../lib/daos/DaoFeed";

import FeedListItem from "./FeedListItem";
import React from 'react';
import {DefaultLoader} from "../../comp/Misc";

import {FlatList} from 'react-native';
import type {TFeed} from "../../lib/daos/DaoFeed";
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
  userProfile: TUser,
  navigator: TNavigator,
  feedList: Array<TFeed>,
  loading: boolean,
  loadMore: boolean
};



// FeedList *********************************************************************************************
// FeedList *********************************************************************************************

export default class FeedList extends React.Component<Props> {

  constructor(props, context) {
    super(props, context);
    this._renderFooterLoader = this._renderFooterLoader.bind(this);
  }

  render() {
    return (
        <FlatList
            data={this.props.feedList}
            renderItem={({item}) => this._renderItem(item)}
            keyExtractor={(item, index) => DaoFeed.gId(item)}

            ListEmptyComponent={() => null}

            onEndReached={this.props.loadMore}
            onEndReachedThreshold={5}

            ListFooterComponent={this._renderFooterLoader}

        />
    );
  }


  _renderItem(feed) {
    return (
        <FeedListItem
            feed={feed}
            navigator={this.props.navigator}/>
    );
  }

  _renderFooterLoader() {
    if (!this.props.loading)
      return null;

    return (<DefaultLoader style={{marginVertical: 16}} size={8}/>);
  }

}

