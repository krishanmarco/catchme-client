/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Camera, {constants as CameraConstants} from 'react-native-camera';
import Logger from "../../../lib/Logger";
import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RkButton} from 'react-native-ui-kitten';
// todo refactor proptypes

export default class CameraWrapper extends React.Component {

	constructor(props, context) {
		super(props, context);
		this._onCaptureImage = this._onCaptureImage.bind(this);
		this._onBarCodeRead = this._onBarCodeRead.bind(this);
	}


	_onBarCodeRead(data) {

		if (this.props.onBarCodeRead)
			this.props.onBarCodeRead(data.data);

	}


	_onCaptureImage() {
		this.camera.capture({metadata: {}})
			.then(data => {
				const {onCaptureImage} = this.props;

				if (onCaptureImage)
					onCaptureImage(data);

				return data;
			}).catch(err => {
			Logger.v(err);
		});
	}


	render() {
		return (
			<View style={styles.container}>
				<Camera
					ref={camera => this.camera = camera}
					style={styles.preview}

					aspect={CameraConstants.Aspect.fill}
					audio={true}

					captureMode={this.props.captureMode}
					captureTarget={CameraConstants.CaptureTarget.temp}
					captureQuality={CameraConstants.CaptureQuality.high}

					onBarCodeRead={this._onBarCodeRead}
					barCodeTypes={["qr"]}

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


CameraWrapper.defaultProps = {
	captureMode: CameraConstants.CaptureMode.still,  // || .video,
	onBarCodeRead: null
};

CameraWrapper.propTypes = {
	captureMode: PropTypes.number,
	onBarCodeRead: PropTypes.func,
	onCaptureImage: PropTypes.func,
};


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