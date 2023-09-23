import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ThemeProvider, createTheme, Button, ButtonGroup, withTheme, Text, Icon, Input, InputProps} from '@rneui/themed';

import { Image, StyleSheet, View, Dimensions,SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map=({navigation, route})=>{

    const [region, setRegion] = useState({
        latitude: 32.668870,
        longitude: -79.907630,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
    
      const regionFollyBeach = {
        latitude: 32.667870679074494,
        longitude: -79.90863058239091,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    
      const dw = Dimensions.get('screen').width;
      const dh = Dimensions.get('screen').height;

      const { city,zipcode, state } = route.params;

      console.log(city)

    return (
       <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.nav}>
        <Button
            title='Search'
            type='outline'
            raised
            containerStyle={{marginHorizontal: 100, marginVertical: 40}}
            onPress={() =>
              navigation.navigate('search', {name: 'Jane'})
            }
          />
        </View>
    
        <View style={styles.container}>
        
        {/*Render our MapView*/}
          <MapView
            style={styles.map}
            // Specify our initial coordinates/region
            initialRegion = {{
              latitude: 32.668870679074494,
              longitude: -79.90763058239091,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
    
            // When the user stops scrolling/panning, change the current coordinates: 
            onRegionChangeComplete = {(region) => setRegion(region)}
          >
    
            {/* Test Marker for Folly Beach around the Washout*/}
            <Marker coordinate={regionFollyBeach} image={require('./images/WCImark84.png')}>
              <View>
                <Text style={styles.markerText}>Folly</Text>
              </View>
            </Marker>
          </MapView>
          
          
          
          <Image source={require('./images/WCIlogo.png')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 80, 
              height: 40,
          }}/>
    
          <StatusBar style='auto' />
          <Text style={styles.text}>W: {dw} , H: {dh}</Text>
          <Text style={styles.text}>Current LAT: {region.latitude}</Text>
          <Text style={styles.text}>Current LON: {region.longitude}</Text>
        </View>
        </SafeAreaView>

      );

}

// ___ STYLES ___
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
      marginTop: 10,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 'calc(100vh - navbarHeight)'
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
        flex:1,
        width:"100%",
        height:"20px",

      },
      safeAreaView:{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
        flexDirection: "column",

      },
      button: {
        textAlign: 'center',
        backgroundColor:"black",
        color:"white",
        fontWeight: 'bold',
        fontSize: 20,
        borderRadius:"20px",
        width:100,
        
      },
  });


  

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


export default Map