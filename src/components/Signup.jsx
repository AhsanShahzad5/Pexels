import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function Signup({ navigation }) {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChangeFunction = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // const handleSignup = async (e) => {
    //     e.preventDefault();
    //     console.log('Form Data:', formData);
    //     navigation.navigate('Home');
    // };

    const handleSignup = async () => {
        setLoading(true);

        try {
            const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';

            const res = await fetch(`${apiUrl}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert("Success", "User created successfully! Please log in.");
                setFormData({
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                });

                navigation.navigate('Login');
            } else {
                Alert.alert("Signup Failed", data.error || "An unknown error occurred.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to connect to the server. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const { name, username, email, password } = formData;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}

            <ScrollView contentContainerStyle={styles.card}>
                <Text style={styles.heading}>Sign up</Text>

                {/* Full Name */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={(value) => onChangeFunction('name', value)}
                    />
                </View>

                {/* Username */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={(value) => onChangeFunction('username', value)}
                    />
                </View>

                {/* Email */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(value) => onChangeFunction('email', value)}
                    />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(value) => onChangeFunction('password', value)}
                        />
                        {/* <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.icon}
                        >
                            <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={15} />
                        </TouchableOpacity> */}
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                {/* Login Link */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>
                        Already a user? <Text style={styles.linkHighlight}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 20,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        color: '#333',
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        height: 45,
    },
    passwordContainer: {
        flex: 0.6,
       // flexDirection: 'row',
        //alignItems: 'center',
    },
    // icon: {
    //     marginLeft: 5,
    // },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        textAlign: 'center',
        color: '#666',
        marginTop: 10,
    },
    linkHighlight: {
        color: '#4a90e2',
        fontWeight: 'bold',
    },
});
