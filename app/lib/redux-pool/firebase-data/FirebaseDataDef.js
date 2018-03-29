/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import {ReduxFirebaseData} from "../../../redux/ReduxPool";
import type {TDispatch, TGetState} from "../../types/Types";


export type TFirebaseDataDef<TFirebaseDataObject> = {

	// Unique firebase-data-id that this definition represents
	firebaseDataId: string,

	// Initial state of this firebase-data
	initState: () => ReduxFirebaseData,

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