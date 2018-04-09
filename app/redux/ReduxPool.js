/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable max-depth */
import ApiFormPool from "../lib/redux-pool/api-form/ApiFormPool";
import CacheMapPool from "../lib/redux-pool/cache-map/CacheMapPool";
import CachePool from "../lib/redux-pool/cache/CachePool";
import FirebaseDataPool from "../lib/redux-pool/firebase-data/FirebaseDataPool";
import {connect} from 'react-redux';
import {TState} from "../lib/types/Types";
import type {TDispatch} from "../lib/types/Types";




// Top Level Ids ******************************************************************************************************
// Top Level Ids ******************************************************************************************************

// ReduxPool Top Level Type Ids
export const POOL_TYPE_CACHE = 'POOL_TYPE_CACHE';
export const POOL_TYPE_CACHE_MAP = 'POOL_TYPE_CACHE_MAP';
export const POOL_TYPE_API_FORMS = 'POOL_TYPE_API_FORMS';
export const POOL_TYPE_LOCAL_FORMS = 'POOL_TYPE_LOCAL_FORMS';
export const POOL_TYPE_FIREBASE_DATA = 'POOL_TYPE_LOCAL_FORMS';


// ObjectWrappers *****************************************************************************************************
// ObjectWrappers *****************************************************************************************************

function build(poolDeclaration) {
	
	const result = {};
	
	// for each pool type, add it and its sub pools to the result
	for (let typeId in poolDeclaration) {
		if (poolDeclaration.hasOwnProperty(typeId)) {
			
			const poolTypeDeclaration = poolDeclaration[typeId];
			
			
			// Add the pool type to the result
			result[typeId] = {};
			
			
			for (let poolId in poolTypeDeclaration.defs) {
				if (poolTypeDeclaration.defs.hasOwnProperty(poolId)) {
					
					const poolDeclaration = poolTypeDeclaration.defs[poolId];
					
					// Add the pool to the result
					result[typeId][poolId] = poolDeclaration.initState();
					
				}
			}
			
		}
	}
	
	return result;
}

// Function that applies a function (apply)
// to each pool in the ReduxPoolBuilder
function poolIterator(poolDeclaration, poolIds, apply) {
	
	for (let poolType in poolDeclaration) {
		if (poolDeclaration.hasOwnProperty(poolType)) {
			
			// Get the whole pool declaration object
			const poolTypeObj = poolDeclaration[poolType];
			
			for (let poolId in poolTypeObj.defs) {
				if (poolTypeObj.defs.hasOwnProperty(poolId)) {
					
					if (poolIds.includes(poolId))
						apply(poolType, poolId, poolDeclaration[poolType].defs[poolId]);
					
				}
			}
			
		}
	}
	
}


// ReduxPool Top Level Builders ***************************************************************************************
// ReduxPool Top Level Builders ***************************************************************************************

// The object below declares how the reduxPoolInitState state is built
export const ReduxPoolBuilder = {
	[POOL_TYPE_CACHE]: CachePool,
	[POOL_TYPE_API_FORMS]: ApiFormPool,
	[POOL_TYPE_CACHE_MAP]: CacheMapPool,
	[POOL_TYPE_FIREBASE_DATA]: FirebaseDataPool
};


// Redux **************************************************************************************************************
// Redux **************************************************************************************************************

// ReduxPool initial state, all ids should be unique in this object
// Foreach pool that needs to exist initialize it using
// its pId as key and the associated Object-Wrapper as its value
const reduxPoolInitState = build(ReduxPoolBuilder);


export function reduxPoolReducer(state = reduxPoolInitState, action) {
	
	
	if ('poolType' in action && 'poolId' in action) {
		
		return Object.assign({}, state, {
			[action.poolType]: Object.assign({}, state[action.poolType], {
				[action.poolId]: Object.assign({}, state[action.poolType][action.poolId],
					ReduxPoolBuilder[action.poolType].mutators[action.type](action, state[action.poolType][action.poolId])
				)
			})
		});
		
	}
	
	
	return state;
	
}


// ReduxPoolSubscribers ***********************************************************************************************
// ReduxPoolSubscribers ***********************************************************************************************

export function poolConnect(presentationalComponent, mapStateToProps, mapDispatchToProps, poolIds, extraOptions = {}) {
	return connect(
		// mapStateToProps
		subscribeStateToPools(mapStateToProps, poolIds),
		
		// mapDispatchToProps
		subscribeDispatchToPools(mapDispatchToProps, poolIds),
		
		// mergeProps
		(stateProps, dispatchProps, ownProps) => {
			
			// Initialize the merge result with the props
			// that were passed in from the component
			const mergeResult = Object.assign({}, stateProps, dispatchProps, ownProps);
			
			poolIterator(
				// Pool declaration to iterate over
				ReduxPoolBuilder,
				
				// Pool ids to call the 3rd param function on
				poolIds,
				
				// Callback function to apply to each pool Id
				(poolType, poolId, pool) => {
					
					let extraProps = {};
					const getExtraProps = ReduxPoolBuilder[poolType].connectParams.getExtraProps;
					
					if (getExtraProps != null)
						extraProps = getExtraProps(poolId, pool, stateProps[poolId], dispatchProps[poolId]);
					
					
					mergeResult[poolId] = Object.assign(
						// Merge the sub-pool state props
						stateProps[poolId],
						
						// Merge the sub-pool dispatch props
						dispatchProps[poolId],
						
						// Merge the sub-pool extra props (If set)
						extraProps
					);
					
				}
			);
			
			return mergeResult;
		},
		
		// Extra options
		extraOptions
	)(presentationalComponent);
}


function subscribeStateToPools(mapStateToProps, poolIds) {
	return (state: TState) => {
		
		// initialize the result with the default input mapDispatchToProps
		let mapStateToPropsResult = mapStateToProps(state);
		
		
		poolIterator(
			// Pool Builder
			ReduxPoolBuilder,
			
			// Pool ids to call the 3rd param function on
			poolIds,
			
			// Function to apply to each pool
			(poolType, poolId) => {
				
				const poolState = state.reduxPoolReducer[poolType][poolId];
				
				// Merge the current result with the found pool
				mapStateToPropsResult = Object.assign({}, mapStateToPropsResult, {[poolId]: poolState});
				
			}
		);
		
		
		return mapStateToPropsResult;
		
	};
}


function subscribeDispatchToPools(mapDispatchToProps, poolIds) {
	return (dispatch: TDispatch) => {

		// initialize the result with the default input mapDispatchToProps
		let mapDispatchToPropsResult = mapDispatchToProps(dispatch);

		poolIterator(
			// Pool Builder
			ReduxPoolBuilder,
			
			// Pool ids to call the 3rd param function on
			poolIds,
			
			// Function to apply to each pool
			(poolType, poolId) => {
				
				const poolDispatch = ReduxPoolBuilder[poolType].connectParams.getActionCreator(
					// Pass the pool pId (needed dispatch pool specific actions)
					poolId,
					
					// Pass in a the dispatch function
					dispatch
				);


				// Merge the current result with all the indicated pools
				mapDispatchToPropsResult = Object.assign({}, mapDispatchToPropsResult, {[poolId]: poolDispatch});
				
			}
		);
		
		
		return mapDispatchToPropsResult;
	};
}