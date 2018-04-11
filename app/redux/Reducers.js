/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {addContactsReducer} from '../screens/settings/add-contacts/AddContacts';
import {chatReducer} from "../comp/chat/ReducerChat";
import {combineReducers} from 'redux';
import {modalUserLocationStatusReducer} from '../screens/user-location-status/ModalUserLocationStatus';
import {reduxPoolReducer} from './ReduxPool';
import {screenReducer} from '../comp/misc/Screen';


const CombinedReducers = combineReducers({
	addContactsReducer,
	chatReducer,
	modalUserLocationStatusReducer,
	reduxPoolReducer,
	screenReducer,
});

export default CombinedReducers;