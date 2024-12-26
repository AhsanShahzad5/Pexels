import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Post from "../components/PostComponent";
import postsAtom from "../atoms/postsAtom";
import { useRecoilValue } from "recoil";
 const PostsSection = ({ posts }) => {
//const PostsSection = () => {
//const posts = useRecoilValue(postsAtom);
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.flatListContent}
      ListEmptyComponent={<Text style={styles.emptyText}>No posts to display.</Text>}
    />
  );
};

export default PostsSection;

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  emptyText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});
