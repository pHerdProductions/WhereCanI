// The POI page, viewing POI info, comments, and ratings
import React, { useState, useRef } from 'react';
import { ThemeProvider, createTheme, Button, Text, Icon, Input } from '@rneui/themed';
import { View, ScrollView, Keyboard, Alert, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AirbnbRating } from 'react-native-ratings';
import { REACT_APP_DB_URL } from '@env';

import axios from 'axios';

export default PoiPage = ({ navigation, route }) => {
	// Passed in POI
	const { POI, POIComments } = route.params;

	//useStates
	const [comments, setComments] = useState(POIComments);

	// References for our inputs
	let commentInput = useRef(null);

	const handleComment = () => {
		// handle axois here
	};

	const [poi, onChangePOI] = React.useState(POI);

	//handle submitting rating
	const submitRating = () => {
		let newnumber = (poi.rating + Number(number)) / 2;

		onChangePOI({ rating: newnumber });
		let updateData = { id: POI.id, rating: newnumber };
		console.log(updateData);

		axios
			.put(`${REACT_APP_DB_URL}/poi`, updateData)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const [number, onChangeNumber] = React.useState('');

	return (
		<ThemeProvider theme={theme}>
			<SafeAreaProvider style={{ flex: 1, backgroundColor: '#17001F' }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={100}
					style={{ flex: 1 }}
				>
					<ScrollView>
						<View style={{ width: '100%', height: '100%', backgroundColor: '#17001F' }}>
							<Button
								title='Back'
								type='outline'
								raised
								titleStyle={{ fontSize: 15 }}
								containerStyle={{ marginTop: '5%', marginLeft: '5%', marginRight: '75%' }}
								onPress={() => navigation.goBack()}
							/>
							<Text h1>{POI?.title ?? 'Title'}</Text>
							<AirbnbRating
								count={5}
								readonly
								reviews={['Terrible', 'Meh', 'OK', 'Good', 'Great']}
								defaultRating={poi.rating}
								size={20}
							/>
							<Text h3>{POI.description ?? 'Description'}</Text>
							<Text h3>{'#' + POI?.hashtags.join(' #')}</Text>
							<Text h3>{POI.city ?? 'State'}</Text>
							<Text h3>{POI.state ?? 'City'}</Text>
							<Text h3>{POI.zip ?? 'Zip'}</Text>

							<View>
								<Input
									style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, borderWidth: 0, color: '#86939e' }}
									onChangeText={onChangeNumber}
									value={number}
									// placeholderTextColor='#86939e'
									placeholder='Rating between 1-5'
									keyboardType='numeric'
								/>
								<Button
									title='Save'
									onPress={() => submitRating()}
								/>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaProvider>
		</ThemeProvider>
	);
};

// Ok still want to create seperate files for theme / styles
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
				color: '#FFFFFF',
			},
			h2Style: {
				fontSize: 25,
				textAlign: 'center',
				color: '#86939E',
				paddingTop: '5%',
				paddingBottom: '1%',
			},
			h3Style: {
				fontSize: 25,
				textAlign: 'center',
				color: '#86939E',
				paddingTop: '5%',
				paddingBottom: '5%',
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
			disabledStyle: {
				backgroundColor: '#9D62CC',
			},
			disabledSelectedStyle: {
				backgroundColor: '#440079',
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
