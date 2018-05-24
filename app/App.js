/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable no-console */

// Initialize the application, checks if the user is logged in
// If he is then ./AppAuthenticated is run, else ./AppUnauthenticated
import DaoUser from "./lib/daos/DaoUser";
import StorageIO from './lib/data/StorageIO';
import runAppAuth from './AppAuthenticated';
import runAppUnuth from './AppUnauthenticated';
import {bootstrapRkTheme} from './lib/theme/RkTheme';
import type {TUser} from "./lib/daos/DaoUser";


export function initializeApplication() {
	
	// Set all the warnings to ignore by adding the prefix of the warning message
	console.ignoredYellowBox = [
		'Setting a timer',
		'Warning: Failed prop type: Invalid props.style key `fontSize`',
		'Warning: React.createClass is no longer supported',
		'Warning: PropTypes has been moved to a separate',
		'Warning: checkPropTypes has been moved to a separate'
	];
	
	
	// Bootstrap the KittenUI theme
	bootstrapRkTheme();
	
}


export async function startApplication(userProfile: ?TUser = null) {
	userProfile = userProfile || await StorageIO.getLocalUser();
	
	// Try get the logged in user from storage
	let apiKey = DaoUser.gApiKey(userProfile);
	
	if (apiKey == null) {
		runAppUnuth();
		
	} else {
		runAppAuth(userProfile);
	}
}

