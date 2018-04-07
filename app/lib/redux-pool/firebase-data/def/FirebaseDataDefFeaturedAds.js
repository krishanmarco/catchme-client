import FirebaseDataActionCreator from "../FirebaseDataActionCreator";
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import FirebaseDataDef from "../FirebaseDataDef";
import {FirebaseData} from "../../../data/Firebase";
import {TActionHandlerParams} from "../../../helpers/ActionHandler";
import type {TFirebaseDataDef} from "../FirebaseDataDef";

export const FIREBASE_DATA_ID_FEATURED_ADS = 'firebaseDataIdFeaturedAds';

// Declare firebase-data definition
class FirebaseDataDefFeaturedAds extends FirebaseDataDef<Object> {

	static handleClickAction(actionHandlerParams: TActionHandlerParams): Promise {
		return FirebaseDataActionCreator.handleClickAction(actionHandlerParams, FIREBASE_DATA_ID_FEATURED_ADS);
	}



	constructor() {
		super(FIREBASE_DATA_ID_FEATURED_ADS);
		this.getObjectByFirebaseId = this.getObjectByFirebaseId.bind(this);
		this.getUserObjectIds = this.getUserObjectIds.bind(this);
		this.keyExtractor = this.keyExtractor.bind(this);
	}

	getObjectByFirebaseId(featuredAdId: number): Object {
		return FirebaseData.dbFeaturedAdById(featuredAdId);
	}

	getUserObjectIds(userId: number): Object {
		return FirebaseData.dbUserFeaturedAdIds(userId);
	}

	keyExtractor(featuredAdItem): string {
		return featuredAdItem.id;
	}

}

// Declare firebase-data sub-type
export type TFirebaseDataDefFeaturedAds = TFirebaseDataDef<Object>;

const firebaseDataDefFeaturedAds: TFirebaseDataDefFeaturedAds = new FirebaseDataDefFeaturedAds();
export default firebaseDataDefFeaturedAds;

