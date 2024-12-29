import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const SuggestedUserItem = ({ item, onUserPress }) => {
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(item);

  return (
    <View style={styles.userItem}>
      {/* User Avatar */}
      {item.profilePic ? (
        <Image source={{ uri: item?.profilePic }} style={styles.avatar} />
      ) : (
        <View style={styles.placeholderAvatar}>
          <Text style={styles.avatarText}>{item?.username.charAt(0)}</Text>
        </View>
      )}

      {/* User Info */}
      <TouchableOpacity style={styles.userInfo} onPress={() => onUserPress(item._id)}>
        <View>
          <Text style={styles.fullName}>{item?.name}</Text>
          <Text style={styles.username}>{item?.username}</Text>
        </View>
      </TouchableOpacity>

      {/* Follow Button */}
      <TouchableOpacity
        style={styles.followButton}
        onPress={handleFollowUnfollow}
        disabled={updating}
      >
        <Text style={styles.followButtonText}>{following ? "Unfollow" : "Follow"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuggestedUserItem;

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  fullName: {
    fontSize: 14,
    color: "#aaa",
  },
  followButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
