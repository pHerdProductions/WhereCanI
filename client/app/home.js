import {View,Text,StyleSheet} from 'react-native'
import { Link } from 'expo-router';

const home=()=>{

    return (
        <View>
            <Link style={styles.button} href="/map">map</Link>

            <Text>home page</Text>
            <Text>This is the login and log out page</Text>

        </View>
    )

}
export default home

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    button: {
        textAlign: 'center',
        backgroundColor:"black",
        color:"white",
        fontWeight: 'bold',
        fontSize: 30,
        width:110
      },
  });
  