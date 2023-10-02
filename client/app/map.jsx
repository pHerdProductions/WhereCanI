import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default MapPage = ({ route, navigation }) => {

    const deviceWidth = Dimensions.get('screen').width;
    const deviceHeight = Dimensions.get('screen').height;
    const deviceRatio = deviceWidth / deviceHeight; // Device screen's aspect ratio

    // const { lat, lng, latDelta } = route.params;
    console.log(route.params)
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

      this.state={
        markers: []
      }
      // this.handlePress=this.handlePress.bind(this)

      function handlePress(e){
        this.setState({
          markers:[
            ...this.state.markers,{
              coordinate: e.nativeEvent.coordinate
            }
          ]
        })
      }


    return (
       <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
        
        {/*Render our MapView*/}
          <MapView
            style={styles.map}
            initialRegion={regionFollyBeach} // Specify our initial coordinates/region
            onPress={this.handlePress}
            // When the user stops scrolling/panning, set the region: 
            // onRegionChangeComplete = {(regionFollyBeach) => setRegion(regionFollyBeach)}
          >
    
            {/* Test Marker for Folly Beach around the Washout*/}
            {/* <Marker draggable={true} anchor={{point:(0,3)}} coordinate={regionFollyBeach} image={require('./images/WCImark84.png')}
              // onRegionChangeComplete = {(anchor) => anchor (regionFollyBeach)}
              // onPress={console.log(point)}

            > */}

              {/* <View>
                <Text style={styles.markerText}>Folly</Text>
              </View>
            </Marker> */}

{
              this.state.markers.map((marker)=>{
                return <Marker {...marker} image={require('./images/WCImark84.png')}/>
              })
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
