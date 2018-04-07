/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import FirebaseDataActionCreator from "../FirebaseDataActionCreator";
import FirebaseDataDef from "../FirebaseDataDef";
import {FirebaseData} from "../../../data/Firebase";
import {TActionHandlerParams} from "../../../helpers/ActionHandler";
import {TFeed} from "../../../daos/DaoFeed";
import type {TFirebaseDataDef} from "../FirebaseDataDef";

export const FIREBASE_DATA_ID_FEED = 'firebaseDataIdFeed';

// Declare firebase-data definition
class FirebaseDataDefFeed extends FirebaseDataDef<TFeed> {

	handleClickAction(actionHandlerParams: TActionHandlerParams): Promise {
		return FirebaseDataActionCreator.handleClickAction(actionHandlerParams, FIREBASE_DATA_ID_FEED);
	}

	constructor() {
		super(FIREBASE_DATA_ID_FEED);
		this.getObjectByFirebaseId = this.getObjectByFirebaseId.bind(this);
		this.getUserObjectIds = this.getUserObjectIds.bind(this);
		this.keyExtractor = this.keyExtractor.bind(this);
		this.onReceiveLocalItem = this.onReceiveLocalItem.bind(this);
		this.removeObjectByFirebaseId = this.removeObjectByFirebaseId.bind(this);
	}

	getObjectByFirebaseId(feedId: number): TFeed {
		return FirebaseData.dbFeedById(feedId);
	}

	getUserObjectIds(userId: number): TFeed {
		return FirebaseData.dbUserFeedIds(userId);
	}

	removeObjectByFirebaseId(userId: number, feedId: number) {
		this.getObjectByFirebaseId(feedId).remove();
		FirebaseData.dbUserFeedId(userId, feedId).remove();
	}

	keyExtractor(feedItem): string {
		return feedItem.id;
	}

}

// Declare firebase-data sub-type
export type TFirebaseDataDefFeed = TFirebaseDataDef<TFeed>;

const firebaseDataDefFeed: TFirebaseDataDefFeed = new FirebaseDataDefFeed();
export default firebaseDataDefFeed;
