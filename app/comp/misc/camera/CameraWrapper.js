/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Camera, {constants as CameraConstants} from 'react-native-camera';
import Logger from "../../../lib/Logger";
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RkButton} from 'react-native-ui-kitten';

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	captureMode: number,
	onBarCodeRead: Function,
	onCaptureImage: Function
};

const defaultProps = {
	captureMode: CameraConstants.CaptureMode.still,
	onBarCodeRead: null
};

const captureOptions = {
	metadata: {}
};


// CameraWrapper ****************************************************************************************
// CameraWrapper ****************************************************************************************

export default class CameraWrapper extends React.Component<any, Props, any> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._onCaptureImage = this._onCaptureImage.bind(this);
		this._onBarCodeRead = this._onBarCodeRead.bind(this);
	}

	_onBarCodeRead(data) {
		const {onBarCodeRead} = this.props;

		if (onBarCodeRead)
			onBarCodeRead(data.data);
	}

	_onCaptureImage() {
		return this.refCamera.capture(captureOptions)
			.then(data => {
				const {onCaptureImage} = this.props;

				if (onCaptureImage)
					onCaptureImage(data);

				return data;
			})
			.catch(error => {
				Logger.v("CameraWrapper _onCaptureImage", error);
			});
	}


	render() {
		const {captureMode} = this.props;
		return (
			<View style={styles.container}>
				<Camera
					ref={camera => this.refCamera = camera}
					style={styles.preview}
					captureMode={captureMode}
					aspect={CameraConstants.Aspect.fill}
					captureTarget={CameraConstants.CaptureTarget.temp}
					captureQuality={CameraConstants.CaptureQuality.high}
					onBarCodeRead={this._onBarCodeRead}
					barCodeTypes={["qr"]}
					audio={true}
					keepAwake={true}>
					<RkButton
						style={styles.cameraButtonButton}
						rkType='clear contrast'
						onPress={this._onCaptureImage}>
						<Image
							style={styles.cameraButtonImage}
							resizeMode='contain'
							source={require('../../../assets/images/camera_512.png')}/>
					</RkButton>
				</Camera>
			</View>
		);
	}
}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	},
	cameraButtonButton: {
		width: 64,
		height: 64,
		marginBottom: 32
	},
	cameraButtonImage: {
		flex: 1,
		width: 64,
		height: 64
	}
});
