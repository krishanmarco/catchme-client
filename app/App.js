/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/

// Initialize the application, checks if the user is logged in
// If he is then ./AppAuthenticated is run, else ./AppUnauthenticated
import {bootstrapRkTheme} from './lib/theme/RkTheme';
import RealmIO from './lib/data/RealmIO';
import DaoUser from "./lib/daos/DaoUser";
import runAppUnuth from './AppUnauthenticated';
import runAppAuth from './AppAuthenticated';
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


export function startApplication(userProfile: TUser = undefined) {
  userProfile = userProfile || RealmIO.getLocalUserData();

  // Try get the logged in user from realm
  let apiKey = DaoUser.gApiKey(userProfile);

  if (apiKey == null) {

    runAppUnuth();

  } else {

    runAppAuth(userProfile);

  }
}

