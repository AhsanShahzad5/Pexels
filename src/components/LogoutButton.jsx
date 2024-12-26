import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const navigation = useNavigation();
  const logout = useLogout();

  const handleLogout = async () => {
    console.log("logout");
    await logout();
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <AntDesign name="logout" color="white" size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent", // Transparent background
    padding: 10,
    borderRadius: 5, // Optional styling
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogoutButton;
