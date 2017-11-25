/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../../lib/data/Firebase';

import _ from 'lodash';

import {Const} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';

import {FlatList} from 'react-native';
import DaoFeed from "../../lib/daos/DaoFeed";
import FeedListItem from "./FeaturedAdsListItem";
import DaoUser from "../../lib/daos/DaoUser";

import DefaultLoader from '../../comp/misc/DefaultLoader';

// Config ************************************************************************************************
// Config ************************************************************************************************
// todo: move these functions to a single file and also use that file from the chat reducer.

function dbFeaturedAds(featuredAdId) {
  return firebase.database()
      .ref('featuredAds')
      .child(featuredAdId);
}

function dbUserFeaturedAd(userId) {
  return firebase.database()
      .ref(`users/${userId}/featuredAds`);
}


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const feedListInitState = {
  fetchedAllItems: false,
  runningBulkFetch: true,
  itemsToLoad: Const.FeedList.loadMoreItems,
  feed: []
};

const ACTION_FEED_LIST_ADD_ELEMENT = 'ACTION_FEED_LIST_ADD_ELEMENT';
const ACTION_FEED_LIST_PRE_BULK_FETCH = 'ACTION_FEED_LIST_PRE_BULK_FETCH';
const ACTION_FEED_LIST_START_ON_FEED_RECEIVED = 'ACTION_FEED_LIST_START_ON_FEED_RECEIVED';
const ACTION_FEED_LIST_SET_FETCHED_ALL_ITEMS = 'ACTION_FEED_LIST_SET_FETCHED_ALL_ITEMS';


export function feedListReducer(state = feedListInitState, action) {
  switch (action.type) {

    case ACTION_FEED_LIST_PRE_BULK_FETCH:
      return Object.assign({}, state, {
        runningBulkFetch: true,
        itemsToLoad: state.itemsToLoad + Const.FeedList.loadMoreItems,
      });

    case ACTION_FEED_LIST_START_ON_FEED_RECEIVED:
      return Object.assign({}, state, {
        runningBulkFetch: false,
        feed: action.feed
      });

    case ACTION_FEED_LIST_SET_FETCHED_ALL_ITEMS:
      return Object.assign({}, state, {
        fetchedAllItems: true,
        runningBulkFetch: false,
      });

  }

  return state;
}



function screenFeedInitialize(userId) {
  return (dispatch, getState) => {

    dbUserFeaturedAd(userId).on('child_added', (snapshot) => {

      if (getState().feedListReducer.runningBulkFetch) {
        // This value will come back in the .once('value')
        // ignoring...
        return;
      }

      // The initial data has already been added, this is new data

      if (snapshot.key == null)
        return;

      dispatch(screenFeedReceiveFeed([snapshot.key]));
    });

    // Initialization, run the bulk request
    screenFeedFetchFeed(userId);
  };
}

function screenFeedLoadMore(userId) {
  return screenFeedFetchFeed(userId);
}

function screenFeedFetchFeed(userId) {
  return (dispatch, getState) => {

    dispatch({type: ACTION_FEED_LIST_PRE_BULK_FETCH});

    dbUserFeaturedAd(userId)
        .limitToLast(getState().feedListReducer.itemsToLoad)
        .once('value', (snapshot) => {
          let receivedFeedIdObj = snapshot.val();

          if (receivedFeedIdObj == null) {
            dispatch({type: ACTION_FEED_LIST_SET_FETCHED_ALL_ITEMS});
            return;
          }

          let receivedFeedIdArr = Object.values(receivedFeedIdObj);
          let stateFeedIdsArr = getState().feedListReducer.feed;

          if (receivedFeedIdArr.length === stateFeedIdsArr.length) {
            dispatch({type: ACTION_FEED_LIST_SET_FETCHED_ALL_ITEMS});
            return;
          }

          // New items have come in, reverse and save the list
          dispatch(screenFeedReceiveFeed(receivedFeedIdArr.reverse()));
        });

  }
}

function screenFeedReceiveFeed(receivedFeedIdsArr) {
  return (dispatch, getState) => {

    // todo: actions that are to be run on all received feed items
    // todo: check their integrity and if consumeOnView == true then delete them from firebase

    // Merge with state and make sure the array doesn't have duplicate feeds
    let stateFeedIdsArr = getState().feedListReducer.feed.map(feed => feed.id);
    stateFeedIdsArr = _.difference(receivedFeedIdsArr, stateFeedIdsArr);
    stateFeedIdsArr = _.chunk(stateFeedIdsArr, 3);

    stateFeedIdsArr.forEach(chunkOfFeedIds => {
      Promise.all(chunkOfFeedIds.map(feedObj => dbFeaturedAds(feedObj).once('value').then(f => f.val())))
          .then(feedArr => {
            let feed = getState().feedListReducer.feed.concat(feedArr);
            dispatch({type: ACTION_FEED_LIST_START_ON_FEED_RECEIVED, feed: feed})
          });
    });

  }
}


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class FeedListPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._loadMore = this._loadMore.bind(this);
    this._renderFooterLoader = this._renderFooterLoader.bind(this);
  }

  _userProfile() { return this.props.userProfile; }

  componentWillMount() {
    this.props.initialize(DaoUser.gId(this._userProfile()));
  }

  _loadMore() {
    if (!this.props.fetchedAllItems)
      this.props.loadMore(DaoUser.gId(this._userProfile()));
  }



  render() {
    return (
        <FlatList
            data={this.props.feed}
            renderItem={({item}) => this._renderItem(item)}
            keyExtractor={(item, index) => DaoFeed.gId(item)}

            ListEmptyComponent={() => null}

            onEndReached={this._loadMore}
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

    if (!this.props.runningBulkFetch)
      return null;

    return (
        <DefaultLoader style={{marginVertical: 16}} size={8}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const FeedList = poolConnect(
    // Presentational Component
    FeedListPresentational,

    // mapStateToProps
    (state) => state.feedListReducer,

    // mapDispatchToProps
    (dispatch) => ({
      initialize: (userId) => dispatch(screenFeedInitialize(userId)),
      loadMore: (userId) => dispatch(screenFeedLoadMore(userId))
    }),

    // Array of pools to subscribe to
    []
);


export default FeedList;


FeedList.defaultProps = {};

FeedList.propTypes = {
  userProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
};

