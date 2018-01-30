/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {combineReducers} from 'redux';
import {applicationGlobalReducer} from './ReduxApplicationGlobal';
import {reduxPoolReducer} from './ReduxPool';

import {locationProfileReducer} from '../screens/location-profile/LocationProfile';
import {userProfileReducer} from '../screens/user-profile/UserProfile';
import {searchReducer} from '../screens/search/Search';
import {feedReducer} from '../screens/feed/Feed';
import {featuredAdsReducer} from '../screens/featured-ads/FeaturedAds';

import {settingsUserAccountReducer} from '../screens/settings/user-account/SettingsUserAccount';
import {addContactsReducer} from '../screens/settings/add-contacts/AddContacts';

import {editLocationReducer} from '../screens/location-edit/EditLocation';
import {editLocationInfoReducer} from '../screens/location-edit/pages/EditLocationInfo';
import {editLocationTimingsReducer} from '../screens/location-edit/pages/EditLocationTimings';
import {editLocationAddressReducer} from '../screens/location-edit/pages/EditLocationAddress';
import {editLocationSaveReducer} from '../screens/location-edit/pages/EditLocationSave';

import {chatReducer} from "../comp/chat/ReducerChat";
import {modalUserLocationStatusReducer} from '../screens/user-location-status/ModalUserLocationStatus';

const CombinedReducers = combineReducers({
  applicationGlobalReducer,
  reduxPoolReducer,

  chatReducer,
  modalUserLocationStatusReducer,

  locationProfileReducer,
  userProfileReducer,
  searchReducer,
  feedReducer,
  featuredAdsReducer,

  settingsUserAccountReducer,
  addContactsReducer,

  editLocationReducer,
  editLocationInfoReducer,
  editLocationTimingsReducer,
  editLocationAddressReducer,
  editLocationSaveReducer,
});

export default CombinedReducers;