import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pexels!</Text>
      <Text style={styles.subtitle}>
        Share your creativity with the world. Post, discover, and connect with fellow artists.
      </Text>
      <Button
        title="Next"
        color="#2ecc71"
        onPress={() => navigation.navigate("OnboardingScreen2")}
      />
    </View>
  );
};

export default OnboardingScreen1;

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
});
