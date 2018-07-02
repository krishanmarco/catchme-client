/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable guard-for-in */
import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import {RkTheme} from 'react-native-ui-kitten';

// Setup
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => width / guidelineBaseWidth * size;
const scaleVertical = size => height / guidelineBaseHeight * size;



export const Colors = {
	// -------- Pre Migration Config values Kitten UI Theme
	black: '#000000',     //#212121
	white: '#ffffff',
	transparent: '#00FFFFFF',
	grey: '#f0f0f0',
	
	primaryFade: 'rgba(37, 165, 154, 0.3)',
	primaryTrans: 'rgba(37, 165, 154, 0.2)',
	greyFade: '#828282',
	secondary: '#BA000D',
	alertRed: '#BA000D',
	successGreen: '#3bd555',
	neutralOrange: '#ff9147',
	borders: '#F5FCFF',
	
	
	
	// -------- Default Kitten UI Theme
	
	accent: '#25A59A',
	primary: '#25A59A',
	success: '#3bd555',
	disabled: '#cacaca',
	
	foreground: '#212121',
	alterForeground: '#707070',
	inverseForeground: '#ffffff',
	secondaryForeground: '#bcbcbc',
	hintForeground: '#969696',
	
	background: '#ffffff',
	alterBackground: '#f2f2f2',
	overlayBackground: '#00000057',
	neutralBackground: '#f2f2f2',
	fadedBackground: '#e5e5e5',
	
	border: '#f2f2f2',
	
	twitter: '#41abe1',
	google: '#e94335',
	facebook: '#3b5998',
	
	gradientBaseBegin: '#25A59A',
	gradientBaseEnd: '#25A59A',
	
	// -----
	faded: '#e5e5e5',
	icon: '#c2c2c2',
	neutral: '#f2f2f2',
	
	
	info: '#19bfe5',
	warning: '#feb401',
	danger: '#ed1c4d',
	
	starsStat: '#2ab5fa',
	tweetsStat: '#ffc61c',
	likesStat: '#5468ff',
	
	doughnutFirst: '#8a98ff',
	doughnutSecond: '#ffd146',
	doughnutThird: '#c2d521',
	doughnutFourth: '#ff6b5c',
	
	followersProgress: '#c2d521',
	
	followersFirst: '#b3e5fc',
	followersSecond: '#81d4fa',
	followersThird: '#4fc3f7',
	followersFourth: '#42a5f5',
	
	chartsAreaStroke: '#097fe5',
	chartsAreaFill: '#d6ecff'
};




const Fonts = {
	light: 'Roboto-Light',
	regular: 'Roboto-Regular',
	bold: 'Roboto-Medium',
	logo: 'Righteous-Regular',
};

const FontBaseValue = scale(16);

