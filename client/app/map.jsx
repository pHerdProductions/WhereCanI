import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default MapPage = ({ route, navigation }) => {

    const deviceWidth = Dimensions.get('screen').width;
    const deviceHeight = Dimensions.get('screen').height;
    const deviceRatio = deviceWidth / deviceHeight; // Device screen's aspect ratio

    const { lat, lng, latDelta } = route.params;
    const [region, setRegion] = useState({
        latitude: lat,
        longitude: lng,
        latitudeDelta: latDelta,
        longitudeDelta: latDelta * deviceRatio,
      });
    
      // Sample region Type -- of folly beach
      const regionFollyBeach = {
        latitude: 32.667870679074494,
        longitude: -79.90863058239091,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    return (
       <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
        
        {/*Render our MapView*/}
          <MapView
            style={styles.map}
            initialRegion={region} // Specify our initial coordinates/region

            // When the user stops scrolling/panning, set the region: 
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
          <Text style={styles.text}>Current LAT: {region.latitude}</Text>
          <Text style={styles.text}>Current LON: {region.longitude}</Text>
          <Text style={styles.text}>Current LATD: {region.latitudeDelta}</Text>
          <Text style={styles.text}>Current LNGD: {region.longitudeDelta}</Text>

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
