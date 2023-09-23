// The initial start page: Signup & Login

import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider, createTheme, Button, ButtonGroup, withTheme, Text, Icon, Input, InputProps} from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import { View, ScrollView, StyleSheet, useColorScheme, Keyboard, TouchableHighlight} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { Link } from 'expo-router';
import { cacheImages } from './helpers/AssetsCaching';
import * as SignupLogin from '../components/signup-login-inputs';
import { USStates } from '../data/states';
import axios from "axios"

SplashScreen.preventAutoHideAsync();

const states = USStates;


export default  Login=({navigation}) => {

  const [isReady, setIsReady] = useState(false); // Have our assets loaded?
  const [selectedIndex, setSelectedIndex] = useState(1); // 0 == SignUp | 1 == Login

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [stateName, setStateName] = useState(''); // Hold and set the State name for the dropdown
  const [dropFocus, setDropFocus] = useState(false); // Is the dropdnown in focus or not

  const [loginData, setLoginData] = useState([]); // Hold and set the State name for the dropdown

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

    if(usernameInput.isFocused()){usernameInput.blur()}
    if(passwordInput.isFocused()){passwordInput.blur()}

     Keyboard.dismiss
  }


  // If the user has a preferred color scheme ( dark || light )
  const colorScheme = useColorScheme();
  theme.mode = colorScheme;

  React.useEffect(() => {
    loadAssetsAsync();
  }, []);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./images/WCIlogo.png'),
      require('./images/WCImark84.png'),
    ]);
    await Promise.all([...imageAssets]);
    setIsReady(true);
  };

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);
  
  if (!isReady) {
    return null;
  }
  const onPressButton =  (selectedIndex)=>{

  if (selectedIndex==0){
    let signup = {email:email, username:userName, password: password,display:displayName,state:stateName }

    axios.post('https://wherecanibackend.onrender.com/user',signup)
    .then(function (response) {
        setLoginData(response.data.data)
        navigation.navigate('search', response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });

  } else {
    let login={username:userName, password:password}

       axios.post('https://wherecanibackend.onrender.com/login',login)
      .then(function (response) {
        setLoginData(response.data.data)
        navigation.navigate('search', response.data.data)

      })
      .catch(function (error) {
        console.log(error);
        
      });
    }
    navigation.navigate('search', loginData)  //delete this later, this is for developmeent only

    return
  }
 


  return (

    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <View style={{width: '100%', height: '100%', backgroundColor: '#17001F'}}>

          <Text h1>Where Can I...</Text>

          <ButtonGroup
            buttons={['SignUp', 'Login']}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              if (selectedIndex != value) {switchLogin(value)}
            }}
            containerStyle={{ marginTop: 40, marginBottom: 40 }}
          />

          {selectedIndex == 0 &&
            <SignupLogin.StateDropDown
              ref={(input) => (stateInput = input)}
              style={(dropFocus || stateName != '') && { borderColor: '#FFFFFF' }}
              data={states}
              placeholder={!dropFocus ? 'Your State...' : '...'}
              value={stateName}
              onFocus={() => setDropFocus(true)}
              onBlur={() => setDropFocus(false)}
              onChange={item => {
                setStateName(item.value);
                setDropFocus(false);
              }}
            />
          }

          {selectedIndex == 0 &&
            <SignupLogin.EmailInput
              ref={(input) => (emailInput = input)}
              onSubmitEditing={() => {
                usernameInput.focus();
              }}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          }

          <SignupLogin.UsernameInput
            ref={(input) => (usernameInput = input)}
            onSubmitEditing={() => {
              passwordInput.focus();

            }}
            value={userName}
            onChangeText={text => setUserName(text)}
          />

          <SignupLogin.PasswordInput
            ref={(input) => (passwordInput = input)}
            onSubmitEditing={() => {
              if (selectedIndex == 0){confirmInput.focus()};

            }}
            value={password}
            onChangeText={text => setPassword(text)}
          />

          {selectedIndex == 0 &&
            <SignupLogin.ConfirmPasswordInput 
              ref={(input) => (confirmInput = input)}
              iconColor={(confirm.length > 0 && confirm == password) ? '#00FF00' : '#FF0000'}
              onSubmitEditing={() => {
                displayInput.focus();
              }}
              value={confirm}
              onChangeText={text => setConfirm(text)}
            />
          }

          {selectedIndex == 0 &&
            <SignupLogin.DisplayInput
              ref={(input) => (displayInput = input)}
              value={displayName}
              onChangeText={text => setDisplayName(text)}
            />
          }

          <Button
            title={selectedIndex == 0 ? 'SignUp' : 'Login'}
            type='outline'
            raised
            containerStyle={{marginHorizontal: 100, marginTop: 50}}
            onPress={() => onPressButton(selectedIndex) }
          />
          
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

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
      }
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
    }
  },
});