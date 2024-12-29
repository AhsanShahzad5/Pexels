import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const OnboardingScreen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Art Generation</Text>
      <Text style={styles.subtitle}>
        Give life to your ideas! Enter a text prompt and let our AI create stunning art for you.
      </Text>
      <Button
        title="Next"
        color="#2ecc71"
        onPress={() => navigation.navigate("OnboardingScreen3")}
      />
    </View>
  );
};

export default OnboardingScreen2;

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
