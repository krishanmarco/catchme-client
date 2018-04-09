/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import _ from 'lodash';
import DaoAction from "../../daos/DaoAction";
import {arrayClean, arrayCleanAndVerify} from "../../HelperFunctions";
import {Const} from "../../../Config";

export class FirebaseDataState {

	constructor(poolDefId: string) {

		// Unique pId that identifies this pool out of all the
		// possible objects in objectPoolReducerInitState.firebaseData
		this.poolDefId = poolDefId;

		// If all items have been fetched (recieved.length === saved.length)
		// then this flag is set to true to stop future requests
		this.fetchedAllItems = false;

		// When the first data request is being run
		// (limitToLast(...).once('value')) this flag is true
		// Once this flag has been set to false the only way to recieve
		// new data will be though the on('child_added') subscriber
		this.runningBulkFetch = true;

		// Defines how many items to fetch on each loadMore() call
		this.itemsToLoad = Const.FirebaseDataPool.loadMoreItems;

		// The received data
		this.data = [];

	}

}

// FirebaseData state-mutators (Reducer cases)
export function mutatorFirebaseDataOnPreBulkFetch(action, subState: FirebaseDataState): FirebaseDataState {
	return {
		runningBulkFetch: true,
		itemsToLoad: subState.itemsToLoad + Const.FirebaseDataPool.loadMoreItems
	};
}

export function mutatorFirebaseDataSaveReceivedData(action, subState: FirebaseDataState): FirebaseDataState {
	return {
		runningBulkFetch: false,
		data: arrayCleanAndVerify(action.data, DaoAction.pId)
	};
}

export function mutatorFirebaseDataSetFetchedAllItems(action, subState: FirebaseDataState): FirebaseDataState {
	return {
		fetchedAllItems: true,
		runningBulkFetch: false,
	};
}
