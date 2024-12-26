import React from "react";
import { View, Image, StyleSheet, Text , TouchableOpacity } from "react-native";
import favicon from "../../assets/favicon.png";
import LogoutButton from "./LogoutButton";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                {/* Centered Image */}
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image
                    source={favicon} // Replace with your image URL
                    style={styles.logo}
                />
                </TouchableOpacity>
                <Text style={styles.pexels}>Pexels</Text>

                <LogoutButton />
            </View>
            {/* White Line Below */}
            <View style={styles.line} />
            
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        backgroundColor: "#000", // Background color
        // alignItems: "center", // Center content horizontally
        paddingBottom: 7, // Add padding to avoid overlap
    },
    pexels:{
        color: "white",
        fontSize: 25,
        paddingTop: 6,
        fontWeight: "bold"
    },
    innerContainer:
    {
        paddingHorizontal: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logo: {
        width: 40, // Adjust width as needed
        height: 40, // Adjust height as needed
        resizeMode: "contain",
    },
    line: {
        marginTop: 10, // Space between image and line
        width: "100%", // Full width of the screen
        height: 1, // Line thickness
        backgroundColor: "#fff", // White color for the line
    },
});
