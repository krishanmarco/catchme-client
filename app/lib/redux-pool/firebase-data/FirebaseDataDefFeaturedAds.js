/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import FirebaseDataDef from "./FirebaseDataDef";
import {FIREBASE_DATA_ID_FEATURED_ADS, ReduxFirebaseData} from "../../../redux/ReduxPool";
import {FirebaseData} from "../../data/Firebase";
import type {TFirebaseDataDef} from "./FirebaseDataDef";

// Declare firebase-data definition
class FirebaseDataDefFeaturedAds extends FirebaseDataDef<Object> {

	constructor() {
		super(FIREBASE_DATA_ID_FEATURED_ADS);
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
