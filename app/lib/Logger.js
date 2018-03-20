/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable no-console */
import {Const} from "../Config";

export default class Logger {

	static _isDevMode() {
		return Const.Development.devMode;
	}

	// (Verbose) Used for normal logging
	static v(...strings) {
		if (Logger._isDevMode())
			console.log(strings);
	}
	
	// (Error) Used for normal error logging
	static e(...strings) {
		if (Logger._isDevMode())
			console.error(strings);
	}
	
	// (What a terrible failure) Used for error
	// logging in cases that should not occur
	static wtf(...strings) {
		if (Logger._isDevMode())
			console.error(strings);
	}
	
}