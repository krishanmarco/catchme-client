/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import {FIREBASE_DATA_ID_FEATURED_ADS} from "./def/FirebaseDataDefFeaturedAds";
import type {TDispatch, TGetState} from "../../types/Types";
import {FirebaseDataState} from "./FirebaseDataModel";


export type TFirebaseDataDef<TFirebaseDataObject> = {

	// Unique firebase-data-id that this definition represents
	firebaseDataId: string,

	// Initial state of this firebase-data
	initState: () => FirebaseDataState,

	// Function to get the data associated to a firebase-id
	getObjectByFirebaseId: (number) => TFirebaseDataObject,

	// Function to get the firebase-data-ids in the current firebase-users object
	getUserObjectIds: (number) => TFirebaseDataObject,

	// Function to map each TFirebaseDataObject to its unique-id
	keyExtractor: (TFirebaseDataObject) => string,

	// Function to map the TFirebaseDataObject to a local defined object
	// if there is no locally defined definition then return the item (item => item)

	// Function that gets triggered for each TFirebaseDataObject that is received
	onReceiveLocalItem: (TFirebaseDataObject) => {}

};


export default class FirebaseDataDef {

	constructor(firebaseDataId) {
		this.firebaseDataId = firebaseDataId;
		this.initState = this.initState.bind(this);
		this.mapFirebaseItemToLocalItem = this.mapFirebaseItemToLocalItem.bind(this);
		this.onReceiveLocalItem = this.onReceiveLocalItem.bind(this);
		this.bindAction = this.bindAction.bind(this);
	}

	initState(): FirebaseDataState {
		return new FirebaseDataState(this.firebaseDataId);
	}

	mapFirebaseItemToLocalItem(firebaseItem) {
		return firebaseItem;
	}

	onReceiveLocalItem(firebaseItem) {
		// Nothing for now
	}

	bindAction(dispatch: TDispatch, getState: TGetState) {
		this.dispatch = dispatch;
		this.getState = getState;
	}

	unBindAction() {
		this.dispatch = null;
		this.getState = null;
	}

}