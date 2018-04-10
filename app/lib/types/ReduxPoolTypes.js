/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 08/01/18 © **/

export type TReduxPoolCache<TGeneric> = {
	cacheId: string,
	data: ?TGeneric,
	loading: boolean,
	loadingPromise: Promise<TGeneric>
};

export type TReduxPoolCacheMap = {
	cacheId: string,
	data: Object
};

export type TReduxPoolApiForms<TFormRequest, TFormResponse> = {
	formId: string,
	apiInput: TFormRequest,
	validationError: ?string,
	apiResponse: TFormResponse,
	loading: boolean,

	change: (TFormRequest, ?string) => void,
	reset: () => void,
	dismissError: () => void,
	post: (Object) => Promise<TFormResponse>
};

export type TReduxPoolLocalForms<TForm> = {
	formId: string,
	input: TForm,
	validationError: ?string
};

export type TReduxFirebaseData<TFirebaseObj> = {
	cacheId: string,
	fetchedAllItems: boolean,
	runningBulkFetch: boolean,
	itemsToLoad: number,
	data: Array<TFirebaseObj>
};

