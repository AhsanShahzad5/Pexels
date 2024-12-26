import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom'; // Update path if necessary

export default function Login() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const setUser = useSetRecoilState(userAtom); // Recoil setter for userAtom

    const onChangeFunction = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // const handleLogin = async () => {
    //     setLoading(true);
    //     console.log('Form Data:', formData);
    //     // Simulate login delay
    //     setTimeout(() => setLoading(false), 1500);
    //     navigation.navigate('Home');
    // };


    const handleLogin = async () => {

        setLoading(true);

        try {
            const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';

            const response = await fetch(`${apiUrl}/api/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ ...formData }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Logged in successfully!");
                const { token, user } = data;
                // Save token in AsyncStorage
                await AsyncStorage.setItem("jwtToken", token);

                // Update userAtom and AsyncStorage
                setUser(user);
                console.log(user);

                await AsyncStorage.setItem("user-data", JSON.stringify(user));

                // Clear the form
                setFormData({ username: "", password: "" });
                navigation.navigate("Home");
            } else {
                Alert.alert("Login Failed", data.error || "An unknown error occurred.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to connect to the server. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    const { username, password } = formData;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => onChangeFunction("username", text)}
                        placeholder="Enter your username"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordGroup}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => onChangeFunction("password", text)}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.togglePassword}
                            onPress={() => setShowPassword((prev) => !prev)}
                        >
                            {/* <Text style={styles.toggleText}>
                                {showPassword ? "Hide" : "Show"}
                            </Text> */}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.signupText}>
                    Not a user?{' '}
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.signupLink}>Signup</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    formControl: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
    },
    passwordGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    togglePassword: {
        marginLeft: 10,
    },
    toggleText: {
        color: '#007bff',
        fontSize: 14,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#333',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    },
    signupLink: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});
