/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {addContactsReducer} from '../screens/settings/add-contacts/AddContacts';
import {applicationGlobalReducer} from './ReduxApplicationGlobal';
import {chatReducer} from "../comp/chat/ReducerChat";
import {combineReducers} from 'redux';

import {editLocationAddressReducer} from '../screens/location-edit/pages/EditLocationAddress';
import {editLocationInfoReducer} from '../screens/location-edit/pages/EditLocationInfo';
import {editLocationReducer} from '../screens/location-edit/EditLocation';
import {editLocationSaveReducer} from '../screens/location-edit/pages/EditLocationSave';
import {editLocationTimingsReducer} from '../screens/location-edit/pages/EditLocationTimings';

import {featuredAdsReducer} from '../screens/featured-ads/FeaturedAds';
import {feedReducer} from '../screens/feed/Feed';

import {locationProfileReducer} from '../screens/location-profile/LocationProfile';
import {modalUserLocationStatusReducer} from '../screens/user-location-status/ModalUserLocationStatus';
import {reduxPoolReducer} from './ReduxPool';
import {screenReducer} from '../comp/misc/Screen';
import {searchReducer} from '../screens/search/Search';

import {settingsUserAccountReducer} from '../screens/settings/user-account/SettingsUserAccount';
import {userProfileReducer} from '../screens/user-profile/UserProfile';

const CombinedReducers = combineReducers({
  applicationGlobalReducer,
	screenReducer,
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