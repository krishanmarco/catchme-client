/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import FirebaseDataDef from "../FirebaseDataDef";
import {FirebaseData} from "../../../data/Firebase";
import {TFeed} from "../../../daos/DaoFeed";
import type {TFirebaseDataDef} from "../FirebaseDataDef";
import DaoFeed from "../../../daos/DaoFeed";

export const FIREBASE_DATA_ID_FEED = 'firebaseDataIdFeed';

// Declare firebase-data definition
class FirebaseDataDefFeed extends FirebaseDataDef<TFeed> {

	constructor() {
		super(FIREBASE_DATA_ID_FEED);
		this.getObjectByFirebaseId = this.getObjectByFirebaseId.bind(this);
		this.getUserObjectIds = this.getUserObjectIds.bind(this);
		this.keyExtractor = this.keyExtractor.bind(this);
		this.onReceiveLocalItem = this.onReceiveLocalItem.bind(this);
	}

	getObjectByFirebaseId(feedId: number): TFeed {
		return FirebaseData.dbFeedById(feedId);
	}

	getUserObjectIds(userId: number): TFeed {
		return FirebaseData.dbUserFeedIds(userId);
	}

	keyExtractor(feedItem): string {
		return feedItem.id;
	}

	// Overrides parent
	onReceiveLocalItem(feedItem: TFeed) {
		if (!DaoFeed.gConsumeOnView(feedItem))
			return;

		// Delete this feed-item from the fetched state

	}

}

// Declare firebase-data sub-type
export type TFirebaseDataDefFeed = TFirebaseDataDef<TFeed>;

const firebaseDataDefFeed: TFirebaseDataDefFeed = new FirebaseDataDefFeed();
export default firebaseDataDefFeed;
