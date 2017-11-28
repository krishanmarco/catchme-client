/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {FlatList} from 'react-native';
import FeaturedAdsListItem from "./FeaturedAdsListItem";

import DefaultLoader from '../../comp/misc/DefaultLoader';
import DaoFeaturedAd from "../../lib/daos/DaoFeaturedAd";


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

export default class FeaturedAdsList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._renderFooterLoader = this._renderFooterLoader.bind(this);
  }

  render() {
    return (
        <FlatList
            data={this.props.featuredAdsList}
            renderItem={({item}) => this._renderItem(item)}
            keyExtractor={(item, index) => DaoFeaturedAd.gId(item)}

            ListEmptyComponent={() => null}

            onEndReached={this.props.loadMore}
            onEndReachedThreshold={5}

            ListFooterComponent={this._renderFooterLoader}

        />
    );
  }


  _renderItem(featuredAd) {
    return (
        <FeaturedAdsListItem
            featuredAd={featuredAd}
            navigator={this.props.navigator}/>
    );
  }

  _renderFooterLoader() {
    if (!this.props.loading)
      return null;

    return (<DefaultLoader style={{marginVertical: 16}} size={8}/>);
  }

}

FeaturedAdsList.defaultProps = {};

FeaturedAdsList.propTypes = {
  userProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  featuredAdsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired
};

