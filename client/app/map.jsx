import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default MapPage = ({ route, navigation }) => {

    const deviceWidth = Dimensions.get('screen').width;
    const deviceHeight = Dimensions.get('screen').height;
    const deviceRatio = deviceWidth / deviceHeight; // Device screen's aspect ratio

    // Received parameters from the search page
    const { lat, lng, latDelta, POIs } = route.params;

    const [region, setRegion] = useState({
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta,
      longitudeDelta: latDelta * deviceRatio,
    });

    const [POIS, setPOIS] = useState(POIs);

    // Generate a proper coordinate from POI data for use in a <Marker/>
    const generatePOICoordinate = (POI) => {
      const coordinate = {
        latitude: parseFloat(POI.latitude),
        longitude: parseFloat(POI.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      return coordinate;
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
   
          {/* Map the array of POIs to a bunch of markers to display on the map */}
          {POIS.map((POI, index) => (
            <Marker
              key={index}
              coordinate={generatePOICoordinate(POI)}
              title={POI.title}
              description={POI.description}
            />
          ))}

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

       </View>
     </SafeAreaView>
   );

}

// ___ STYLES ___ Create a seperate file for the style to clean up code?
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