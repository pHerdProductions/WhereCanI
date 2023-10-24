// The initial start page: Signup & Login

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme, Button, ButtonGroup, Text } from '@rneui/themed';
import { View, useColorScheme, Keyboard, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { cacheImages } from './helpers/AssetsCaching';
import * as SignupLogin from '../components/signup-login-inputs';
import { USStates } from '../data/states';
import axios from 'axios';

SplashScreen.preventAutoHideAsync();

const states = USStates; // All 50 states to populate State dropdown

export default LoginPage = ({ navigation }) => {
	const [isReady, setIsReady] = useState(false); // Have our assets loaded?
	const [selectedIndex, setSelectedIndex] = useState(1); // 0 == SignUp | 1 == Login

	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [displayName, setDisplayName] = useState('');

	const [stateName, setStateName] = useState(''); // Hold and set the State name for the dropdown
	const [dropFocus, setDropFocus] = useState(false); // Is the dropdnown in focus or not

	const [isLoading, setIsLoading] = useState(false);

	// References for our inputs
	let emailInput = useRef(null);
	let usernameInput = useRef(null);
	let passwordInput = useRef(null);
	let confirmInput = useRef(null);
	let displayInput = useRef(null);
	let stateInput = useRef(null);

	const switchLogin = (i) => {
		setEmail('');
		setDisplayName('');
		setUserName('');
		setPassword('');
		setConfirm('');
		setStateName('');

		setSelectedIndex(i);

		if (usernameInput.isFocused()) {
			usernameInput.blur();
		}
		if (passwordInput.isFocused()) {
			passwordInput.blur();
		}

		Keyboard.dismiss();
	};

	// If the user has a preferred color scheme ( dark || light )
	const colorScheme = useColorScheme();
	theme.mode = colorScheme;

	useEffect(() => {
		loadAssetsAsync();
	}, []);

	const loadAssetsAsync = async () => {
		const imageAssets = cacheImages([require('./images/WCIlogo.png'), require('./images/WCImark84.png')]);
		await Promise.all([...imageAssets]);
		setIsReady(true);
	};

	const onLayoutRootView = useCallback(async () => {
		if (isReady) {
			await SplashScreen.hideAsync();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}
	const onPressButton = (selectedIndex) => {
		Keyboard.dismiss();
		setIsLoading(true);
		if (selectedIndex == 0) {
			let signup = { email: email, username: userName, password: password, display: displayName, state: stateName };

			axios
				.post('https://wherecanibackend-zpqo.onrender.com/signup', signup)
				.then(function (response) {
					navigation.navigate('search', response.data.data);
				})
				.finally(() => {
					setIsLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					singupErrorAlert();
				});
		} else {
			let login = { username: userName, password: password };

			axios
				.post('https://wherecanibackend-zpqo.onrender.com/login', login)
				.then(function (response) {
					navigation.navigate('search', response.data.data);
				})
				.finally(() => {
					setIsLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					loginErrorAlert();
				});
		}

		return;
	};

	const loginErrorAlert = () => Alert.alert('Invalid Login', 'You have entered the wrong Username or Password, Please Try Again', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
	const singupErrorAlert = () => Alert.alert('Invalid SignUp', 'You have entered a Username or Email that already exist, Please Try Again', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);

	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor:"black" }} onLayout={onLayoutRootView}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={100}
				style={{ flex: 1 }}
			>
				<ScrollView>
					<ThemeProvider theme={theme}>
						<View style={{ width: '100%', height: '100%', backgroundColor: '#17001F' }}>
							<Text h1>Where Can I...</Text>
							<ButtonGroup
								disabled={isLoading}
								buttons={['SignUp', 'Login']}
								selectedIndex={selectedIndex}
								onPress={(value) => {
									if (selectedIndex != value) {
										switchLogin(value);
									}
								}}
								containerStyle={{ marginTop: 40, marginBottom: 40 }}
							/>

							{selectedIndex == 0 && (
								<SignupLogin.StateDropDown
									ref={(input) => (stateInput = input)}
									disabled={isLoading}
									style={(dropFocus || stateName != '') && { borderColor: '#FFFFFF' }}
									data={states}
									placeholder={!dropFocus ? 'Your State...' : '...'}
									value={stateName}
									onFocus={() => setDropFocus(true)}
									onBlur={() => setDropFocus(false)}
									onSubmitEditing={() => emailInput.focus()}
									onChange={(item) => {
										setStateName(item.value);
										setDropFocus(false);
									}}
								/>
							)}

							{selectedIndex == 0 && (
								<SignupLogin.EmailInput
									ref={(input) => (emailInput = input)}
									disabled={isLoading}
									onSubmitEditing={() => {
										usernameInput.focus();
									}}
									value={email}
									onChangeText={(text) => setEmail(text)}
								/>
							)}

							<SignupLogin.UsernameInput
								ref={(input) => (usernameInput = input)}
								disabled={isLoading}
								onSubmitEditing={() => {
									passwordInput.focus();
								}}
								value={userName}
								onChangeText={(text) => setUserName(text)}
							/>

							<SignupLogin.PasswordInput
								ref={(input) => (passwordInput = input)}
								disabled={isLoading}
								onSubmitEditing={() => {
									if (selectedIndex == 0) {
										confirmInput.focus();
									}
								}}
								value={password}
								onChangeText={(text) => setPassword(text)}
							/>

							{selectedIndex == 0 && (
								<SignupLogin.ConfirmPasswordInput
									ref={(input) => (confirmInput = input)}
									disabled={isLoading}
									iconColor={confirm.length > 0 && confirm == password ? '#00FF00' : '#FF0000'}
									onSubmitEditing={() => {
										displayInput.focus();
									}}
									value={confirm}
									onChangeText={(text) => setConfirm(text)}
								/>
							)}

							{selectedIndex == 0 && (
								<SignupLogin.DisplayInput
									ref={(input) => (displayInput = input)}
									disabled={isLoading}
									value={displayName}
									onChangeText={(text) => setDisplayName(text)}
								/>
							)}

							<Button
								disabled={isLoading}
								loading={isLoading}
								loadingProps={{ color: '#FFFFFF', size: 31.5 }}
								title={selectedIndex == 0 ? 'SignUp' : 'Login'}
								type='outline'
								raised
								containerStyle={{ marginHorizontal: 100, marginTop: 20 }}
								onPress={() => onPressButton(selectedIndex)}
							/>
						</View>
					</ThemeProvider>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaProvider>
	);
};

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
				paddingTop: 30,
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
