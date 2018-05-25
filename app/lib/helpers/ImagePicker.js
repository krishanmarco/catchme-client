/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ImagePicker from 'react-native-image-picker';
import Logger from '../Logger';

const imagePickerOptions = {
	// noData: true,
	// storageOptions: {
	// 	cameraRoll: true,
	// 	waitUntilSaved: true,
	// }
};

class _ImagePicker {

	pickImage() {
		return new Promise((resolve, reject) => {
			ImagePicker.showImagePicker(imagePickerOptions, (response) => {
				if (response.didCancel || response.error) {
					Logger.v('ImagePicker pickImage:', response);
					reject();
					return;
				}

				if (response.customButton) {
					this._handleCustomButtonPress().then(resolve);
					return;
				}

				resolve(response);
			});
		});
	}


	_handleCustomButtonPress() {
		// no custom buttons for now
	}

}

const imagePicker = new _ImagePicker();
export default imagePicker;