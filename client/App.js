// ___ IMPORTS ___
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// ___ WCIapp ___
export default function App() {

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

  return (
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
  );
}

// ___ STYLES ___
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    marginTop: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  }
});