/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {Icons} from '../../Config';
import {t} from '../i18n/Translations';


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
		{value: 200, icon: Icons.reputationJoe, id: 'joe'},
		{value: 800, icon: Icons.reputationDude, id: 'dude'},
		{value: 3200, icon: Icons.reputationHero, id: 'hero'},
		{value: 12800, icon: Icons.reputationVip, id: 'vip'},
		{value: 51200, icon: Icons.reputationCatcher, id: 'catcher'}
	];
	
	static reputationToIcon(value) {
		const rep = Maps._EReputations.filter(r => r.value > value);
		return _.get(rep, '[0].icon', Maps._EReputations[0].icon);
	}
	
	
	
	
	static _EPrivacySettings = [
		{value: 0, label: t('t_only_me')},
		{value: 1, label: t('t_everyone')},
		{value: 2, label: t('t_my_friends')},
	];
	
	static privacyDefault() {
		return Maps._EPrivacySettings[2];
	}
	
	static privacyOptions() {
		return Maps._EPrivacySettings.slice(0);
	}



	static _EDaysOfWeek = [
		{value: 0, label: t('t_monday')},
		{value: 1, label: t('t_tuesday')},
		{value: 2, label: t('t_wednesday')},
		{value: 3, label: t('t_thursday')},
		{value: 4, label: t('t_friday')},
		{value: 5, label: t('t_saturday')},
		{value: 6, label: t('t_sunday')}
	];

	static daysOfWeek() {
		return this._EDaysOfWeek.map(day => day.label);
	}


	
}