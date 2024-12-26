import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostsSection from "../components/PostsSection";
import { useRecoilValue, useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import postsAtom from "../atoms/postsAtom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const Profile = ({ route }) => {
  const currentUser = useRecoilValue(userAtom);
  const user = route?.params?.user || currentUser;
  const { user: userData, loading } = useGetUserProfile(user);
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(userData);

  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      if (!userData?.username) {
        setPosts([]); // Handle the case when there is no valid username
        return;
      }
      setFetchingPosts(true);
      try {
        const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/posts/user/${userData?.username}`);
        console.log("Inside API CALL for:", userData?.username);
        const data = await res.json();
        setPosts(data); // Set posts data
      } catch (error) {
        console.log("Error fetching posts:", error.message);
        setPosts([]); // Clear posts on error
      } finally {
        setFetchingPosts(false);
      }
    };

    if (userData?.username) {
      getPosts(); // Fetch posts if username exists
    }
  }, [userData, setPosts]);

  if (loading || fetchingPosts) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: userData?.profilePic || "https://via.placeholder.com/40",
            }}
            style={styles.avatarContainer}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{userData?.name}</Text>
            <Text style={styles.userHandle}>{userData?.username}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          {currentUser._id === userData?._id ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleFollowUnfollow} >
              <Text style={styles.buttonText}>
                {following ? "Unfollow" : "Follow"}
              </Text>
            </TouchableOpacity>
          )}
          <Text style={styles.followersText}>Followers:</Text>
          <Text style={styles.followersText}>{userData?.followers.length || 0}</Text>
          <Text style={styles.followersText}>Following:</Text>
          <Text style={styles.followersText}>{userData?.following.length || 0}</Text>
        </View>
      </View>

      {/* Posts Section */}
      <PostsSection posts={posts} />

      {/* Footer */}
      <Footer />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  profileContainer: {
    padding: 20,
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    margin: 10,
    marginBottom: 0,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    marginLeft: 10,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userHandle: {
    color: "#aaa",
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  followersText: {
    color: "#fff",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
