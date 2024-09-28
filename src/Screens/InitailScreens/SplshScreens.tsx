import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplshScreens = ({ navigation }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;  

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            navigation.navigate('LandingScreens');
        }, 5000);

        return () => clearTimeout(timer);
    }, [fadeAnim, navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />
            
            <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
                <Animated.Image
                    source={require('../../assets/fuelBuddyLogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    },
    animatedView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default SplshScreens;
