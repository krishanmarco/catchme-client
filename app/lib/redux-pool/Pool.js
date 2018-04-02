/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import PoolActionCreator from "./PoolActionCreator";
import {TPoolDef} from "./PoolDef";


// A mutator is a function that takes an action (Object) and the previous state (Object)
// And returns the new state, these are pure functions.
// A mutator is essentially a single case in a Redux Reducer.
export type TAction = Object;
export type TMutator<TState> = (TAction, TState) => TState;

// High level definition of how this pool looks, how it is created and
// how it mutates, see redux/Pool.js
export type TPool = {
	
	// Object containing all the mutators for this Pool,
	// The keys should be equals to the ACTIONS that call that mutator
	mutators: {[string]: TMutator},
	
	connectParams: {
		
		getExtraProps?: (string, Object, Object, Object) => {},
		
		getActionCreators: (string, Object, Function) => PoolActionCreator
		
	},
	
	defs: {[string]: TPoolDef}
	
};
