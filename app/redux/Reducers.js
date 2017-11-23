/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {combineReducers} from 'redux';
import {applicationGlobalReducer} from './ReduxApplicationGlobal';
import {reduxPoolReducer} from './ReduxPool';

import {locationProfileReducer} from '../screens/location-profile/LocationProfile';
import {userProfileReducer} from '../screens/user-profile/UserProfile';
import {searchReducer} from '../screens/search/Search';
import {feedReducer} from '../screens/feed/Feed';

import {settingsUserAccountReducer} from '../screens/settings/user-account/SettingsUserAccount';
import {addContactsReducer} from '../screens/settings/add-contacts/AddContacts';

import {editLocationReducer} from '../screens/location-edit/EditLocation';
import {editLocationInfoReducer} from '../screens/location-edit/pages/EditLocationInfo';
import {editLocationTimingsReducer} from '../screens/location-edit/pages/EditLocationTimings';
import {editLocationAddressReducer} from '../screens/location-edit/pages/EditLocationAddress';
import {editLocationSaveReducer} from '../screens/location-edit/pages/EditLocationSave';

import {feedListReducer} from "../comp-buisness/feed/FeedList";
import {chatReducer} from "../comp/chat/ReducerChat";

const CombinedReducers = combineReducers({
  applicationGlobalReducer,
  reduxPoolReducer,

  chatReducer,
  feedListReducer,

  locationProfileReducer,
  userProfileReducer,
  searchReducer,
  feedReducer,

  settingsUserAccountReducer,
  addContactsReducer,

  editLocationReducer,
  editLocationInfoReducer,
  editLocationTimingsReducer,
  editLocationAddressReducer,
  editLocationSaveReducer,
});

export default CombinedReducers;