/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {FlatList} from 'react-native';
import DaoFeed from "../../lib/daos/DaoFeed";
import FeedListItem from "./FeedListItem";

import {DefaultLoader} from "../../comp/Misc";


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

export default class FeedList extends React.Component {

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

FeedList.defaultProps = {};

FeedList.propTypes = {
  userProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  feedList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired
};

