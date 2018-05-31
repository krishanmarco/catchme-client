import {mergeWithoutExtend} from '../../HelperFunctions';

/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/

export class ApiFormState {
	
	constructor(formId, apiInput, errors = {}) {
		
		// Unique pId that identifies this form out of all the
		// possible objects in objectPoolReducerInitState.forms
		this.formId = formId;
		
		// An object of default value for
		// each field of this form object
		this.apiInput = apiInput;
		
		this.errors = errors;
		this.apiResponse = null;
		
		this.loading = false;
	}
	
}


// ApiFormModel state-mutators (Reducer cases)
export function mutatorApiFormsOnChange(action, subState: ApiFormState): ApiFormState {
	return {
		apiInput: mergeWithoutExtend(subState.apiInput, action.apiInput),
		validationError: action.validationError,
		errors: action.errors
	};
}

export function mutatorApiFormsOnReset(action, subState: ApiFormState): ApiFormState {
	return action.newState;
}

export function mutatorApiFormsOnPost(action, subState: ApiFormState): ApiFormState {
	return {
		loading: true,
		apiResponse: null
	};
}

export function mutatorApiFormsOnSuccess(action, subState: ApiFormState): ApiFormState {
	return {
		apiResponse: action.apiResponse
	};
}

export function mutatorApiFormsOnApiException(action, subState: ApiFormState): ApiFormState {
	return {
		errors: action.errors
	};
}

export function mutatorApiFormsOnFinish(action, subState: ApiFormState): ApiFormState {
	return {
		loading: false
	};
}

export function mutatorApiFormsOnErrorDismiss(action, subState: ApiFormState): ApiFormState {
	return {
		errors: {}
	};
}
