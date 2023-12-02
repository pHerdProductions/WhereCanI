import React from 'react';
import { Text, View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { Rating, RatingProps } from '@rneui/themed';

const generatePOICoordinate = (POI) => {
	const coordinate = {
		latitude: parseFloat(POI.latitude),
		longitude: parseFloat(POI.longitude),
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};
	return coordinate;
};

const CustomMarker = React.forwardRef((props, ref) => {
	const POI = props.POI;
	const ratingCompleted = (rating) => {
		console.log('Rating is: ' + rating);
	};

	return (
		<Marker
			coordinate={generatePOICoordinate(POI)}
			image={require('./../app/images/WCImark84.png')}
			ref={ref}
		>
			<Callout>
				<View style={{ flex: 1 }}>
					<Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 15, textAlign: 'center', flex: 1 }}>{POI.title}</Text>
					<Text style={{ color: '#50006D', fontWeight: 'normal', fontSize: 12, textAlign: 'center', flex: 1 }}>{POI.description}</Text>
					<Text style={{ color: '#0000C2', fontWeight: 'normal', fontSize: 11, textAlign: 'center', flex: 1 }}>{'#' + POI.hashtags.join(' #')}</Text>
					<Rating
						style={{ color: '#0000C2', fontWeight: 'normal', fontSize: 11, textAlign: 'center', flex: 1, paddingVertical: 10 }}
						showRating
						type='star'
						fractions={1}
						startingValue={3.6}
						readonly
						imageSize={5}
						onFinishRating={ratingCompleted}
					/>
				</View>
			</Callout>
		</Marker>
	);
});

export { CustomMarker };
