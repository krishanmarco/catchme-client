/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Colors, Icons} from '../../Config';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {RkButton, RkModalImg} from 'react-native-ui-kitten';
import type {TImageURISourceAuth} from "../../lib/data/ImageURISourceAuth";
import type {TStyle} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	ListEmptyComponent: Node,
	imageSources: TImageURISourceAuth
};

type State = {
	imageSize: number,
	imageSizeStyle: TStyle,
	itemsToRender: TImageURISourceAuth
};

const DefaultProps = {
	imageSources: []
};

// Gallery **********************************************************************************************
// Gallery **********************************************************************************************

export default class Gallery extends React.Component<void, Props, State> {
	static defaultProps = DefaultProps;
	
	constructor(props, context) {
		super(props, context);
		this._renderImage = this._renderImage.bind(this);

		const imageSize = (Dimensions.get('window').width - 12) / 4;
		this.state = {
			imageSize: (Dimensions.get('window').width - 12) / 4,
			imageSizeStyle: {width: imageSize, height: imageSize},
		};
	}

	render() {
		const {ListEmptyComponent, imageSources} = this.props;
		return (
			<View style={styles.images}>
				<FlatList
					data={imageSources}
					keyExtractor={(item) => item.uri}

					renderItem={this._renderImage}
					initialNumToRender={12}

					horizontal={false}
					numColumns={4}

					ListEmptyComponent={ListEmptyComponent}
				/>
			</View>
		);
	}

	_renderImage({item, index}) {
		const {imageSizeStyle} = this.state;
		const {imageSources} = this.props;
		return (
			<RkModalImg
				style={imageSizeStyle}
				source={imageSources}
				index={index}
				renderHeader={(options) => (
					<View style={styles.header}>
						<RkButton rkType='clear contrast' onPress={options.closeImage}>
							<Icon {...Icons.back} size={35} color={Colors.black}/>
						</RkButton>
					</View>
				)}/>
		);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	images: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
});
