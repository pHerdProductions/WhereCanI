import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_DB_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

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
	const navigation = useNavigation();

	const openPOIPage = (POI) => {
		axios
			.get(`${REACT_APP_DB_URL}/post`, { params: { id: POI.id } })
			.then(function (response) {
				console.log('Posts: ');
				console.log(response.data.data);
				navigation.navigate('poi', { POI: POI, POIComments: response.data.data });
			})
			.catch(function (error) {
				console.warn(error);
			});
	};

	return (
		<Marker
			coordinate={generatePOICoordinate(POI)}
			image={require('./../app/images/WCImark84.png')}
			ref={ref}
		>
			<Callout onPress={() => openPOIPage(POI)}>
				<View style={{ flex: 1 }}>
					<Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 15, textAlign: 'center', flex: 1 }}>{POI.title}</Text>
					<View style={{ flexDirection: 'row', width: 130 }}>
						<Text style={{ color: '#50006D', fontWeight: 'normal', fontSize: 12, textAlign: 'center', flex: 1, flexShrink: 1 }}>{POI.description}</Text>
					</View>

					<Text style={{ color: '#0000C2', fontWeight: 'normal', fontSize: 11, textAlign: 'center', flex: 1 }}>{'#' + POI.hashtags.join(' #')}</Text>
					<AirbnbRating
						count={5}
						readonly
						reviews={['Terrible', 'Meh', 'OK', 'Good', 'Great']}
						defaultRating={poi.rating}
						size={20}
					/>
				</View>
			</Callout>
		</Marker>
	);
});

export { CustomMarker };
