import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const LandingScreens = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  
  const translateYAnim = useRef(new Animated.Value(30)).current;

  const handleNavigate = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, translateYAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.greenSection}>
            <Image 
              source={require('../../assets/fuelBuddyLogo.png')} 
              style={styles.logo}
            />
          </View>

          <View style={styles.textSection}>
            <Animated.Text 
              style={[
                styles.text, 
                { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }
              ]}
            >
              Welcome to FuelBuddy
            </Animated.Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 30,
    marginTop: -420,
  },
  greenSection: {
    width: width,  
    height: height * 0.4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  textSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 40,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: height * 0.35,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    width: width - 40,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 30,
  },
});

export default LandingScreens;
