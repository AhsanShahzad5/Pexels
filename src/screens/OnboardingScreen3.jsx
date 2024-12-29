import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
const OnboardingScreen3 = () => {
    const navigation = useNavigation();
    const finishOnboarding = async () => {
        try {
            // Set onboarding-completed flag in AsyncStorage
            await AsyncStorage.setItem('onboarding-completed', 'true');
            // Navigate to Login or Home based on your app's flow
            navigation.replace('Login');
        } catch (error) {
            console.error('Error setting onboarding completion flag:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join the Art Community</Text>
            <Text style={styles.subtitle}>
                Follow your favorite artists, engage with their posts, and showcase your talent to a vibrant community.
            </Text>
            <TouchableOpacity style={styles.button} onPress={finishOnboarding}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingScreen3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        padding: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        color: "#aaa",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#2ecc71',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',             // White text color
        fontSize: 16,              // Text size
        fontWeight: 'bold',        // Bold text
    },
});
