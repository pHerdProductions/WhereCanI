// The Search page, comes after Login / Signup page

import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider, createTheme, Button, ButtonGroup, withTheme, Text, Icon, Input, InputProps} from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import { View, ScrollView, StyleSheet, useColorScheme, Keyboard } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { USStates } from '../data/states';
import * as Search from '../components/search-inputs';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API } from '@env'

// Generate an address for use in the Geocoder
const generateAddress = (stateName, cityName, zipcode) => {
  let address = '';
  if (cityName != '') {address += cityName};
  if (stateName != '') {address += (address != '' ? ', ' : '') + stateName};
  if (zipcode != '') {address += (address != '' ? ', ' : '') + zipcode};
  return address;
}

Geocoder.init(GOOGLE_API);

const states = USStates;

export default SearchPage = ({navigation, route}) => {

  const [dropFocus, setDropFocus] = useState(false); // Is the dropdnown in focus or not
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [hashtags, setHashtags] = useState('');

  let stateInput = useRef(null);
  let cityInput = useRef(null);
  let zipcodeInput = useRef(null);
  let hashtagsInput = useRef(null);

  const { display, username } = route.params;

  const browseAddress = () => {
    let address = generateAddress(stateName, cityName, zipcode);
    console.log(address);
    Geocoder.from(address)
    .then(json => {
        let locData = json.results[0];
        let LatLng = locData.geometry.location;
        let Bounds = locData.geometry.bounds
        let delta = Bounds.northeast.lat - Bounds.southwest.lat;
        navigation.navigate('map', { lat: LatLng.lat, lng: LatLng.lng, latDelta: delta });
    })
    .catch(error => console.warn(error));
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={{width: '100%', height: '100%', backgroundColor: '#17001F'}}>

          <Text>User: {JSON.stringify(display)}</Text>

          <Text h1>Where Can I...</Text>

          <Search.StateDropDown
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
            onSubmitEditing={() => cityInput.focus()}
          />

          <Search.CityInput
            ref={(input) => (cityInput = input)}
            value={cityName}
            onChangeText={text => setCityName(text)}
            onSubmitEditing={() => zipcodeInput.focus()}
          />

          <Search.ZipInput
            ref={(input) => (zipcodeInput = input)}
            value={zipcode}
            onChangeText={text => setZipcode(text)}
          />

          <Button
            title='Browse'
            type='outline'
            raised
            containerStyle={{marginHorizontal: 100, marginVertical: 40}}
            onPress={() => browseAddress()}
          />

          <Search.HashtagsInput
            ref={(input) => (hashtagsInput = input)}
            value={hashtags}
            onChangeText={text => setHashtags(text)}
          />

          <Button
            title='Search'
            type='outline'
            raised
            containerStyle={{marginHorizontal: 100, marginVertical: 40}}
            onPress={() =>
              navigation.navigate('map', {name: 'Jane'})
            }
          />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

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