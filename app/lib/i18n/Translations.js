/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 03-May-18 © **/
import I18n from 'react-native-i18n';

// Enable fallbacks, eg en-US and en-GB fallback to en
I18n.fallbacks = true;

//
I18n.translations = {

	// en ***************************************************************************************************
	// en ***************************************************************************************************
	en: {
		t_catchme: 'Catchme',
		t_my_contacts: 'My contacts',
		t_logout: 'Logout',
		t_new_location: 'New location',
		t_add_new_location: 'Add a new location',
		t_change_password: 'Change password',
		t_catchme_user: 'Catchme user',
		t_search: 'Search',
		t_feed: 'Feed',
		t_featured: 'Featured',

		t_search_location_map: 'Search for your location',
		t_search_location: 'Search by name, email, phone or address',
		t_search_user: 'Search by name, email or phone',

		t_am: 'am',
		t_pm: 'pm',

		t_uls_now: 'now',
		t_uls_later: 'later on',
		t_top_5_places: 'Most frequent places',

		t_uls_here_now: 'I am here now!',
		t_uls_here_later: 'I will be here later!',

		t_user_public_message: 'Hey! I\'m on catchme too!',

		t_country: 'Country',
		t_state: 'State',
		t_city: 'City',
		t_postcode: 'Postcode',
		t_address: 'Address',

		t_privacy: 'Privacy',
		t_privacy_previous_location: 'My previous location',
		t_privacy_current_location: 'My current location',
		t_privacy_next_location: 'My next location',
		t_privacy_email: 'My email',
		t_privacy_phone: 'My phone number',

		t_disable_all: 'Disable all',
		t_notifications_friendship_request: 'Friendship request',
		t_notifications_friend_actions: 'Friend actions',
		t_notifications_catchme_suggestions: 'Catchme suggestions',

		t_si_edit_location_address: 'Press the image above to select a location',
		t_bt_edit_location: 'Save & Close',

		t_capacity: 'Capacity',
		t_gender_male: 'Male',
		t_gender_female: 'Female',
		t_gender_total: 'Total',


		t_field_name: 'Name',
		t_field_email: 'Email',
		t_field_password: 'Password',
		t_field_password_confirm: 'Confirm password',
		t_field_password_new: 'New password',
		t_field_phone: 'Phone',
		t_field_description: 'Description',
		t_field_status: 'Status',
		t_field_capacity: 'Capacity',

		t_locations: 'Locations',
		t_people: 'People',

		t_bt_login: 'LOGIN',
		t_bt_register: 'SIGN UP',
		t_bt_back: 'BACK',
		t_bt_change: 'CHANGE',
		t_bt_confirm: 'CONFIRM',
		t_bt_logout: 'LOGOUT',
		t_bt_send: 'SEND',

		t_login_no_account: 'Don\'t have an account?',
		t_clk_login_no_account: 'Sign up now!',
		t_login_forgot_pw: 'Forgot your password?',
		t_clk_login_forgot_pw: 'Recover it!',
		t_register_login: 'Already have an account?',
		t_clk_register_login: 'Sign in!',

		t_si_settings_change_password: 'From this screen you can change your password',
		t_si_settings_change_password_success: 'Your password has been changed successfully',
		t_si_settings_recover_password: 'Enter your email below to receive your password reset instructions',
		t_si_settings_recover_password_success: 'Your password has been sent to your email address',
		t_si_settings_logout: 'Are you sure you want to log out?',
		t_si_settings_admin_locations: 'These are the locations that you manage',
		t_si_settings_notifications: 'Here you can tweak your notification settings',

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
		t_your_account: 'Your account',
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

		t_empty_featured_ads: 'Nothing much is going on now',
		t_empty_feed: 'You have no feed items for now. Maybe check back later',
		t_empty_location_gallery: 'No one has posted pictures of this location. Be the first one to share an image!',
		t_empty_bt_location_gallery: 'Add a picture!',
		t_empty_uls: 'It seems like you have no plans to go out.\nOr maybe you just haven\'t added them yet.\nSearch for a location and add your next exciting location',
		t_empty_location_friends_now: 'We\'re very sorry, there\'s no one at this location now.\nMaybe you should pull a croud here',
		t_empty_bt_location_friends_now: 'I will!',
		t_empty_location_friends_later: 'No one will be here later, or will you?',
		t_empty_bt_location_friends_later: 'I will!',
		t_empty_search: 'Mmm... There were no results for that search',
		t_empty_add_contacts: 'Well, it seems like none of your contacts are using catchme.\nMaybe you should invite them :)',
		t_empty_admin_locations: 'You have not yet added any locations, if you are the owner of a club/bar you can add it to catchme here',
		t_empty_bt_admin_locations: 'Add your club',
		t_empty_user_location_favorites: 'This is suspicious...\nYou don\'t have any favorite locations, use the search screen to find and add your favorite locations',
		t_empty_user_other_location_favorites: 'This user doesn\'t have any favorite locations',
		t_empty_bt_user_location_favorites: 'Search for a location',
		t_empty_user_friends: 'This is a bit sad...\nYou don\'t have any friends on catchme, use the search screen to find your friends',
		t_empty_user_other_friends: 'This user doesn\'t have any friends',
		t_empty_bt_user_friends: 'Search for your friends',
		t_no_wifi: 'Please connect to the internet',


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
		t_e_incorrect_recovery_key: 'Invalid recovery key',

		// Local errors
		t_le_camera_capture_failed: 'Something went wrong while capturing your image',
		t_le_admin_location_add_failed: 'Something went wrong while adding your location',

		// Local success
		t_ls_connection_accepted: 'Friend request accepted',
		// t_ls_uls_removed: 'Your status has been removed',
		t_ls_user_blocked: 'User blocked. They won\'t be able to see your status anymore',
		t_ls_user_removed: 'User removed. They will still be able to see your status but are not friends anymore',
		t_ls_user_cancel: 'Friend request canceled.',
		t_ls_user_added: 'Friend request sent. The other user will first have to accept before becoming your friend',
		t_ls_admin_location_added: 'This location was added to the ones you own',
		t_ls_location_image_uploaded: 'Your image was uploaded',

		t_srv_feed_friend_added_image: '',
		t_srv_feed_friendship_accept: '',
		t_srv_feed_friendship_request: '',
		t_srv_feed_user_attendance_request_1: '',
		t_src_feed_user_attendance_request_2: '',

	}

};

// Important, this has to be a lazy eval
// export const t = I18n.t; will fail!
export const t = id => I18n.t(id);