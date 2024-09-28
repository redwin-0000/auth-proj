import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const NormalButton = ({ button, loading,onPress }: any) => {
    return (
        <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={onPress}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {/* <Text style={styles.buttonText}>{button}</Text>
         */}
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>{button}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default NormalButton

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
