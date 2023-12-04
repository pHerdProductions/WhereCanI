import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { Rating } from '@rneui/themed';
import { AirbnbRating } from 'react-native-ratings';

import axios from 'axios';

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
	const [poi, onChangePOI] = React.useState(POI);
	const [index, onChangeindex] = React.useState(0);

	//handle submitting rating
	const submitRating = () => {
		onChangeindex(1);
		let newnumber = (poi.rating + Number(number)) / 2;

		onChangePOI({ rating: newnumber });
		let updateData = { id: POI.id, rating: newnumber };
		console.log(updateData);

		axios
			// .post(`${DB_URL}/user`, signup)
			.put(`https://wherecanibackend.onrender.com/poi`, updateData)

			.then(function (response) {
				// navigation.replace('search', response.data.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
				singupErrorAlert();
			});
	};
	const [number, onChangeNumber] = React.useState('');

	function ratingCompleted(rating) {
		console.log('Rating is: ' + rating);
	}

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
					{/* <Text style={{ color: '#ffbf00', fontWeight: 'normal', fontSize: 12, textAlign: 'center', flex: 1 }}>{poi.rating + '/5'}</Text> */}
					<AirbnbRating
						count={5}
						readonly
						reviews={['Terrible', 'Meh', 'OK', 'Good', 'Great']}
						defaultRating={poi.rating}
						size={20}
					/>
					{/* 					
					{index == 0 ? (
						<View>
							<TextInput
								style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
								onChangeText={onChangeNumber}
								value={number}
								placeholder='Rating between 1-5'
								keyboardType='numeric'
							/>
							<Button
								title='Save'
								onPress={() => submitRating()}
							/>
						</View>
					) : (
						''
					)} */}
				</View>
			</Callout>
		</Marker>
	);
});

export { CustomMarker };
