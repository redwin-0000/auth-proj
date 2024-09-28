import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

interface UserData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface UserProfileProps {
  navigation: any;
  route: {
    params: {
      userData: UserData;
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ navigation, route }) => {
  const user = route?.params?.userData;
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error logging out', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>Phone: {user.phone}</Text>
        <Text style={styles.text}>Role: {user.role}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default UserProfile;
