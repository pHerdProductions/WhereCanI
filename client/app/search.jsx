// The Search page, comes after Login / Signup page
import React, { useState, useRef } from 'react';
import { ThemeProvider, createTheme, Button, Text, Icon } from '@rneui/themed';
import { View, ScrollView, Keyboard, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { USStates } from '../data/states';
import * as Search from '../components/search-inputs';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API, DB_URL } from '@env';
import axios from 'axios';
console.log(DB_URL);

Geocoder.init(GOOGLE_API);

//having an issues initializing on my iphone, so i added this useeffect to initialize it on pageload
// useEffect(() => {
// 	Geocoder.init(GOOGLE_API);
// }, []);

const states = USStates;

// Generate an address for use in the Geocoder
const generateAddress = (stateName, cityName, zipcode) => {
	let address = '';
	if (cityName != '') {
		address += cityName;
	}
	if (stateName != '') {
		address += (address != '' ? ', ' : '') + stateName;
	}
	if (zipcode != '') {
		address += (address != '' ? ', ' : '') + zipcode;
	}
	return address;
};

export default SearchPage = ({ navigation, route }) => {
	const { email, username, state, display, id } = route.params;

	const [dropFocus, setDropFocus] = useState(false); // Is the dropdnown in focus or not
	const [stateName, setStateName] = useState(state);
	const [cityName, setCityName] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [hashtags, setHashtags] = useState('');

	const [isSearching, setIsSearching] = useState(false);

	const [displaysetting, setDisplaysetting] = useState('none'); //display user info
	let buttonDisplayName = display.charAt(0) + username.charAt(0);

	let stateInput = useRef(null);
	let cityInput = useRef(null);
	let zipcodeInput = useRef(null);
	let hashtagsInput = useRef(null);

	/* Handle Geocoder from an address to load the map from the input location and 
     navigate to map page with all POIs from the DB */
	const browseAddress = (POIs) => {
		let address = generateAddress(stateName, cityName, zipcode);
		console.log('Address: ' + address);
		Geocoder.from(address)
			.then((json) => {
				let locData = json.results[0];
				let LatLng = locData.geometry.location;
				let Bounds = locData.geometry.bounds;
				let delta = Bounds.northeast.lat - Bounds.southwest.lat;
				navigation.navigate('map', { lat: LatLng.lat, lng: LatLng.lng, latDelta: delta, POIs: POIs, user:route.params });
			})
			.finally(() => {
				setIsSearching(false);
			})
			.catch((error) => console.warn(error));
	};

	// Browse All POIs from the DB
	const browseAllPOIs = () => {
		Keyboard.dismiss();
		setIsSearching(true);
		axios
			// .get(`${DB_URL}/poi`)
			.get(`https://wherecanibackend.onrender.com/poi`)

			.then(function (response) {
				console.log('POIs:');
				console.log(response.data.data);

				browseAddress(response.data.data);
			})
			.catch(function (error) {
				setIsSearching(false);
				console.warn(error);
			});
	};

	/* Search POIs based on parameters. Right now must have all input fields entered, working on making it dynamic
     so the only field that is required is the State */
	const searchPOIs = () => {
		Keyboard.dismiss();
		if (hashtags == '') {
			hashtagsInput.shake();
		} else {
			setIsSearching(true);
			let hashtagsArr = hashtags.replaceAll('#', '').split(' ');
			let search = { state: stateName, city: cityName, zipcode: zipcode, hashtags: hashtagsArr };
			axios
				// .get(`${DB_URL}/poi/search`, { params: search })
				.get(`https://wherecanibackend.onrender.com/poi/search`, { params: search })
				.then(function (response) {
					let foundPOIs = response.data.data;
					console.log('POIs:');
					console.log(foundPOIs);
					if (foundPOIs.length == 0) {
						Alert.alert('No POIs found.', 'Try another area or other hashtags.', [
							{
								text: 'Ok',
							},
						]);
						setIsSearching(false);
					} else {
						browseAddress(foundPOIs);
					}
				})
				.catch(function (error) {
					setIsSearching(false);
					console.warn(error);
				});
		}
	};

	const ratingProps = {};
	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor: '#17001F' }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={100}
				style={{ flex: 1 }}
				enabled
			>
				<ScrollView>
					<ThemeProvider theme={theme}>
						<View style={{ width: '100%', height: '100%', backgroundColor: '#17001F' }}>
							<Button
								title='Profile'
								type='outline'
								raised
								titleStyle={{ fontSize: 20 }}
								containerStyle={{ marginTop: '5%', marginLeft: '70%', marginRight: '5%' }}
								onPress={() => {
									navigation.navigate('profile', { email, username, state, display, id });
								}}
							/>
							<Text h1>Where Can I...</Text>
							<Search.StateDropDown
								ref={(input) => (stateInput = input)}
								disabled={isSearching}
								style={(dropFocus || stateName != '') && { borderColor: '#FFFFFF' }}
								data={states}
								placeholder={!dropFocus ? 'Your State...' : '...'}
								value={stateName}
								onFocus={() => setDropFocus(true)}
								onBlur={() => setDropFocus(false)}
								onChange={(item) => {
									setStateName(item.value);
									setDropFocus(false);
								}}
								onSubmitEditing={() => cityInput.focus()}
							/>
							<Search.CityInput
								ref={(input) => (cityInput = input)}
								disabled={isSearching}
								value={cityName}
								onChangeText={(text) => setCityName(text)}
								onSubmitEditing={() => zipcodeInput.focus()}
							/>
							<Search.ZipInput
								ref={(input) => (zipcodeInput = input)}
								disabled={isSearching}
								value={zipcode}
								onChangeText={(text) => setZipcode(text)}
							/>
							<Button
								title='Browse Area'
								type='outline'
								raised
								containerStyle={{ marginHorizontal: 50, marginVertical: 25 }}
								onPress={() => browseAllPOIs()}
								loading={isSearching}
								loadingProps={{ color: '#FFFFFF', size: 31.5 }}
								disabled={isSearching}
							/>
							<Search.HashtagsInput
								ref={(input) => (hashtagsInput = input)}
								disabled={isSearching}
								value={hashtags}
								onChangeText={(text) => setHashtags(text)}
							/>
							<Button
								title='Search By Hashtags'
								type='outline'
								raised
								containerStyle={{ marginHorizontal: 50, marginVertical: 25 }}
								onPress={() => searchPOIs()}
								loading={isSearching}
								loadingProps={{ color: '#FFFFFF', size: 31.5 }}
								disabled={isSearching}
							/>
						</View>
					</ThemeProvider>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaProvider>
	);
};

