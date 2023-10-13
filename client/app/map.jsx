import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView, Alert,Modal, Pressable,TextInput} from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);


    // const { lat, lng, latDelta } = route.params;
    // console.log(route.params)
    // const [region, setRegion] = useState({
    //     latitude: lat,
    //     longitude: lng,
    //     latitudeDelta: latDelta,
    //     longitudeDelta: latDelta * deviceRatio,
    //   });
    

    const [title, onChangetitle] = React.useState('title');
    const [desc, onChangedesc] = React.useState('des');
    const [hash, onChangehash] = React.useState('hashtags');

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
          Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
          .then(json => {
          var addressComponent = json.results[0].formatted_address;
          setAddress((address)=>address=addressComponent)
          console.log(address)
          })
          .catch(error => console.warn(error));     
            
        setMarker([...marker,<Marker draggable={true} key={counter} anchor={{point:(0,3)}} coordinate={area} image={require('./images/WCImark84.png')}
          title={"Point Of Interest"} description={address}  
        onPress={(e)=>{onPoiPress(e)}}
          >

          </Marker>
        ])
        setCounter((counter) => counter + 1)
        }

        useEffect(() => {
          // Update the document title using the browser API
        },[marker]);


        function onPoiPress(e){
          setModalVisible(true)
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
          <Modal     style={{position: "absolute", bottom: 100}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter POI</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangetitle}
        value={title}
      />
              <TextInput
        style={styles.input}
        onChangeText={onChangedesc}
        value={desc}
      />
              <TextInput
        style={styles.input}
        onChangeText={onChangehash}
        value={hash}
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>   
          
          
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

        </View >
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
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });
