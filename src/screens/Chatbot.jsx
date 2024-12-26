import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Chatbot = () => {
  return (
    <View style={styles.container}>
      {/* Chatbot Header */}
      <View style={styles.chatbotInfo}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with chatbot image URL
          style={styles.chatbotImage}
        />
        <Text style={styles.chatbotTitle}>
          Meet <Text style={styles.chatbotName}>Pexel Ai</Text>
        </Text>
        <Text style={styles.chatbotDescription}>
         Generate images with the help of AI
        </Text>
      </View>

      {/* Chat Input */}
      <View style={styles.chatInputSection}>
        <TextInput
          placeholder="Write here"
          placeholderTextColor="#aaa"
          style={styles.chatInput}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
    justifyContent: 'space-between',
  },
  chatbotInfo: {
    alignItems: 'center',
    marginTop: 50,
  },
  chatbotImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  chatbotTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chatbotName: {
    color: "#00aaff", // Highlight for chatbot name
  },
  chatbotDescription: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  chatInputSection: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#222",
  },
  chatInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#00aaff",
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
});
