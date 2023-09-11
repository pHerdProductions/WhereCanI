import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions,SafeAreaView,Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const map=()=>{

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

       <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.nav}>
        <Link style={styles.button} href="/home">home</Link>
        <Text>map</Text>
       
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
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
      marginTop: 30,
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
        marginHorizontal: 20,
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



export default map