/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable no-console */

export default class Logger {
	
	// (Verbose) Used for normal logging
	static v(...strings) {
		console.log(strings);
	}
	
	// (Error) Used for normal error logging
	static e(...strings) {
		console.error(strings);
	}
	
	// (What a terrible failure) Used for error
	// logging in cases that should not occur
	static wtf(...strings) {
		console.error(strings);
	}
	
}