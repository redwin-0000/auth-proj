import { View, Text,TouchableOpacity,Image,StyleSheet} from 'react-native'
import React from 'react'

const GoogleSignUpButton = ({onPress}: any) => {
  return (
    <TouchableOpacity
    style={[styles.button,{marginTop:10}]}
    onPress={onPress}
>
        <View style={{flexDirection:'row',alignItems:'center', gap:10}}>
            <Image 
            source={require('../assets/google.png')} 
            style={{width:20, height:20}}
            />
        <Text style={styles.buttonText}>Google Sign Up</Text>
        </View>
</TouchableOpacity>
  )
}

export default GoogleSignUpButton

const styles = StyleSheet.create({
 
    button: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
