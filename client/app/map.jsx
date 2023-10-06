import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios  from 'axios';

// For fetching POIs, having an issue with getting them and then having them load on render. Seems to be out of sync.
// Maybe fetch POIs on the search page and pass the data to the map page
const fetchPOIS = () => {
  axios.get('https://wherecanibackend-zpqo.onrender.com/poi')
  .then(function (response) {
    //setAllPOIS(response.data.data);
    console.log('POIs:');
    console.log(response.data.data);
    return response.data.data;
  })
  .catch(function (error) {
    console.warn(error);
  });
}

const markers = [
  {
    latitude: 32.6678706790745,
    longitude: -79.90863058239091,
    title: 'Marker 1',
    description: 'This is the first marker.',
  },
  {
    latitude: 32.67787067907449,
    longitude: -79.90863058239091,
    title: 'Marker 2',
    description: 'This is the second marker.',
  },
  {
    latitude: 32.66887067907449,
    longitude: -79.90863058239091,
    title: 'Marker 3',
    description: 'This is the third marker.',
  },
];

export default MapPage = ({ route, navigation }) => {

    const deviceWidth = Dimensions.get('screen').width;
    const deviceHeight = Dimensions.get('screen').height;
    const deviceRatio = deviceWidth / deviceHeight; // Device screen's aspect ratio

    const { lat, lng, latDelta, POIs } = route.params;

    const [region, setRegion] = useState({
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta,
      longitudeDelta: latDelta * deviceRatio,
    });

    const [POIS, setPOIS] = useState(POIs);
    
      // Sample region Type -- of folly beach
    const regionFollyBeach = {
      latitude: 32.667870679074494,
      longitude: -79.90863058239091,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

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
