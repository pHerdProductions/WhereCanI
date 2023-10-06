import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, Button, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import { GOOGLE_API } from '@env'
console.log(GOOGLE_API)
Geocoder.init(GOOGLE_API);


export default MapPage = ({ route, navigation }) => {

    const deviceWidth = Dimensions.get('screen').width;
    const deviceHeight = Dimensions.get('screen').height;
    const deviceRatio = deviceWidth / deviceHeight; // Device screen's aspect ratio
    const [marker, setMarker]=useState([])
    const [counter, setCounter] = useState(0);
    const [address, setAddress] = useState('');


    // const { lat, lng, latDelta } = route.params;
    // console.log(route.params)
    // const [region, setRegion] = useState({
    //     latitude: lat,
    //     longitude: lng,
    //     latitudeDelta: latDelta,
    //     longitudeDelta: latDelta * deviceRatio,
    //   });
    
      // Sample region Type -- of folly beach
      const regionFollyBeach = {
        latitude: 32.667870679074494,
        longitude: -79.90863058239091,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

        function onPress(e){
          let area={
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
          
         
        setMarker([...marker,<Marker draggable={true} key={counter} anchor={{point:(0,3)}} coordinate={area} image={require('./images/WCImark84.png')}
          onPress={(e)=>{onPoiPress(e)}}
          >
          <Text>{address}</Text>            
          </Marker>
        ])
        setCounter((counter) => counter + 1)
        }

        function onPoiPress(e){
      //     Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
      //     .then(json => {
      //     var addressComponent = json.results[0].formatted_address;
      //     setAddress((address)=>address=addressComponent)
      // })
      // .catch(error => console.warn(error));
      setAddress("map")

        }


    return (
       <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
        
        {/*Render our MapView*/}
          <MapView
            style={styles.map}
            initialRegion={regionFollyBeach} // Specify our initial coordinates/region
            onPress={(e)=>{ onPress(e)}}
            // When the user stops scrolling/panning, set the region: 
            // onRegionChangeComplete = {(regionFollyBeach) => setRegion(regionFollyBeach)}
          >
                {
                  marker
                }
        
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
          {/* <Text style={styles.text}>Current LAT: {region.latitude}</Text>
          <Text style={styles.text}>Current LON: {region.longitude}</Text>
          <Text style={styles.text}>Current LATD: {region.latitudeDelta}</Text>
          <Text style={styles.text}>Current LNGD: {region.longitudeDelta}</Text> */}

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
