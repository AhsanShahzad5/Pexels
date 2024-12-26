import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import CreatePost from "../components/CreatePost";

export default function Footer() {
  const user = useRecoilValue(userAtom);
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate("Home");
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile", { user: user._id });
  };

  const handleChatPress = () => {
    navigation.navigate("Chatbot");
  };

  const handleSuggestedUsers = () => {
    navigation.navigate("SuggestedUsers");
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress}>
        <Entypo name="home" size={24} color="white" />
      </TouchableOpacity>
      <CreatePost />
      <TouchableOpacity onPress={handleChatPress}>
        <AntDesign name="wechat" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSuggestedUsers}>
        <AntDesign name="adduser" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress}>
        <FontAwesome name="user" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#000",
  },
});
