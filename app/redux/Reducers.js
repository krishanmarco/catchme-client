/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {addContactsReducer} from '../screens/settings/add-contacts/AddContacts';
import {chatReducer} from "../comp/chat/ChatReducer";
import {combineReducers} from 'redux';
import {reduxPoolReducer} from './ReduxPool';
import {screenReducer} from '../comp/misc/Screen';
import {userLocationStatusReducer} from '../screens/user-location-status/UserLocationStatus';


const CombinedReducers = combineReducers({
	addContactsReducer,
	chatReducer,
	userLocationStatusReducer,
	reduxPoolReducer,
	screenReducer,
});

export default CombinedReducers;