export const KittenTheme = {
	name: 'light',
	colors: {
		accent: Colors.accent,
		primary: Colors.primary,
		disabled: Colors.disabled,
		twitter: Colors.twitter,
		google: Colors.google,
		facebook: Colors.facebook,
		brand: Colors.accent,
		text: {
			base: Colors.foreground,
			secondary: Colors.secondaryForeground,
			accent: Colors.accent,
			inverse: Colors.inverseForeground,
			hint: Colors.alterForeground,
		},
		input: {
			text: Colors.alterForeground,
			background: Colors.background,
			label: Colors.secondaryForeground,
			placeholder: Colors.secondaryForeground,
		},
		screen: {
			base: Colors.background,
			alter: Colors.alterBackground,
			scroll: Colors.alterBackground,
			bold: Colors.alterBackground,
			overlay: Colors.overlayBackground
		},
		button: {
			back: Colors.background,
			underlay: Colors.neutralBackground,
			highlight: Colors.primary
		},
		border: {
			base: Colors.border,
			accent: Colors.accent,
			secondary: Colors.secondaryForeground
		},
		control: {
			background: Colors.background
		},
		badge: {
			likeBackground: Colors.primary,
			likeForeground: Colors.inverseForeground,
			plusBackground: Colors.success,
			plusForeground: Colors.inverseForeground,
		},
		chat: {
			messageInBackground: Colors.neutralBackground,
			messageOutBackground: Colors.fadedBackground,
			text: Colors.foreground
		},
		gradients: {
			base: [Colors.gradientBaseBegin, Colors.gradientBaseEnd],
			// visa: [Colors.gradientVisaBegin, Colors.gradientVisaEnd],
			// mastercard: [Colors.gradientMasterBegin, Colors.gradientMasterEnd],
			// axp: [Colors.gradientAxpBegin, Colors.gradientAxpEnd],
		},
		dashboard: {
			stars: Colors.starsStat,
			tweets: Colors.tweetsStat,
			likes: Colors.likesStat,
		},
		charts: {
			followersProgress: Colors.followersProgress,
			doughnut: [Colors.doughnutFirst, Colors.doughnutSecond, Colors.doughnutThird, Colors.doughnutFourth],
			followersArea: [Colors.followersFirst, Colors.followersSecond, Colors.followersThird, Colors.followersFourth],
			area: {
				stroke: Colors.chartsAreaStroke,
				fill: Colors.chartsAreaFill
			}
		}
	},
	fonts: {
		sizes: {
			h0: scale(32),
			h1: scale(26),
			h2: scale(24),
			h3: scale(20),
			h4: scale(18),
			h5: scale(16),
			h6: scale(15),
			p1: scale(16),
			p2: scale(15),
			p3: scale(15),
			p4: scale(13),
			s1: scale(15),
			s2: scale(13),
			s3: scale(13),
			s4: scale(12),
			s5: scale(12),
			s6: scale(13),
			s7: scale(10),
			base: FontBaseValue,
			small: FontBaseValue * 0.8,
			medium: FontBaseValue,
			large: FontBaseValue * 1.2,
			xlarge: FontBaseValue / 0.75,
			xxlarge: FontBaseValue * 1.6,
		},
		lineHeights: {
			medium: 18,
			big: 24
		},
		family: {
			regular: Fonts.regular,
			light: Fonts.light,
			bold: Fonts.bold,
			logo: Fonts.logo
		}
	}
};




