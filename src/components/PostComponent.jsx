import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useGetUserProfile from "../hooks/useGetUserProfile"; // Import the hook
import Actions from "./PostActions";

const Post = ({ post }) => {
  const navigation = useNavigation();
  const { img, text, postedBy, createdAt, likes  } = post;

  // Use the hook to fetch user details
  const { loading, user } = useGetUserProfile(postedBy);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile", { user:postedBy })}
      >
        <View style={styles.postHeader}>
          <Image
            source={{
              uri: user?.profilePic || "https://via.placeholder.com/40",
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user?.username || "Unknown"}</Text>
            <Text style={styles.subtitle}>
              {new Date(createdAt).toDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Post Content */}
      <TouchableOpacity
        onPress={() => navigation.navigate("PostDetailsScreen", { post:post })}
      >
        <View style={styles.postContent}>
          <Text style={styles.postText}>{text}</Text>
          {img && (
            <Image
              source={{ uri: img }}
              style={styles.postImage}
              resizeMode="cover"
            />
          )}
        </View>
        <Actions post={post} />
      </TouchableOpacity>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#111",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  loadingContainer: {
    backgroundColor: "#111",
    marginBottom: 10,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 12,
  },
  postContent: {
    marginBottom: 20,
  },
  postText: {
    color: "#fff",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#444",
  },
});
