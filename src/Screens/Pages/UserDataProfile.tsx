import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

const UserDataProfile = () => {
    const [userData, setUserData] = useState<User[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const querySnapshot = await firestore()
                    .collection('users')
                    .where('role', '==', 'user')
                    .get();

                let userDataArray: User[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Omit<User, 'id'>;
                    userDataArray.push({ id: doc.id, ...data });
                });

                setUserData(userDataArray);
            } catch (error) {
                console.log('Error getting documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = (user: User) => {
        setSelectedUser(user); 
        setModalVisible(true); 
    };

    const handleSave = async () => {
        if (selectedUser) {
            try {
                await firestore().collection('users').doc(selectedUser.id).update({
                    name: selectedUser.name,
                    email: selectedUser.email,
                    phone: selectedUser.phone,
                    role: selectedUser.role,
                });

                // Update the local state after successful save
                const updatedUserData = userData.map(user =>
                    user.id === selectedUser.id ? selectedUser : user
                );
                setUserData(updatedUserData); 

                setModalVisible(false); 
            } catch (error) {
                console.log('Error updating document:', error);
            }
        }
    };

    const handleDelete = async (userId: string) => {
        try {
            Alert.alert(
                'Delete User',
                'Are you sure you want to delete this user?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            await firestore().collection('users').doc(userId).delete();
                            const updatedUserData = userData.filter(user => user.id !== userId);
                            setUserData(updatedUserData);

                            console.log(`User with ID ${userId} deleted successfully.`);
                        },
                    },
                ],
                { cancelable: true }
            );
        } catch (error) {
            console.log('Error deleting document:', error);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 10, marginTop: 50 }}>
            <Text style={styles.dataText}>All Users Data</Text>
            {userData.length > 0 ? (
                userData.map((user, index) => (
                    <View key={user.id} style={styles.card}>
                        <Text style={styles.title}>User {index + 1}</Text>
                        <Text style={styles.text}>Name: {user.name}</Text>
                        <Text style={styles.text}>Email: {user.email}</Text>
                        <Text style={styles.text}>Phone: {user.phone}</Text>
                        <Text style={styles.text}>Role: {user.role}</Text>
                        {/* Edit and Delete Buttons */}
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" onPress={() => handleEdit(user)} />
                            <Button title="Delete" color="red" onPress={() => handleDelete(user.id)} />
                        </View>
                    </View>
                ))
            ) : (
                <Text>No user data found</Text>
            )}

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Edit User</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={selectedUser?.name || ''}
                        onChangeText={(text) => setSelectedUser({ ...selectedUser!, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={selectedUser?.email || ''}
                        onChangeText={(text) => setSelectedUser({ ...selectedUser!, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={selectedUser?.phone || ''}
                        onChangeText={(text) => setSelectedUser({ ...selectedUser!, phone: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Role"
                        value={selectedUser?.role || ''}
                        onChangeText={(text) => setSelectedUser({ ...selectedUser!, role: text })}
                    />
                    <Button title="Save" onPress={handleSave} />
                    <View style={{ marginTop: 10 }}>
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    dataText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default UserDataProfile;