export function bootstrapRkTheme() {
	
	RkTheme.setTheme(KittenTheme, null);

	RkTheme.setType('RkText', 'basic', {
		fontFamily: theme => theme.fonts.family.bold,
		backgroundColor: 'transparent'
	});
	RkTheme.setType('RkText', 'regular', {
		fontFamily: theme => theme.fonts.family.regular,
	});
	RkTheme.setType('RkText', 'light', {
		fontFamily: theme => theme.fonts.family.light,
	});
	RkTheme.setType('RkText', 'logo', {
		fontFamily: theme => theme.fonts.family.logo,
	});
	RkTheme.setType('RkText', 'moon', {
		fontFamily: 'icomoon',
	});
	RkTheme.setType('RkText', 'awesome', {
		fontFamily: 'fontawesome',
	});
	RkTheme.setType('RkText', 'hero', {
		fontSize: scale(24)
	});
	RkTheme.setType('RkText', 'menuIcon', {
		fontSize: 44
	});
	
	//all font sizes
	for (let key in RkTheme.current.fonts.sizes) {
		RkTheme.setType('RkText', key, {
			fontSize: theme => theme.fonts.sizes[key]
		});
	}
	
	//all text colors
	for (let key in RkTheme.current.colors.text) {
		RkTheme.setType('RkText', `${key}Color`, {
			color: theme => theme.colors.text[key]
		});
	}
	
	//all text line heights
	for (let key in RkTheme.current.fonts.lineHeights) {
		RkTheme.setType('RkText', `${key}Line`, {
			text: {
				lineHeight: theme => theme.fonts.lineHeights[key]
			}
		});
	}
	RkTheme.setType('RkText', 'infoText', {
		fontSize: theme => theme.fonts.sizes.small,
		fontFamily: theme => theme.fonts.family.regular
	});
	
	RkTheme.setType('RkText', 'header1', {
		fontSize: theme => theme.fonts.sizes.h1,
		fontFamily: theme => theme.fonts.family.bold
	});
	RkTheme.setType('RkText', 'header2', {
		fontSize: theme => theme.fonts.sizes.h2,
		fontFamily: theme => theme.fonts.family.bold
	});
	RkTheme.setType('RkText', 'header3', {
		fontSize: theme => theme.fonts.sizes.h3,
		fontFamily: theme => theme.fonts.family.bold
	});
	RkTheme.setType('RkText', 'header4', {
		fontSize: theme => theme.fonts.sizes.h4,
		fontFamily: theme => theme.fonts.family.bold
	});
	RkTheme.setType('RkText', 'header5', {
		fontSize: theme => theme.fonts.sizes.h5,
		fontFamily: theme => theme.fonts.family.bold
	});
	RkTheme.setType('RkText', 'header6', {
		fontSize: theme => theme.fonts.sizes.h6,
		fontFamily: theme => theme.fonts.family.bold
	});
	RkTheme.setType('RkText', 'secondary1', {
		fontSize: theme => theme.fonts.sizes.s1,
		fontFamily: theme => theme.fonts.family.light
	});
	RkTheme.setType('RkText', 'secondary2', {
		fontSize: theme => theme.fonts.sizes.s2,
		fontFamily: theme => theme.fonts.family.light
	});
	RkTheme.setType('RkText', 'secondary3', {
		fontSize: theme => theme.fonts.sizes.s3,
		fontFamily: theme => theme.fonts.family.regular
	});
	RkTheme.setType('RkText', 'secondary4', {
		fontSize: theme => theme.fonts.sizes.s4,
		fontFamily: theme => theme.fonts.family.regular
	});
	RkTheme.setType('RkText', 'secondary5', {
		fontSize: theme => theme.fonts.sizes.s5,
		fontFamily: theme => theme.fonts.family.light
	});
	RkTheme.setType('RkText', 'secondary6', {
		fontSize: theme => theme.fonts.sizes.s6,
		fontFamily: theme => theme.fonts.family.light
	});
	RkTheme.setType('RkText', 'secondary7', {
		fontSize: theme => theme.fonts.sizes.s7,
		fontFamily: theme => theme.fonts.family.regular
	});
	RkTheme.setType('RkText', 'primary1', {
		fontSize: theme => theme.fonts.sizes.p1,
		fontFamily: theme => theme.fonts.family.light
	});
	RkTheme.setType('RkText', 'primary2', {
		fontSize: theme => theme.fonts.sizes.p2,
		fontFamily: theme => theme.fonts.family.regular
	});
	RkTheme.setType('RkText', 'primary3', {
		fontSize: theme => theme.fonts.sizes.p3,
		fontFamily: theme => theme.fonts.family.light
	});
	RkTheme.setType('RkText', 'primary4', {
		fontSize: theme => theme.fonts.sizes.p4,
		fontFamily: theme => theme.fonts.family.regular
	});
	RkTheme.setType('RkText', 'center', {
		text: {
			textAlign: 'center'
		}
	});
	RkTheme.setType('RkText', 'chat', {
		color: theme => theme.colors.chat.text
	});

	RkTheme.setType('RkButton', 'basic', {
		listItemHeaderContent: {
			alignSelf: 'auto',
		}
	});
	RkTheme.setType('RkButton', 'square', {
		borderRadius: 3,
		backgroundColor: theme => theme.colors.button.back,
		listItemHeaderContent: {
			flexDirection: 'column',
			margin: 8
		},
	});
	RkTheme.setType('RkButton', 'tile', {
		borderRadius: 0,
		backgroundColor: 'transparent',
		borderWidth: 0.5,
		borderColor: theme => theme.colors.border.base,
		listItemHeaderContent: {
			flexDirection: 'column'
		}
	});
	RkTheme.setType('RkButton', 'link', {
		color: theme => theme.colors.primary,
	});
	RkTheme.setType('RkButton', 'contrast', {
		color: theme => theme.colors.text.base,
	});
	RkTheme.setType('RkButton', 'icon', {
		height: scale(56),
		width: scale(56),
		borderColor: theme => theme.colors.border.base,
		backgroundColor: theme => theme.colors.control.background,
		borderWidth: 1
	});
	RkTheme.setType('RkButton', 'highlight', {
		backgroundColor: theme => theme.colors.button.highlight
	});
	RkTheme.setType('RkButton', 'social', {
		height: scale(52),
		width: scale(52),
		borderRadius: scale(31),
		borderColor: theme => theme.colors.border.accent,
		borderWidth: 1,
		backgroundColor: theme => theme.colors.control.background
	});

	RkTheme.setType('RkModalImg', 'basic', {
		img: {
			margin: 1.5,
		},
		image: {
			backgroundColor: theme => theme.colors.screen.base
		},
		footer: {
			backgroundColor: theme => theme.colors.screen.base,
			height: 50
		},
		header: {
			backgroundColor: theme => theme.colors.screen.base,
			paddingBottom: 6
		},
	});

	RkTheme.setType('RkTextInput', 'basic', {
		input: {
			fontFamily: theme => theme.fonts.family.bold
		},
		color: theme => theme.colors.text.base,
		backgroundColor: theme => theme.colors.control.background,
		labelColor: theme => theme.colors.input.label,
		placeholderTextColor: theme => theme.colors.input.placeholder,
	});
	RkTheme.setType('RkTextInput', 'rounded', {
		fontSize: theme => theme.fonts.sizes.h6,
		borderWidth: 1,
		underlineWidth: 1,
		placeholderTextColor: theme => theme.colors.input.text,
		input: {
			marginVertical: {
				ios: scaleVertical(15),
				android: scaleVertical(4)
			},
		},
	});
	RkTheme.setType('RkTextInput', 'right', {
		input: {
			textAlign: 'right',
			marginTop: {
				ios: scaleVertical(18),
				android: scaleVertical(11)
			}
		},
		label: {
			fontFamily: theme => theme.fonts.family.light,
		},
		listItemHeaderContent: {
			marginVertical: 4
		},
		backgroundColor: 'transparent',
		labelFontSize: theme => theme.fonts.sizes.small,
	});
	RkTheme.setType('RkTextInput', 'row', {
		input: {
			marginVertical: 0,
			marginHorizontal: 0,
			marginTop: 0,
			paddingTop: {
				ios: 2,
				android: 0
			},
			paddingBottom: 0,
			textAlignVertical: 'center',
			includeFontPadding: false,
			fontFamily: theme => theme.fonts.family.light,
			fontSize: theme => theme.fonts.sizes.small,
		},
		listItemHeaderContent: {
			flex: 1,
			backgroundColor: theme => theme.colors.input.background,
			marginVertical: 0,
			borderRadius: 20,
			paddingHorizontal: 16
		},
		
	});
	RkTheme.setType('RkTextInput', 'iconRight', {
		label: {
			position: 'absolute',
			right: 0
		},
		input: {
			marginRight: scale(46)
		},
	});
	RkTheme.setType('RkTextInput', 'sticker', {
		input: {
			marginHorizontal: 14
		},
		listItemHeaderContent: {
			justifyContent: 'center',
			paddingHorizontal: 0
		},
		label: {
			position: 'absolute',
			right: 0
		}
	});

	RkTheme.setType('RkCard', 'basic', {
		listItemHeaderContent: {
			borderRadius: 3,
			backgroundColor: theme => theme.colors.control.background
		},
		header: {
			justifyContent: 'flex-start',
			paddingVertical: 14
		},
		listItemContent: {
			padding: 16
		},
		footer: {
			paddingBottom: 20,
			paddingTop: 7.5,
			paddingHorizontal: 0
		}
	});
	RkTheme.setType('RkCard', 'backImg', {
		listItemHeaderContent: {
			borderWidth: 0,
			borderRadius: 0
		},
		img: {
			height: 225
		},
		imgOverlay: {
			height: 225,
			backgroundColor: 'rgba(0, 0, 0, 0.4)'
		},
		listItemContent: {
			paddingHorizontal: 14
		},
		footer: {
			paddingTop: 15,
			paddingBottom: 0,
			paddingVertical: 7.5,
			paddingHorizontal: 0
		}
	});
	RkTheme.setType('RkCard', 'imgBlock', {
		img: {
			height: 235
		},
		header: {
			padding: 0,
			paddingVertical: 13,
			paddingHorizontal: 16
		},
		imgOverlay: {
			height: -1,
		},
		footer: {
			paddingTop: 18,
			paddingBottom: 15,
			paddingVertical: 0,
			paddingHorizontal: 0
		}
	});
	RkTheme.setType('RkCard', 'horizontal', {
		listItemHeaderContent: {
			flexDirection: 'row',
			height: 110
		},
		listItemContent: {
			flex: 1,
		},
		img: {
			height: null,
			flex: -1,
			width: 120
		}
	});
	RkTheme.setType('RkCard', 'blog', {
		header: {
			paddingHorizontal: 16,
			paddingVertical: 0,
			paddingTop: 16,
		},
		listItemContent: {
			padding: 0,
			paddingVertical: 0,
			paddingTop: 12
		},
		footer: {
			paddingHorizontal: 16,
			paddingTop: 15,
			paddingBottom: 16,
			alignItems: 'center'
		}
	});
	RkTheme.setType('RkCard', 'article', {
		listItemHeaderContent: {
			borderWidth: 0,
			backgroundColor: 'transparent'
		},
		header: {
			paddingVertical: 0,
			paddingTop: 20,
			paddingBottom: 16,
			justifyContent: 'space-between',
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: theme => theme.colors.border.base
		},
		listItemContent: {
			padding: 16,
			borderBottomWidth: 1,
			borderColor: theme => theme.colors.border.base
		},
		footer: {
			paddingHorizontal: 14,
			paddingTop: 15,
			paddingBottom: 16,
			alignItems: 'center'
		}
	});
	RkTheme.setType('RkCard', 'credit', {
		listItemHeaderContent: {
			borderWidth: 0,
			borderRadius: 7
		},
		header: {
			justifyContent: 'space-between',
			paddingHorizontal: 14,
			alignItems: 'center',
			paddingBottom: scaleVertical(46)
		},
		listItemContent: {
			alignItems: 'center',
			paddingVertical: 0
		},
		footer: {
			paddingBottom: scaleVertical(14),
			paddingTop: scaleVertical(16),
			paddingHorizontal: 14,
			alignItems: 'flex-end'
		}
	});

	RkTheme.registerComponent('Avatar', (theme) => {
		return ({
			_base: {
				listItemHeaderContent: {
					alignItems: 'center',
					flexDirection: 'row',
				},
				image: {
					width: 40,
					height: 40
				},
				badge: {
					width: 15,
					height: 15,
					borderRadius: 7.5,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'absolute',
					bottom: -2,
					right: -2
				},
				badgeText: {
					backgroundColor: 'transparent',
					fontSize: 9,
				}
			},
			big: {
				image: {
					width: 90,
					height: 90,
					borderRadius: 55,
					marginBottom: 19
				},
				listItemHeaderContent: {
					flexDirection: 'column'
				}
			},
			large: {
				image: {
					width: 130,
					height: 130,
					borderRadius: 83,
				},
				listItemHeaderContent: {
					flexDirection: 'column'
				},
				badge: {
					width: 15,
					height: 15,
					borderRadius: 7.5,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'absolute',
					bottom: 0,
					right: 0
				},
			},
			huge: {
				image: {
					width: 180,
					height: 180,
					borderRadius: 110,
					marginBottom: 19
				},
				listItemHeaderContent: {
					flexDirection: 'column'
				}
			},
			small: {
				image: {
					width: 32,
					height: 32,
					borderRadius: 16
				}
			},
			circle: {
				image: {
					borderRadius: 20
				},
			}
		});
	});

	RkTheme.registerComponent('LoadingButton', (theme) => {
		return ({
			_base: {
				button: {
					alignItems: 'stretch',
					paddingVertical: 0,
					paddingHorizontal: 0,
					height: 40,
					borderRadius: 20,
				},
				text: {
					backgroundColor: 'transparent',
					color: theme.colors.text.inverse
				}
			},
			large: {
				button: {
					alignSelf: 'stretch',
					height: 48,
					borderRadius: 24,
				},
			},
			statItem: {
				button: {
					flex: 1,
					borderRadius: 5,
					marginHorizontal: 10,
					height: null,
					alignSelf: 'auto',
				},
			}
		});
	});
	
	StatusBar.setBarStyle('dark-content', true);
}