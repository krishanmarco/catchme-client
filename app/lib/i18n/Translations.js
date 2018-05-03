/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 03-May-18 © **/
import I18n from 'react-native-i18n';
import {Icons} from "../../Config";

// Enable fallbacks, eg en-US and en-GB fallback to en
I18n.fallbacks = true;

//
I18n.translations = {

	// en ***************************************************************************************************
	// en ***************************************************************************************************
	en: {
		t_catchme_user: 'Catchme user',
		t_search: 'Search',

		t_search_location_map: 'Search for your location',
		t_search_location: 'Search by name, email, phone or address',
		t_search_user: 'Search by name, email, phone or address',

		t_am: 'am',
		t_pm: 'pm',

		t_uls_now: 'now',
		t_later: 'later on',
		t_top_5_places: 'top 5 places',

		t_user_public_message: 'Hey! I\'m on catchme too!',


		t_monday: 'Monday',
		t_tuesday: 'Tuesday',
		t_wednesday: 'Wednesday',
		t_thursday: 'Thursday',
		t_friday: 'Friday',
		t_saturday: 'Saturday',
		t_sunday: 'Sunday',
		t_only_me: 'Only me',
		t_everyone: 'Everyone',
		t_my_friends: 'My friends',

		t_catch_info: 'catch info',
		t_user_info: 'user info',
		t_your_account: 'your account',
		t_account: 'Account',
		t_notifications: 'Notifications',
		t_my_locations: 'My locations',
		t_add_contacts: 'Add contacts',
		t_faq: 'FAQ',
		t_contact_us: 'Contact us',
		t_tos: 'Terms of service',
		t_app_info: 'App Info.',

		t_location_open: 'Open now!',
		t_location_closed: 'Closed!',

		t_today: 'Today',
		t_tomorrow: 'Tomorrow',
		t_yesterday: 'Yesterday',
		t_last: 'Last',
		t_from: 'from',
		t_to: 'to',

		t_empty_featured_ads: 'Nothing much is going on now...',
		t_empty_feed: 'You have no feed items for now. Maybe check back later...',
		t_empty_location_gallery: 'No one has posted pictures of this location. Be the first one to share an image!',
		t_empty_uls: 'It seems like you have no plans to go out.\nOr maybe you just haven\'t added them yet.\nSearch for a location and add your next exciting location.',


		t_e_generic_error: 'Generic error',
		t_e_form_error: 'Form error',
		t_e_not_allowed: 'You are not allowed to do that',
		t_e_email_taken: 'That email is taken',
		t_e_user_not_found: 'That user was not found',
		t_e_wrong_password: 'Wrong password',
		t_e_user_banned: 'This user has been banned',
		t_e_upload_failed: 'The file upload failed',
		t_e_invalid_social_token: 'Something wen\'t wrong',
		t_e_field_invalid: 'This field was not valid',
		t_e_field_not_set: 'Please fill this field',
		t_e_field_length_invalid: 'The length of this field is invalid',
		t_e_field_length_short: 'This field is too short',
		t_e_field_length_long: 'This field is too long',
		t_e_field_phone: 'Please insert a valid phone number',
		t_e_field_email: 'Please insert a valid email',
		t_e_field_url: 'That URL was not valid',
		t_e_field_country: 'Please insert a valid country',
		t_e_passwords_not_equal: 'The two passwords do not match',

	}




};
export const t = I18n.t;