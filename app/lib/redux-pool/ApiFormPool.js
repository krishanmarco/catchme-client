/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/

export type TApiFormPool<TApiFormObject> = {
	post: () => {},
	initState: () => {},
	validator: () => {}
};