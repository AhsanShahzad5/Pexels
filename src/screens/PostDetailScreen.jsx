import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Actions from "../components/PostActions";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import Footer from "../components/Footer";

const PostDetailsScreen = ({ route }) => {
  const user = useRecoilValue(userAtom);
  const { post } = route.params; // Receive the post data from navigation
  const { loading, user: postUser } = useGetUserProfile(post.postedBy);
  const [formattedDate, setFormattedDate] = useState("");
  const [replies, setReplies] = useState(post.replies || []); // Local state for replies

  useEffect(() => {
    if (post.createdAt) {
      const date = new Date(post.createdAt).toDateString();
      setFormattedDate(date);
    }
  }, [post.createdAt]);

  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <>
      
  
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Post Header */}
      <TouchableOpacity onPress={() => navigation.navigate("Profile", { user: postUser })}>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: postUser?.profilePic || "https://via.placeholder.com/40" }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{postUser?.username || "Unknown"}</Text>
            <Text style={styles.subtitle}>{formattedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Post Content */}
      <View style={styles.postContent}>
        <Text style={styles.postText}>{post.text}</Text>
        {post.img && (
          <Image source={{ uri: post.img }} style={styles.postImage} resizeMode="cover" />
        )}
      </View>

      {/* Post Actions */}
      <View style={{ padding: 10 }}>
        <Actions post={post} />
      </View>

      {/* Replies Section */}
      <View style={styles.repliesSection}>
        <Text style={styles.repliesTitle}>Replies</Text>
        {replies.map((reply, index) => (
          <View key={index} style={styles.reply}>
            <Text style={styles.replyUsername}>{reply.username}</Text>
            <Text style={styles.replyText}>{reply.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    <Footer />
    </>

  );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 20,
    minHeight: "100%",  // Ensure it takes up the full screen height

    // overflow:"visible"
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
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
    padding: 10,
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
  repliesSection: {
    marginBottom: 20,
    padding: 10,
  },
  repliesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  reply: {
    marginBottom: 15,
  },
  replyUsername: {
    fontWeight: "bold",
    color: "white",
  },
  replyText: {
    color: "white",
  },
});
