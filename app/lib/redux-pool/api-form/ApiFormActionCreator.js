/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import ApiFormDef from "./ApiFormDef";
import PoolActionCreator from "../PoolActionCreator";
import {
	POOL_ACTION_API_FORMS_ON_API_EXCEPTION,
	POOL_ACTION_API_FORMS_ON_CHANGE,
	POOL_ACTION_API_FORMS_ON_ERROR_DISMISS,
	POOL_ACTION_API_FORMS_ON_FINISH,
	POOL_ACTION_API_FORMS_ON_POST,
	POOL_ACTION_API_FORMS_ON_RESET,
	POOL_ACTION_API_FORMS_ON_SUCCESS
} from "./ApiFormPool";
import {POOL_TYPE_API_FORMS, ReduxPoolBuilder} from "../../../redux/ReduxPool";
import {screenDisablePointerEvents, screenEnablePointerEvents} from "../../../comp/misc/Screen";
import type {TDispatch} from "../../types/Types";


export default class ApiFormActionCreator extends PoolActionCreator {

	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_API_FORMS, poolDefId, dispatch);
		this.change = this.change.bind(this);
		this.reset = this.reset.bind(this);
		this.setErrors = this.setErrors.bind(this);
		this.dismissErrors = this.dismissErrors.bind(this);
		this.post = this.post.bind(this);
	}
	
	
	change(apiInput) {
		const {dispatch, dispatchAction, poolId} = this;
		const pool = this.getPoolDef();
		
		return dispatch((dispatch, getState) => {
			
			let errors = {};
			if (pool.validateOnChange) {
				const previousErrors = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId].errors;
				errors = pool.validate(apiInput, previousErrors);
			}
			
			return dispatchAction({
				type: POOL_ACTION_API_FORMS_ON_CHANGE,
				apiInput,
				errors
			});
			
		});
	}
	
	
	reset() {
		const {dispatchAction} = this;
		const pool = this.getPoolDef();
		
		return dispatchAction({
			type: POOL_ACTION_API_FORMS_ON_RESET,
			newState: pool.initState()
		});
	}
	
	
	setErrors(errors) {
		const {dispatchAction} = this;
		
		return dispatchAction({
			type: POOL_ACTION_API_FORMS_ON_API_EXCEPTION,
			errors
		});
	}
	
	
	dismissErrors() {
		const {dispatchAction} = this;
		
		return dispatchAction({
			type: POOL_ACTION_API_FORMS_ON_ERROR_DISMISS
		});
	}
	
	
	post(extraParams) {
		const {dispatchAction, dispatch, poolId} = this;
		const pool = this.getPoolDef();
		
		return dispatch((dispatch, getState) => {
			pool.bindAction(dispatch, getState);	// todo: unbind at the end
			
			const form = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId];
			const apiInput = form.apiInput;
			let errors = form.errors;
			
			// todo: this code is duplicate, see change function
			if (pool.validateOnChange) {
				const previousErrors = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId].errors;
				errors = pool.validate(apiInput, previousErrors, true);
			}
			
			if (ApiFormDef.hasErrors(errors)) {
				const setErrors = ReduxPoolBuilder[POOL_TYPE_API_FORMS]
					.connectParams.getActionCreators(poolId, pool, dispatch).setErrors;
				setErrors(errors);
				return Promise.reject(errors);
			}
			
			
			// Disable screen
			if (pool.disableScreenOnLoading)
				dispatch(screenDisablePointerEvents());
			
			dispatchAction({
				type: POOL_ACTION_API_FORMS_ON_POST
			});
			
			
			return pool.post(
				// data
				apiInput,
				
				// Some post methods like ApiClient.resetPassword
				// require extra parameters that are passed in through
				// this extra nullable object
				extraParams,
				
				// Redux Dispatch Function
				dispatch,
				
				// Redux state Function
				getState
			).then(apiResponse => {
				
				// Handle the state change
				this.dispatchAction({
					type: POOL_ACTION_API_FORMS_ON_SUCCESS,
					apiResponse
				});
				
				// Request has completed successfully
				return apiResponse;
				
			}).catch(api400 => {
				// Note: the api has already handled the exception
				// here you should only do form specific actions
				// for example set the button out of its loading state
				const errors = _.get(JSON.parse(api400), 'errors', {});
				const setErrors = ReduxPoolBuilder[POOL_TYPE_API_FORMS]
					.connectParams.getActionCreators(poolId, pool, dispatch).setErrors;
				setErrors(errors);
				return errors;
			}).finally(userProfile => {
				
				dispatchAction({
					type: POOL_ACTION_API_FORMS_ON_FINISH,
				});
				
				// Enable screen
				if (pool.disableScreenOnLoading)
					dispatch(screenEnablePointerEvents());
				
				return userProfile;
			});
			
		});
	}


}