import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Modal, Pressable, TextInput } from 'react-native';
import { Button, Input } from '@rneui/themed';
import MapView, { Callout, Marker } from 'react-native-maps';
import { CustomMarker } from '../components/custom-marker';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import { GOOGLE_API } from '@env';

Geocoder.init(GOOGLE_API);

export default MapPage = ({ route, navigation }) => {
	const deviceWidth = Dimensions.get('screen').width;
	const deviceHeight = Dimensions.get('screen').height;
	const deviceRatio = deviceWidth / deviceHeight; // Device screen's aspect ratio

	const [marker, setMarker] = useState([]);
	const [counter, setCounter] = useState(0);
	const [address, setAddress] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	// Received parameters from the search page
	const { lat, lng, latDelta, POIs } = route.params;

	// The region the MapView is showing
	const [region, setRegion] = useState({
		latitude: lat,
		longitude: lng,
		latitudeDelta: latDelta,
		longitudeDelta: latDelta * deviceRatio,
	});

	// An array of all the POIs the map will show as Markers
	const [POIS, setPOIS] = useState(POIs);

	// A bunch of useStates for creating a POI functionality
	const [newTitle, setNewTitle] = useState('');
	const [newDesc, setNewDesc] = useState('');
	const [newHashtags, setNewHashtags] = useState('');
	const [newLat, setNewLat] = useState('');
	const [newLng, setNewLng] = useState('');
	const [newState, setNewState] = useState('');
	const [newCity, setNewCity] = useState('');
	const [newZip, setNewZip] = useState('');
	const [correctLoc, setCorrectLoc] = useState(false);
	const [newPOI, setNewPOI] = useState(null);

	// To reference the new Marker that is placed after clicking 'continue' in the Modal
	// Need this so we can have the Callout box be shown automatically the new Marker is placed in the useEffect()
	let newMarkerRef = useRef(null);

	// Parse Geocoder's returned information for City, State, Zipcode
	// If they exist, we can set the new information useStates.
	// Set the correctLoc useState to true or false, and open up the Modal
	const getStateCityZip = (addressComps) => {
		let city = '';
		let state = '';
		let zipcode = '';
		addressComps.forEach((comp) => {
			switch (comp.types[0]) {
				case 'locality':
					city = comp.long_name;
					console.log('City: ' + comp.long_name);
					break;
				case 'administrative_area_level_1':
					state = comp.long_name;
					console.log('State: ' + comp.long_name);
					break;
				case 'postal_code':
					zipcode = comp.long_name;
					console.log('Zipcode: ' + comp.short_name);
			}
		});
		if (city && state && zipcode) {
			setNewCity(city);
			setNewState(state);
			setNewZip(zipcode);
			setCorrectLoc(true);
		} else {
			setCorrectLoc(false);
		}
		setModalVisible(true);
	};

	// When the user longpresses on the MapView, currently the beginning part of creating a new POI
	function onLongPress(e) {
		let coordinate = {
			latitude: e.nativeEvent.coordinate.latitude,
			longitude: e.nativeEvent.coordinate.longitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};

		setNewLat(e.nativeEvent.coordinate.latitude);
		setNewLng(e.nativeEvent.coordinate.longitude);

		Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude).then((json) => {
			try {
				const addressResult = json.results[0].address_components;
				getStateCityZip(addressResult);
				//setAddress(addressComponent);
				console.log(addressResult);
				//addressResult.forEach(getStateCityZip);
				//setNewCity(addressResult.address_components[2].long_name);
				//setNewState(json.results[0].address_components[4].long_name);
				//setNewZip(json.results[0].address_components[6].long_name);
			} catch (error) {
				console.log(json.results[0].address_components);
				console.warn(error);
			}
		});

		{
			/*
			setMarker([
			...marker,
			<Marker
				draggable={true}
				key={counter}
				anchor={{ point: (0, 3) }}
				coordinate={coordinate}
				image={require('./images/WCImark84.png')}
				title={'Point Of Interest'}
				description={address}
				onPress={(e) => {
					onPoiPress(e);
				}}
			></Marker>,
		]);
	setCounter((counter) => counter + 1);
		*/
		}
	}

	// When the 'continue' button is clicked, we set the newPOI useState and close the Modal
	const saveModal = () => {
		const POI = {
			latitude: newLat,
			longitude: newLng,
			state: newState,
			city: newCity,
			zipcode: parseInt(newZip),
			title: newTitle,
			description: newDesc,
			hashtags: newHashtags.split(' '),
		};
		setNewPOI(POI);
		setModalVisible(false);
	};

	{
		/*function onPoiPress(e) {
		setModalVisible(true);
	}*/
	}

	// Function to be called when clicking on the Callout box of the new Marker when creating a POI
	function sendPOI() {
		{
			/*
			const POI = {
			latitude: newLat,
			longitude: newLng,
			state: newState,
			city: newCity,
			zipcode: parseInt(newZip),
			title: newTitle,
			description: newDesc,
			hashtags: newHashtags,
		};
		*/
		}

		axios
			.post('https://wherecanibackend-zpqo.onrender.com/poi', newPOI)
			.then(function (response) {
				setPOIS(POIS.append(newPOI));
				console.log(response);
			})
			.catch(function (error) {
				console.warn(error);
			});
		setModalVisible(!modalVisible);
	}

	// Generate a proper coordinate from POI data for use in a <Marker/>
	// *** Can probably remove this, it's now in the custom-marker component
	const generatePOICoordinate = (POI) => {
		const coordinate = {
			latitude: parseFloat(POI.latitude),
			longitude: parseFloat(POI.longitude),
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};
		return coordinate;
	};

	useEffect(() => {
		newMarkerRef.current?.showCallout(); // When the new Marker is placed, we want to have the callout box be shown
	}, [newMarkerRef, newPOI]);

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.container}>
				{/*Render our MapView*/}
				<MapView
					style={styles.map}
					initialRegion={region} // Specify our initial coordinates/region
					// When the user stops scrolling/panning, set the region:
					onRegionChangeComplete={(region) => setRegion(region)}
					onLongPress={(e) => {
						onLongPress(e);
					}}
				>
					{/* Map the array of POIs to a bunch of CustomMarkers to display on the map */}
					{POIS.map((POI, index) => (
						<CustomMarker
							POI={POI}
							key={index}
						/>
					))}
					{/* Here we check if there is a *temporary* newPOI that has been created. If so, we can show a Marker for it */}
					{newPOI ? (
						<CustomMarker
							POI={newPOI}
							key={POIS.length + 1}
							ref={newMarkerRef}
						/>
					) : (
						<></>
					)}
				</MapView>

				<View style={{ position: 'relative' }}>
					<Modal
						style={{ position: 'absolute', top: 0, bottom: 0, backgroundColor: '#17001F' }}
						animationType='slide'
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
							setModalVisible(!modalVisible);
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								{/* Conditional for checking if the user longpressed on a valid location to set a POI to,
								and changing the Modal's content based on that */}
								{correctLoc ? (
									<>
										<Text style={styles.modalText}>Enter POI Info</Text>
										<Input
											style={styles.input}
											onChangeText={setNewTitle}
											placeholder='Title'
											value={newTitle}
										/>
										<Input
											style={styles.input}
											multiline={true}
											onChangeText={setNewDesc}
											placeholder='Description'
											value={newDesc}
										/>
										<Input
											style={styles.input}
											multiline={true}
											onChangeText={setNewHashtags}
											placeholder='#hash #tags'
											value={newHashtags}
										/>
										<Pressable
											style={[styles.button, styles.buttonOpen]}
											onPress={() => saveModal()}
										>
											<Text style={styles.textStyle}>Continue</Text>
										</Pressable>
										<Pressable
											style={[styles.button, styles.buttonClose]}
											onPress={() => setModalVisible(!modalVisible)}
										>
											<Text style={styles.textStyle}>Cancel</Text>
										</Pressable>
									</>
								) : (
									<>
										<Text style={styles.modalText}>Cannot Place POI Here</Text>
										<Pressable
											style={[styles.button, styles.buttonClose]}
											onPress={() => setModalVisible(!modalVisible)}
										>
											<Text style={styles.textStyle}>OK</Text>
										</Pressable>
									</>
								)}
							</View>
						</View>
					</Modal>
				</View>

				<Image
					source={require('./images/WCIlogo.png')}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: 80,
						height: 40,
					}}
				/>

				<StatusBar style='auto' />
			</View>
		</SafeAreaView>
	);
};

// ___ STYLES ___ Create a seperate file for the style to clean up code?
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1, //the container will fill the whole screen.
		marginTop: 10,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 'calc(100vh - navbarHeight)',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	text: {
		fontSize: 20,
		color: 'white',
		backgroundColor: 'purple',
	},
	markerText: {
		backgroundColor: 'black',
		marginTop: 30,
		fontSize: 12,
		color: 'white',
	},
	nav: {
		margin: 0,
		flex: 1,
		width: '100%',
		height: '20px',
	},
	safeAreaView: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 10,
		flexDirection: 'column',
	},
	button: {
		textAlign: 'center',
		backgroundColor: 'black',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		borderRadius: '20px',
		width: 100,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		//marginVertical: 20,
		backgroundColor: '#410074',
		borderRadius: 10,
		paddingVertical: 20,
		alignItems: 'center',
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,
		width: '80%',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
		marginBottom: 20,
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	input: {
		height: 18,
		marginBottom: 10,
		borderWidth: 1,
		padding: 5,
		borderColor: '#FFFFFF',
		color: '#FFFFFF',
		fontSize: 15,
	},
});
