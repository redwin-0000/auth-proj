import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Admin: React.FC = ({navigation}: any) => {
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (userDoc.exists) {
            setAdminData(userDoc.data());
          } else {
            console.log('No such admin data found!');
          }
        } else {
          console.log('No authenticated user!');
        }
      } catch (error) {
        console.log('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
      <Text style={styles.title}>Admin Dashboard</Text>
      {adminData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Name: {adminData.name}</Text>
          <Text style={styles.infoText}>Email: {adminData.email}</Text>
          <Text style={styles.infoText}>Phone: {adminData.phone}</Text>
          <Text style={styles.infoText}>Role: {adminData.role}</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>No admin data available.</Text>
      )}
    <View style={{marginTop:30}}>
    {loading ? (
        <ActivityIndicator size="large" color="blue" /> 
      ) : (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Admin;
