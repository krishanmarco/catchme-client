/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/01/18 © **/

import type {TAction} from "../daos/DaoAction";

export type TActionHandler = {
	icon: TIcon,
	isValid: (TAction) => boolean,
	action: (Object, TAction) => Promise
};

export type TIcon = {
	name: string,
	type: string,
	color?: string
};

export type TDataPoint = {
	id: string;
	title: string;
	subtitle?: string;
	icon?: Object;
}

export type TSectionListDataPointSections = {
	title: string,
	data: Array<TDataPoint>
};

export type TNavigator = Object & {
	// react-native-navigation navigator
};

export type TDispatch = (Object) => ?Object;
export type TGetState = () => Object;