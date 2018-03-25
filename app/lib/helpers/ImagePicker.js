/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ImagePicker from 'react-native-image-picker';

class _ImagePicker {


	pickImage() {
		return new Promise((resolve, reject) => {
			ImagePicker.showImagePicker(null, (response) => {
				if (response.didCancel || response.error) {
					reject();
					return;
				}

				if (response.customButton) {
					this._handleCustomButtonPress()
						.then(resolve);
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