import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuggestedUserItem from "../components/SuggestedUserItem";
import { useNavigation } from "@react-navigation/native";

const SuggestedUsers = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const getSuggestedUsers = async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      setLoading(true);
      try {
        const apiUrl = process.env.API_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/users/suggested`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.error) {
          console.error("Error:", data.error);
          return;
        }
        setSuggestedUsers(data);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getSuggestedUsers();
  }, []);

  const handleUserPress = (userId) => {
    navigation.navigate("Profile", { user: userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Users</Text>
      <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item?._id?.toString()}
        renderItem={({ item }) => (
          <SuggestedUserItem item={item} onUserPress={handleUserPress} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SuggestedUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
});
