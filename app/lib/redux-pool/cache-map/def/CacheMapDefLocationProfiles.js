/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import CacheMapDef from '../CacheMapDef';
import DaoLocation from '../../../daos/DaoLocation';
import Logger from '../../../Logger';
import {Snackbar} from '../../../Snackbar';
import {t} from '../../../i18n/Translations';
import _ from 'lodash';
import {Validate} from '../../../helpers/Validator';
import type {TCacheMapDef} from '../CacheMapDef';
import type {TLocation} from '../../../daos/DaoLocation';
import type {TId, TThunk} from '../../../types/Types';

export const CACHE_MAP_ID_LOCATION_PROFILES = 'CACHE_MAP_ID_LOCATION_PROFILES';

// Declare cache-map definition
class CacheMapDefLocationProfiles extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_LOCATION_PROFILES);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	buildDataSet(thunk: TThunk, lid: number, extraParams: Object): Promise<TLocation> {
		return ApiClient.locationsGetLidProfile(lid);
	}

}

// Declare cache-map sub-type
export type TCacheMapDefLocationProfiles = TCacheMapDef<TLocation>;

const cacheMapDefLocationProfiles: TCacheMapDefLocationProfiles = new CacheMapDefLocationProfiles();
export default cacheMapDefLocationProfiles;


export class CacheMapDefLocationProfilesActionCreator {

	constructor(cacheMapActionCreator) {
		// We can't extend CacheMapActionCreator because it would create a require-cycle
		// We have to pass CacheMapActionCreator in as a parameter and extend with Object.assign
		Object.assign(this, cacheMapActionCreator);
		this._addToImagesArray = this._addToImagesArray.bind(this);
		this._removeFromImagesArray = this._removeFromImagesArray.bind(this);
		this.addImage = this.addImage.bind(this);
	}

	_addToImagesArray(lid: TId, imageUri: string, replaceUri: ?string): Promise<TLocation> {
		const {executeIfDataNotNull, setData} = this;

		return executeIfDataNotNull(lid, (location: TLocation) => {
			const images = DaoLocation.gImageUrls(location);

			if (images.includes(imageUri))
				_.remove(images, uri => uri == imageUri);

			if (replaceUri && images.includes(replaceUri))
				_.remove(images, uri => uri == replaceUri);

			images.unshift(imageUri);
			_.set(location, DaoLocation.pImageUrls, images);
			setData(lid, location);
		});
	}

	_removeFromImagesArray(lid: TId, imageUri: string): Promise<TLocation> {
		const {executeIfDataNotNull, setData} = this;

		return executeIfDataNotNull(lid, (location: TLocation) => {
			const images = DaoLocation.gImageUrls(location);
			_.remove(images, uri => uri == imageUri);
			_.set(location, DaoLocation.pImageUrls, images);
			setData(lid, location);
		});
	}

	addImage(lid: TId, imageUri: string): Promise<string> {
		// Update the UI before running the request
		this._addToImagesArray(lid, imageUri);

		return ApiClient.mediaAddTypeIdItemId(0, lid, imageUri)
			.then(addedUrl => {
				Logger.v('CacheMapDefLocationProfileActionCreator addImage: success', lid, addedUrl);
				Snackbar.showSuccessStr(t('t_ls_location_image_uploaded'));
				return addedUrl;
			})
			.catch(err => {
				Logger.v('CacheMapDefLocationProfileActionCreator addImage: failed', lid, err);
				this._removeFromImagesArray(lid, imageUri);
				Snackbar.showErrorStr(Validate.mapErrorCodeToMessage(err));
				return err;
			});
	}

}
