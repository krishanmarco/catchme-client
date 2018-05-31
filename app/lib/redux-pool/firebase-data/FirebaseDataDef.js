/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import {FirebaseDataState} from './FirebaseDataModel';


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
	onReceiveLocalItem: (TFirebaseDataObject) => void,

	// Function that gets triggered for each TFirebaseDataObject that is received
	removeObjectByFirebaseId: (userId: number, firebaseDataId: string) => void

};


export default class FirebaseDataDef {

	constructor(firebaseDataId: string) {
		this.firebaseDataId = firebaseDataId;
		this.initState = this.initState.bind(this);
		this.mapFirebaseItemToLocalItem = this.mapFirebaseItemToLocalItem.bind(this);
		this.onReceiveLocalItem = this.onReceiveLocalItem.bind(this);
	}

	initState(): FirebaseDataState {
		return new FirebaseDataState(this.firebaseDataId);
	}

	mapFirebaseItemToLocalItem(firebaseItem: Object): Object {
		return firebaseItem;
	}

	onReceiveLocalItem(firebaseItem: Object) {
		// Nothing for now
	}

}