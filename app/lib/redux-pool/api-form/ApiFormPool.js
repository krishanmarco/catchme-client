/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import ApiFormActionCreator from "./ApiFormActionCreator";
import ApiFormDefChangePassword, {FORM_API_ID_CHANGE_PASSWORD} from './def/ApiFormDefChangePassword';
import ApiFormDefLocationProfile, {FORM_API_ID_EDIT_LOCATION_PROFILE} from './def/ApiFormDefLocationProfile';
import ApiFormDefLogin, {FORM_API_ID_LOGIN} from './def/ApiFormDefLogin';
import ApiFormDefRegister, {FORM_API_ID_REGISTER} from './def/ApiFormDefRegister';
import ApiFormDefUserLocationStatus, {FORM_API_ID_EDIT_USER_LOCATION_STATUS} from './def/ApiFormDefUserLocationStatus';
import ApiFormDefUserProfile, {FORM_API_ID_EDIT_USER_PROFILE} from './def/ApiFormDefUserProfile';
import {
	ApiFormState,
	mutatorApiFormsOnApiException,
	mutatorApiFormsOnChange,
	mutatorApiFormsOnErrorDismiss,
	mutatorApiFormsOnFinish,
	mutatorApiFormsOnPost,
	mutatorApiFormsOnReset,
	mutatorApiFormsOnSuccess
} from "./ApiFormModel";
import ApiFormDefRecoverPassword, {FORM_API_ID_RECOVER_PASSWORD} from "./def/ApiFormDefRecoverPassword";
import type {TDispatch} from "../../types/Types";
import type {TPool} from "../Pool";


// Define result of poolConnect for this pool
export type TApiFormPool = ApiFormActionCreator & ApiFormState;


// Define all Actions (There should for each ACTION)
export const POOL_ACTION_API_FORMS_ON_CHANGE = 'POOL_ACTION_API_FORMS_ON_CHANGE';
export const POOL_ACTION_API_FORMS_ON_RESET = 'POOL_ACTION_API_FORMS_ON_RESET';
export const POOL_ACTION_API_FORMS_ON_POST = 'POOL_ACTION_API_FORMS_ON_POST';
export const POOL_ACTION_API_FORMS_ON_SUCCESS = 'POOL_ACTION_API_FORMS_ON_SUCCESS';
export const POOL_ACTION_API_FORMS_ON_FINISH = 'POOL_ACTION_API_FORMS_ON_FINISH';
export const POOL_ACTION_API_FORMS_ON_API_EXCEPTION = 'POOL_ACTION_API_FORMS_ON_API_EXCEPTION';
export const POOL_ACTION_API_FORMS_ON_ERROR_DISMISS = 'POOL_ACTION_API_FORMS_ON_ERROR_DISMISS';


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
		getActionCreator: (poolDefId: string, dispatch: TDispatch) => new ApiFormActionCreator(poolDefId, dispatch)
	},
	
	
	defs: {
		[FORM_API_ID_LOGIN]: ApiFormDefLogin,
		[FORM_API_ID_REGISTER]: ApiFormDefRegister,
		[FORM_API_ID_CHANGE_PASSWORD]: ApiFormDefChangePassword,
		[FORM_API_ID_EDIT_LOCATION_PROFILE]: ApiFormDefLocationProfile,
		[FORM_API_ID_EDIT_USER_LOCATION_STATUS]: ApiFormDefUserLocationStatus,
		[FORM_API_ID_EDIT_USER_PROFILE]: ApiFormDefUserProfile,
		[FORM_API_ID_RECOVER_PASSWORD]: ApiFormDefRecoverPassword,
	}
	
};
export default ApiFormPool;
