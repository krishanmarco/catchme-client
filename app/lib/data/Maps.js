/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {Icons} from "../../Config";


export default class Maps {
	
	
	static _EGenders = [
		{value: 0, icon: Icons.female},
		{value: 1, icon: Icons.male},
		{value: 2, icon: Icons.genderUnknown}
	];
	
	static genderDefault() {
		return Maps._EGenders[2];
	}
	
	static genderToIcon(value) {
		return _.get(Maps._EGenders, `[${value}].icon`, Maps.genderDefault().icon);
	}
	
	
	
	
	static _EReputations = [
		{value: 200, icon: Icons.friendRequestAccept, name: 'joe'},
		{value: 800, icon: Icons.friendRequestAccept, name: 'dude'},
		{value: 3200, icon: Icons.friendRequestAccept, name: 'hero'},
		{value: 12800, icon: Icons.friendRequestAccept, name: 'vip'},
		{value: 51200, icon: Icons.friendRequestAccept, name: 'catcher'},
		{value: Infinity, icon: Icons.friendRequestAccept, name: 'su'}
	];
	
	static reputationToIcon(value) {
		const rep = Maps._EReputations.filter(r => r.value > value);
		return _.get(rep, '[0].icon', Maps._EReputations[0].icon);
	}
	
	
	
	
	static _EPrivacySettings = [
		{value: 0, label: 'Only me'},
		{value: 1, label: 'My friends'},
		{value: 2, label: 'Everyone'},
	];
	
	static privacyDefault() {
		return Maps._EPrivacySettings[2];
	}
	
	static privacyOptions() {
		return Maps._EPrivacySettings.slice(0);
	}



	static _EDaysOfWeek = [
		{value: 0, label: 'Monday'},
		{value: 1, label: 'Tuesday'},
		{value: 2, label: 'Wednesday'},
		{value: 3, label: 'Thursday'},
		{value: 4, label: 'Friday'},
		{value: 5, label: 'Saturday'},
		{value: 6, label: 'Sunday'},
		// {value: 7, label: '?'}, todo
	];

	static daysOfWeek() {
		return this._EDaysOfWeek.map(day => day.label);
	}


	
}