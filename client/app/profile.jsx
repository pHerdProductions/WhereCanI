// The Profile page, viewing (possibly editing) user info
import React, { useState, useRef } from 'react';
import { ThemeProvider, createTheme, Button, Text, Icon } from '@rneui/themed';
import { View, ScrollView, Keyboard, Alert, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { USStates } from '../data/states';
import * as SignupLogin from '../components/signup-login-inputs';
//import axios from 'axios';

const states = USStates;

export default ProfilePage = ({ navigation, route }) => {
	// Thinking about enabling editing user information
	const [userId, setUserId] = useState(route.params.id);
	const [email, setEmail] = useState(route.params.email);
	const [username, setUsername] = useState(route.params.username);
	//const [password, setPassword] = useState('');
	//const [confirm, setConfirm] = useState('');
	const [displayName, setDisplayName] = useState(route.params.display);

	const [stateName, setStateName] = useState(route.params.state); // Hold and set the State name for the dropdown
	const [dropFocus, setDropFocus] = useState(false); // Is the dropdnown in focus or not

	//const [isLoading, setIsLoading] = useState(false);

	// References for our inputs
	let emailInput = useRef(null);
	let usernameInput = useRef(null);
	//let passwordInput = useRef(null);
	//let confirmInput = useRef(null);
	//let displayInput = useRef(null);*/
	let stateInput = useRef(null);
	const [editState, setEditState] = useState(false);

	const handleLogout = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'login' }],
		});
	};

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
							<Text h2>Display Name</Text>
							<Text h1>{displayName}</Text>
							<Text h3>Personal Info</Text>
							<SignupLogin.StateDropDown
								ref={(input) => (stateInput = input)}
								disable={!editState}
								placeholderStyle={editState ? { color: '#FFFFFF' } : { color: '#86939E' }}
								selectedTextStyle={editState ? { color: '#FFFFFF' } : { color: '#86939E' }}
								style={editState ? { borderColor: '#FFFFFF' } : { borderColor: '#86939E' }}
								data={states}
								placeholder={!dropFocus ? 'Your State...' : '...'}
								value={stateName}
								onFocus={() => setDropFocus(true)}
								onBlur={() => setDropFocus(false)}
								onChange={(item) => {
									setStateName(item.value);
									setDropFocus(false);
								}}
							/>
							<SignupLogin.UsernameInput
								ref={(input) => (usernameInput = input)}
								disabled={!editState}
								value={username}
								onChangeText={(text) => setUsername(text)}
							/>
							<SignupLogin.EmailInput
								ref={(input) => (emailInput = input)}
								disabled={!editState}
								value={email}
								onChangeText={(text) => setEmail(text)}
							/>
							<Button
								title='Logout'
								type='outline'
								raised
								containerStyle={{ marginHorizontal: 100, marginTop: 20 }}
								onPress={() => handleLogout()}
							/>
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
