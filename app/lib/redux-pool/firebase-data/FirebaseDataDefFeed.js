/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import FirebaseDataDef from "./FirebaseDataDef";
import {FIREBASE_DATA_ID_FEED, ReduxFirebaseData} from "../../../redux/ReduxPool";
import {FirebaseData} from "../../data/Firebase";
import type {TFirebaseDataDef} from "./FirebaseDataDef";

// Declare firebase-data definition
class FirebaseDataDefFeed extends FirebaseDataDef<Object> {

	constructor() {
		super(FIREBASE_DATA_ID_FEED);
	}

	initState(): ReduxFirebaseData {
		return new ReduxFirebaseData(FIREBASE_DATA_ID_FEED);
	}

	getObjectByFirebaseId(feedId: number): Object {
		return FirebaseData.dbFeedById(feedId);
	}

	getUserObjectIds(userId: number): Object {
		return FirebaseData.dbUserFeedIds(userId);
	}

	keyExtractor(feedItem): string {
		return feedItem.id;
	}

	mapFirebaseItemToLocalItem(feedItem) {
		return feedItem;
	}

	onReceiveLocalItem(feedItem) {
		// todo: if consumeOnView === true then delete this feed-item from firebase
	}

}

// Declare firebase-data sub-type
export type TFirebaseDataDefFeed = TFirebaseDataDef<Object>;

const firebaseDataDefFeed: TFirebaseDataDefFeed = new FirebaseDataDefFeed();
export default firebaseDataDefFeed;
