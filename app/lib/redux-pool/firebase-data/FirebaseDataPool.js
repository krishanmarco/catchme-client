/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import FirebaseDataActionCreator from "./FirebaseDataActionCreator";
import FirebaseDataDefFeaturedAds, {FIREBASE_DATA_ID_FEATURED_ADS} from "./def/FirebaseDataDefFeaturedAds";
import FirebaseDataDefFeed, {FIREBASE_DATA_ID_FEED} from "./def/FirebaseDataDefFeed";
import {
	FirebaseDataState,
	mutatorFirebaseDataOnPreBulkFetch,
	mutatorFirebaseDataSaveReceivedData,
	mutatorFirebaseDataSetFetchedAllItems
} from "./FirebaseDataModel";
import type {TPool} from "../Pool";


// Define result of poolConnect for this pool
export type TFirebaseDataPool = FirebaseDataActionCreator & FirebaseDataState;


// Define all Actions (There should for each ACTION)
export const POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH = 'POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH';
export const POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA = 'POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA';
export const POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS = 'POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS';


const FirebaseDataPool: TPool = {

	mutators: {
		[POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH]: mutatorFirebaseDataOnPreBulkFetch,
		[POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA]: mutatorFirebaseDataSaveReceivedData,
		[POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS]: mutatorFirebaseDataSetFetchedAllItems
	},

	connectParams: {
		getDefaultActionCreator: (poolId, dispatch) => new FirebaseDataActionCreator(poolId, dispatch)
	},

	defs: {
		[FIREBASE_DATA_ID_FEED]: FirebaseDataDefFeed,
		[FIREBASE_DATA_ID_FEATURED_ADS]: FirebaseDataDefFeaturedAds,

	}

};
export default FirebaseDataPool;
