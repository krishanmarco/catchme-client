/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {Icons} from '../../../Config';

import {View} from 'react-native';
import StaticSectionList from '../../../comp/misc/listviews/StaticSectionList';
import {ListItemInfo} from '../../../comp/misc/ListItemsInfos';
import {RkSwitchFromPool} from '../../../comp/misc/forms/RkInputs';
import ScreenInfo from "../../../comp/misc/ScreenInfo";
import {FlatList} from 'react-native';

import {ListItemLocation} from '../../../comp-buisness/location/LocationListItems';
import DaoLocation from "../../../lib/daos/DaoLocation";
import DaoUser from "../../../lib/daos/DaoUser";
import Router from "../../../lib/helpers/Router";




// FlowProps ********************************************************************************************
// FlowProps ********************************************************************************************

type Props = {
  navigator: Navigator
};



// Component ********************************************************************************************
// Component ********************************************************************************************

export default class SettingsUserAdministratingLocations extends React.Component<any, Props, any> {

  constructor(props, context) {
    super(props, context);
    this._onLocationPress = this._onLocationPress.bind(this);
    this._onLocationAdd = this._onLocationAdd.bind(this);
  }

  _userProfile() {
    return this.props.userProfile;
  }

  _onLocationPress(location) {
    Router.toScreenEditLocation(this.props.navigator, DaoLocation.gId(location));
  }

  _onLocationAdd() {
    Router.toScreenEditLocation(this.props.navigator);
  }


  render() {
    return (
        <View>
          {this._renderScreenHeader()}
          {this._renderAdminLocationList()}
        </View>
    );
  }

  _renderScreenHeader() {
    return (
        <ScreenInfo
            imageContainerStyle={{marginTop: 64}}
            scale={550}
            height={100}
            width={150}
            image={require('../../../assets/images/splashBack.png')}
            text='Here you can tweak your notification settings'/>
    );
  }

  _renderAdminLocationList() {
    return (
        <FlatList
            data={DaoUser.gAdminLocations(this._userProfile())}
            keyExtractor={DaoLocation.gId}
            ListHeaderComponent={
              <ListItemInfo
                  title='Add a new Location'
                  textRkType='header4'
                  icon={Icons.locationAdminAdd}
                  onPress={this._onLocationAdd}/>
            }
            renderItem={({item}) => (
                <ListItemLocation
                    location={item}
                    onPress={() => this._onLocationPress(item)}/>
            )}
        />
    );
  }

}
