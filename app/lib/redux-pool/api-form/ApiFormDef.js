/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import _ from 'lodash';
import {ApiFormState} from "./ApiFormModel";
import type {TThunk} from "../../types/Types";

export type TApiFormDef<TApiFormObject> = {

	// Unique form-id that this definition represents
	formId: string,

	// If true the validation is run on each form change
	validateOnChange: boolean,

	// Function that posts the api form
	post: (TThunk, TApiFormObject) => Promise<TApiFormObject>,

	// Initial state of this form
	initState: () => ApiFormState,

	// Function to validate the input, it must return an
	// TApiFormObject where the values are error codes
	validate: () => TApiFormObject,

	// If true the <Screen /> component disables all touches while
	// this form is loading. Default false
	disableScreenOnLoading: boolean,

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

	setError(errors, inclusive, objToValidate, propertyName, validator) {
		const value = _.get(objToValidate, propertyName);

		if (inclusive || value)
			errors[propertyName] = validator(value);

		return errors;
	}

}