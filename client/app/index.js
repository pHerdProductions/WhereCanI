import { View,StyleSheet,Text } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
      <Link style={styles.button} href="/home">Home</Link>
      <Link style={styles.button} href="/map">Map</Link>
      <Text>Default</Text>
    </View>
  );
}


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
        width:100
      },
  });