// Create seperate file for our theme?
const theme = createTheme({
	lightColors: {
		primary: '#3d5afe',
	},
	darkColors: {
		primary: '#3d5afe',
	},
	mode: 'dark',
	backgroundColor: '#17001F',
	components: {
		Text: {
			h1Style: {
				fontSize: 50,
				textAlign: 'center',
				paddingTop: 50,
				color: '#FFFFFF',
			},
			h4Style: {
				fontSize: 20,
				textAlign: 'center',
				paddingTop: 5,
				color: '#FF0000',
			},
		},
		Button: {
			buttonStyle: {
				backgroundColor: '#8F00FF',
				borderColor: '#D49DFF',
				borderWidth: 1.5,
			},
			titleStyle: {
				color: '#FFFFFF',
				fontSize: 25,
				fontWeight: 'bold',
			},
		},
		ButtonGroup: {
			containerStyle: {
				height: 50,
				borderWidth: 1,
			},
			buttonStyle: {
				backgroundColor: '#D49DFF',
				borderTopWidth: 0,
				borderLeftWidth: 0,
				borderBottomWidth: 3,
				borderRightWidth: 3,
				borderColor: '#363636',
			},
			selectedButtonStyle: {
				backgroundColor: '#8F00FF',
				borderTopWidth: 3,
				borderLeftWidth: 3,
				borderBottomWidth: 0,
				borderRightWidth: 0,
				borderColor: '#363636',
			},
			textStyle: {
				color: '#000000',
				fontSize: 25,
				fontWeight: 'bold',
			},
			selectedTextStyle: {
				color: '#FFFFFF',
			},
		},
	},
});
