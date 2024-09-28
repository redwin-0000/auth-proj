import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import NormalButton from '../../components/NormalButton';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  // Function to handle sign-in
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Firebase sign-in
      const res = await auth().signInWithEmailAndPassword(email, password);
      const user = res.user;
      const token = await user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
      console.log('User token:', token); 
  
      const userDoc = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      
      if (userDoc.exists) {
        const userData:any = userDoc.data();
        console.log('User data:', userData);
        Alert.alert('Success', 'Logged in  successfully');
        const role = userData.role;
      
      if (role === 'admin') {
        Alert.alert('Success', 'Logged in as Admin');
        navigation.navigate('BottomTab', { userData });
      } else if (role === 'user') {
        // Alert.alert('Success', 'Logged in as User');
        navigation.navigate('UserProfile', { userData });
      } else {
        Alert.alert('Error', 'Unknown role');
      }
      } else {
        console.log('No such user data in Firestore');
        Alert.alert('Error', 'No user data found.');
      }
  
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is invalid.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password.');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
  
      <ScrollView contentContainerStyle={styles.overlay} keyboardShouldPersistTaps="handled">
         <View style={styles.greenSection}>
            <Image 
              source={require('../../assets/fuelBuddyLogo.png')} 
              style={styles.logo}
            />
          </View>
        <View style={styles.formContainer}>
          <View style={{alignItems:'center'}}>
            <Text style={styles.heading}>Login to fuelBuddy</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#c1c1c1'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none" 
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'#c1c1c1'}

            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/* <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity> */}
          <NormalButton 
          onPress={handleSignIn} 
          disabled={loading}
          button={'Log In'}
          loading={loading}
          />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)', 
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    width: width, 
    maxWidth: 600,
    // marginTop: 200,
    // height: 500,
    bottom:-235,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  greenSection: {
    width: width,  
    height: height * 0.4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    top:70
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  heading:{
    fontWeight:'bold',
    fontSize:25,
    color:'#fff'
  }
});

export default Login;
