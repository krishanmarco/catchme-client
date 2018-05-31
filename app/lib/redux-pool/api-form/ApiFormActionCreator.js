/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import DaoApiException from '../../daos/DaoApiException';
import Logger from '../../Logger';
import PoolActionCreator from '../PoolActionCreator';
import {
	POOL_ACTION_API_FORMS_ON_API_EXCEPTION,
	POOL_ACTION_API_FORMS_ON_CHANGE,
	POOL_ACTION_API_FORMS_ON_ERROR_DISMISS,
	POOL_ACTION_API_FORMS_ON_FINISH,
	POOL_ACTION_API_FORMS_ON_POST,
	POOL_ACTION_API_FORMS_ON_RESET,
	POOL_ACTION_API_FORMS_ON_SUCCESS
} from './ApiFormPool';
import {POOL_TYPE_API_FORMS} from '../../../redux/ReduxPool';
import {screenDisablePointerEvents, screenEnablePointerEvents} from '../../../comp/misc/Screen';
import {Validator} from '../../helpers/Validator';
import type {TApiException} from '../../daos/DaoApiException';
import type {TDispatch} from '../../types/Types';


export default class ApiFormActionCreator extends PoolActionCreator {

	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_API_FORMS, poolDefId, dispatch);
		this._validate = this._validate.bind(this);
		this.change = this.change.bind(this);
		this.reset = this.reset.bind(this);
		this.setErrors = this.setErrors.bind(this);
		this.dismissErrors = this.dismissErrors.bind(this);
		this.post = this.post.bind(this);
	}


	_validate(apiInput, inclusive = false) {
		const {poolId, dispatch} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {
			const previousErrors = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId].errors;
			return pool.validate(apiInput, previousErrors, inclusive);
		});
	}


	change(apiInput) {
		const {dispatchAction, poolId} = this;
		const pool = this.getPoolDef();

		Logger.v(`ApiFormActionCreator change: Changing ${poolId}`, apiInput);
		return dispatchAction({
			type: POOL_ACTION_API_FORMS_ON_CHANGE,
			errors: pool.validateOnChange ? this._validate(apiInput) : {},
			apiInput,
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

	setErrors<T>(errors: T): T {
		this.dispatchAction({type: POOL_ACTION_API_FORMS_ON_API_EXCEPTION, errors});
		return errors;
	}

	dismissErrors(): void {
		this.dispatchAction({type: POOL_ACTION_API_FORMS_ON_ERROR_DISMISS});
	}

	post(extraParams: Object) {
		const {dispatchAction, dispatch} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {
			const {apiInput} = this.getPoolState(getState);

			// Check for errors
			const errors = this._validate(apiInput, true);
			if (Validator.hasErrors(errors))
				return Promise.reject(this.setErrors(errors));


			// Disable screen
			if (pool.disableScreenOnLoading)
				dispatch(screenDisablePointerEvents());

			// Set to posting state
			dispatchAction({type: POOL_ACTION_API_FORMS_ON_POST});

			return pool.post({dispatch, getState}, apiInput, extraParams)
				.then(apiResponse => {

					// Success, handle the state change
					dispatchAction({type: POOL_ACTION_API_FORMS_ON_SUCCESS, apiResponse});
					return apiResponse;

				}).catch((api400: TApiException) => {
					// Note: the api has already handled the exception
					// here you should only do form specific actions
					// for example set the button out of its loading state
					return this.setErrors(DaoApiException.gErrors(api400));
				}).finally(apiResponseOrErrors => {

					dispatchAction({type: POOL_ACTION_API_FORMS_ON_FINISH});

					// Enable screen
					if (pool.disableScreenOnLoading)
						dispatch(screenEnablePointerEvents());

					return apiResponseOrErrors;
				});

		});
	}


}