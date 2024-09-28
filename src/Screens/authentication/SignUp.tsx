import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native';
import CustomCheckbox from '../../components/CheckBox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleSignUpButton from '../../components/GoogleSignUpButton';
import NormalButton from '../../components/NormalButton';

interface SignUpProps {
    navigation: any;
}

interface Role {
    user: boolean;
    admin: boolean;
}

const { width, height } = Dimensions.get('window');

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [role, setRole] = useState<Role>({ user: false, admin: false });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '539006689102-u7o3su5pbbci5h9rq124ub4tthpuf22p.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        const unsubscribe = navigation.addListener('focus', () => {
            setName('');
            setEmail('');
            setPassword('');
            setPhone('');
            setRole({ user: false, admin: false });
        });

        return unsubscribe;
    }, [navigation]);

    const handleRoleChange = (roleName: keyof Role) => {
        setRole((prev) => ({
            ...prev,
            [roleName]: !prev[roleName],
        }));
    };

    const handleSignUp = async () => {
        if (!name || !email || !password || !phone) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }

        if (!role.user && !role.admin) {
            Alert.alert('Error', 'Please select a role');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);

            await firestore().collection('users').doc(userCredential.user.uid).set({
                name,
                email,
                phone,
                role: role.user ? 'user' : 'admin',
            });

            navigation.navigate('Login');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'This email is already in use.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'This email address is invalid.');
            } else {
                Alert.alert('Error', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const userInfo = await GoogleSignin.signIn();

            const idToken = userInfo.idToken;
            console.log(idToken,'-9898')
            if (!idToken) {
                throw new Error('Failed to get idToken');
            }
    
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
    
            // Save user info in Firestore
            await firestore().collection('users').doc(userCredential.user.uid).set({
                name: userCredential.user.displayName,
                email: userCredential.user.email,
                phone: userCredential.user.phoneNumber || '',
                role: 'user',
            });
    
            console.log('Google Sign-In successful', userCredential);
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            Alert.alert('Error', 'Google sign-in failed. Please try again.');
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.overlay} keyboardShouldPersistTaps="handled">
            <View style={styles.greenSection}>
                <Image source={require('../../assets/fuelBuddyLogo.png')} style={styles.logo} />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#c1c1c1"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#c1c1c1"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#c1c1c1"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#c1c1c1"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                <View style={styles.roleContainer}>
                    <Text style={styles.roleText}>Select Role:</Text>
                    <CustomCheckbox
                        label="User"
                        checked={role.user}
                        onChange={() => handleRoleChange('user')}
                    />
                    <CustomCheckbox
                        label="Admin"
                        checked={role.admin}
                        onChange={() => handleRoleChange('admin')}
                    />
                </View>

                <NormalButton
                    onPress={handleSignUp}
                    disabled={loading}
                    button="Sign Up"
                    loading={loading}
                />
                <GoogleSignUpButton onPress={onGoogleButtonPress} />

                <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={() => navigation.navigate('Login')}
                    disabled={loading}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.buttonText}>Already have an Account</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        width: width,
        maxWidth: 600,
        marginTop: 300,
        bottom: 260,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    roleContainer: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    roleText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    greenSection: {
        width: width,
        height: height * 0.4,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        top: 70,
    },
    logo: {
        width: 300,
        height: 300,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default SignUp;
