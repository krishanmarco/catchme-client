/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
import _ from 'lodash';
import {Icons} from '../../Config';
import {t} from '../i18n/Translations';

const maps = {

	genders: {
		get def() { return this.unknown; },
		female: 		{id: 0, 		icon: Icons.genderFemale},
		male: 			{id: 1, 		icon: Icons.genderMale},
		unknown: 		{id: 2, 		icon: Icons.genderUnknown}
	},

	reputations: {
		get def() { return this.joe; },
		joe: 				{id: 0, 		value: 200, 			icon: Icons.reputationJoe},
		dude: 			{id: 1, 		value: 800, 			icon: Icons.reputationDude},
		hero: 			{id: 2, 		value: 3200, 			icon: Icons.reputationHero},
		vip: 				{id: 3, 		value: 12800, 		icon: Icons.reputationVip},
		catcher: 		{id: 4, 		value: 51200, 		icon: Icons.reputationCatcher}
	},

	privacy: {
		get def() { return this.everyone; },
		onlyMe: 		{id: 0, 			label: t('t_only_me')},
		everyone: 	{id: 1, 			label: t('t_everyone')},
		myFriends: 	{id: 2, 			label: t('t_my_friends')},
	},

	days: {
		get def() { return this.monday; },
		monday: 		{id: 0, 			label: t('t_monday')},
		tuesday: 		{id: 1, 			label: t('t_tuesday')},
		wednesday: 	{id: 2, 			label: t('t_wednesday')},
		thursday:	 	{id: 3, 			label: t('t_thursday')},
		friday: 		{id: 4,			  label: t('t_friday')},
		saturday: 	{id: 5, 			label: t('t_saturday')},
		sunday: 		{id: 6, 			label: t('t_sunday')}
	},

	rCodes: {
		get def() { return this.r_err_generic; },
		r_ok:  				 				 				 				{id: 0,  				label: ''},
		r_err_generic:  				 				 			{id: -1,  			label: t('t_e_generic_error')},
		r_err_form:  				 				 					{id: -2,  			label: t('t_e_form_error')},
		r_err_not_allowed:  				 					{id: -3,  			label: t('t_e_not_allowed')},
		r_err_email_taken:  					 				{id: -4,  			label: t('t_e_email_taken')},
		r_err_user_not_found: 								{id: -5,  			label: t('t_e_user_not_found')},
		r_err_incorrect_password: 						{id: -6,  			label: t('t_e_wrong_password')},
		r_err_user_banned: 										{id: -7, 				label: t('t_e_user_banned')},
		r_err_file_upload_failed: 						{id: -8, 				label: t('t_e_upload_failed')},
		r_err_invalid_social_token: 					{id: -9, 				label: t('t_e_invalid_social_token')},
		r_err_fld_invalid: 										{id: -10, 			label: t('t_e_field_invalid')},
		r_err_fld_not_set: 										{id: -11, 			label: t('t_e_field_not_set')},
		r_err_fld_length: 										{id: -12, 			label: t('t_e_field_length_invalid')},
		r_err_fld_length_short: 							{id: -13, 			label: t('t_e_field_length_short')},
		r_err_fld_length_long: 								{id: -14, 			label: t('t_e_field_length_long')},
		r_err_fld_phone: 											{id: -15, 			label: t('t_e_field_phone')},
		r_err_fld_email: 											{id: -16, 			label: t('t_e_field_email')},
		r_err_fld_url: 												{id: -17, 			label: t('t_e_field_url')},
		r_err_fld_country: 										{id: -18, 			label: t('t_e_field_country')},
		r_err_passwords_not_equal: 						{id: -19, 			label: t('t_e_passwords_not_equal')},
		r_err_incorrect_recovery_key: 				{id: -20, 			label: t('t_e_incorrect_recovery_key')},

		r_ex_unknown_status_code: 						{id: -5000, 		label: ''},
		r_ex_invalid_api_key:			 						{id: -5001, 		label: ''}
	}


};



export default class Maps {
	static genders = maps.genders;
	static reputations = maps.reputations;
	static privacy = maps.privacy;
	static days = maps.days;
	static rCodes = maps.rCodes;

	static genderIdToIcon(gid: number) {
		return _.get(_.find(Maps.genders, g => g.id === gid), 'icon', Maps.genders.def.icon);
	}

	static reputationValueToIcon(value: number) {
		const rep = Object.values(Maps.reputations).filter(r => r.value > value);
		const firstKey = _.get(_.keys(rep), '[0]');
		return _.get(rep, `${firstKey}.icon`, Maps.reputations.def.icon);
	}

	static privacyOptions(excludeKeys = []) {
		const privacy = {...Maps.privacy};
		excludeKeys.push('def');
		// delete privacy.def;
		return _.values(_.pickBy(privacy, (v, k) => !excludeKeys.includes(k)));
	}

	static dayIdToString(day: number) {
		return _.get(_.find(Maps.days, v => v.id === day), 'label', Maps.days.def.label);
	}

	static errorIdToRCode(eid: number) {
		const rCode = _.find(Maps.rCodes, e => e.id === eid);
		return rCode != null ? rCode : Maps.rCodes.def;
	}
	
	static errorIdToString(eid: number) {
		return _.get(Maps.errorIdToRCode(eid), 'label', Maps.rCodes.def.label);
	}


}