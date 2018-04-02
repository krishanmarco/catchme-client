/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import ApiFormActionCreator from "./ApiFormActionCreator";
import ApiFormDefChangePassword from './def/ApiFormDefChangePassword';
import ApiFormDefLocationProfile from './def/ApiFormDefLocationProfile';
import ApiFormDefLogin from './def/ApiFormDefLogin';
import ApiFormDefRegister from './def/ApiFormDefRegister';
import ApiFormDefUserLocationStatus from './def/ApiFormDefUserLocationStatus';
import ApiFormDefUserProfile from './def/ApiFormDefUserProfile';
import {
	mutatorApiFormsOnApiException,
	mutatorApiFormsOnChange,
	mutatorApiFormsOnErrorDismiss,
	mutatorApiFormsOnFinish,
	mutatorApiFormsOnPost,
	mutatorApiFormsOnReset,
	mutatorApiFormsOnSuccess
} from "./ApiFormModel";
import type {TApiFormDef} from "./ApiFormDef";
import type {TDispatch} from "../../types/Types";
import type {TPool} from "../Pool";



// Define all Actions (There should for each ACTION)
export const POOL_ACTION_API_FORMS_ON_CHANGE = 'POOL_ACTION_API_FORMS_ON_CHANGE';
export const POOL_ACTION_API_FORMS_ON_RESET = 'POOL_ACTION_API_FORMS_ON_RESET';
export const POOL_ACTION_API_FORMS_ON_POST = 'POOL_ACTION_API_FORMS_ON_POST';
export const POOL_ACTION_API_FORMS_ON_SUCCESS = 'POOL_ACTION_API_FORMS_ON_SUCCESS';
export const POOL_ACTION_API_FORMS_ON_FINISH = 'POOL_ACTION_API_FORMS_ON_FINISH';
export const POOL_ACTION_API_FORMS_ON_API_EXCEPTION = 'POOL_ACTION_API_FORMS_ON_API_EXCEPTION';
export const POOL_ACTION_API_FORMS_ON_ERROR_DISMISS = 'POOL_ACTION_API_FORMS_ON_ERROR_DISMISS';


// Define all {defs} pools
export const FORM_API_ID_LOGIN = 'FORM_API_ID_LOGIN';
export const FORM_API_ID_REGISTER = 'FORM_API_ID_REGISTER';
export const FORM_API_ID_CHANGE_PASSWORD = 'FORM_API_ID_CHANGE_PASSWORD';
export const FORM_API_ID_EDIT_LOCATION_PROFILE = 'FORM_API_ID_EDIT_LOCATION_PROFILE';
export const FORM_API_ID_EDIT_USER_LOCATION_STATUS = 'FORM_API_ID_EDIT_USER_LOCATION_STATUS';
export const FORM_API_ID_EDIT_USER_PROFILE = 'FORM_API_ID_EDIT_USER_PROFILE';


const ApiFormPool: TPool = {
	
	mutators: {
		[POOL_ACTION_API_FORMS_ON_CHANGE]: mutatorApiFormsOnChange,
		[POOL_ACTION_API_FORMS_ON_RESET]: mutatorApiFormsOnReset,
		[POOL_ACTION_API_FORMS_ON_POST]: mutatorApiFormsOnPost,
		[POOL_ACTION_API_FORMS_ON_SUCCESS]: mutatorApiFormsOnSuccess,
		[POOL_ACTION_API_FORMS_ON_FINISH]: mutatorApiFormsOnFinish,
		[POOL_ACTION_API_FORMS_ON_API_EXCEPTION]: mutatorApiFormsOnApiException,
		[POOL_ACTION_API_FORMS_ON_ERROR_DISMISS]: mutatorApiFormsOnErrorDismiss,
	},
	
	
	connectParams: {
		// todo the pool parameter can be removed once all definitions have been migrated
		getActionCreators: (poolDefId: string, pool: TApiFormDef, dispatch: TDispatch) => new ApiFormActionCreator(poolDefId, dispatch)
	},
	
	
	defs: {
		[FORM_API_ID_LOGIN]: ApiFormDefLogin,
		[FORM_API_ID_REGISTER]: ApiFormDefRegister,
		[FORM_API_ID_CHANGE_PASSWORD]: ApiFormDefChangePassword,
		[FORM_API_ID_EDIT_LOCATION_PROFILE]: ApiFormDefLocationProfile,
		[FORM_API_ID_EDIT_USER_LOCATION_STATUS]: ApiFormDefUserLocationStatus,
		[FORM_API_ID_EDIT_USER_PROFILE]: ApiFormDefUserProfile,
	}
	
};
export default ApiFormPool;
