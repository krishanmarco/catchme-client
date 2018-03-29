/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import type {TDispatch, TGetState} from "../../types/Types";
import _ from 'lodash';
import {ReduxPoolApiForms} from "../../../redux/ReduxPool";

export type TApiFormDef<TApiFormObject> = {

	// Unique form-id that this definition represents
	formId: string,

	// If true the validation is run on each form change
	validateOnChange: boolean,

	// Function that posts the api form
	post: (TApiFormObject) => Promise<TApiFormObject>,

	// Initial state of this form
	initState: () => ReduxPoolApiForms,

	// Function to validate the input, it must return an
	// TApiFormObject where the values are error codes
	validate: () => TApiFormObject,

	// If true the <Screen /> component disables all touches while
	// this form is loading. Default false
	disableScreenOnLoading: boolean,

	// Function to set the dispatch and getState
	// values for each action call
	bindAction: (TDispatch, TGetState) => {},

	// Function to dispatch redux state changes,
	// set on bindAction
	dispatch?: TDispatch,

	// Function that return the redux state,
	// set on bindAction
	getState?: TGetState

};


export default class ApiFormDef {

	// If fields is set hasErrors only returns true if the
	// fields in {fields} have errors, else it evaluates
	// all the fields in {errors}
	static hasErrors(errors: Object, fields: ?Array<String> = null): boolean {
		if (fields == null) {
			return !Object.keys(errors).reduce((prev, key) => prev && _.get(errors, key) == 0, true);
		}

		return !fields.reduce((prev, key) => prev && (!(key in errors) || _.get(errors, key) == 0), true);
	}



	constructor(formId, validateOnChange = true, disableScreenOnLoading = false) {
		this.formId = formId;
		this.validateOnChange = validateOnChange;
		this.disableScreenOnLoading = disableScreenOnLoading;
	}


	bindAction(dispatch: TDispatch, getState: TGetState) {
		this.dispatch = dispatch;
		this.getState = getState;
	}

	unBindAction() {
		this.dispatch = null;
		this.getState = null;
	}


	setError(errors, inclusive, objToValidate, propertyName, validator) {
		const value = _.get(objToValidate, propertyName);

		if (inclusive || value)
			errors[propertyName] = validator(value);

		return errors;
	}

}