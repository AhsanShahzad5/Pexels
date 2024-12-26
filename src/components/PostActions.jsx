import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import postsAtom from '../atoms/postsAtom';
import Svg, { Path, Line, Polygon } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Actions = ({ post }) => {
    const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';

    const user = useRecoilValue(userAtom);
    const [reply, setReply] = useState('');
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [liked, setLiked] = useState(post?.likes.includes(user?._id));
    const [isLiking, setIsLiking] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLikeAndUnlike = async () => {
        const token = await AsyncStorage.getItem("jwtToken");

        if (!user) return alert('You must be logged in to like a post');
        if (isLiking) return;
        console.log('--------------------------------------');
        console.log('--------------------------------------Postid:', post._id);

        setIsLiking(true);
        try {

            const res = await fetch(`${apiUrl}/api/posts/like/${post._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,

                },
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
                return;
            }
            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    const updatedLikes = liked
                        ? p.likes.filter((id) => id !== user._id)
                        : [...p.likes, user._id];
                    return { ...p, likes: updatedLikes };
                }
                return p;
            });
            setPosts(updatedPosts);
            setLiked(!liked);
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLiking(false);
        }
    };

    const handleReply = async () => {
        const token = await AsyncStorage.getItem("jwtToken");

        if (!user) return alert('You must be logged in to reply to a post');
        if (isReplying) return;

        setIsReplying(true);
        try {
            const res = await fetch(`${apiUrl}/api/posts/reply/${post._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: reply }),
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
                return;
            }
            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return { ...p, replies: [...p.replies, data] };
                }
                return p;
            });
            setPosts(updatedPosts);
            setReply('');
            setModalVisible(false);
            alert('Reply posted successfully');
        } catch (error) {
            alert(error.message);
        } finally {
            setIsReplying(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.actionsRow}>
                <TouchableOpacity onPress={handleLikeAndUnlike} disabled={isLiking}>
                    <Svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 22"
                        fill={liked ? 'rgb(237, 73, 86)' : 'white'}
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <Path d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="white"
                    >
                        <Path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
                    </Svg>
                </TouchableOpacity>
                {/* <RepostSVG />
                <ShareSVG /> */}
            </View>

            <View style={styles.statsRow}>
                <Text style={styles.statsText}>{post?.replies.length} replies</Text>
                <View style={styles.divider} />
                <Text style={styles.statsText}>{post?.likes.length} likes</Text>
            </View>

            <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Reply goes here.."
                            placeholderTextColor="gray"
                            value={reply}
                            onChangeText={setReply}
                        />
                        <TouchableOpacity
                            style={styles.replyButton}
                            onPress={handleReply}
                            disabled={isReplying}
                        >
                            {isReplying ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.replyButtonText}>Reply</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// const RepostSVG = () => (
//     <Svg width="20" height="20" viewBox="0 0 24 24" fill="white">
//         <Path d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Z" />
//     </Svg>
// );

// const ShareSVG = () => (
//     <Svg width="20" height="20" viewBox="0 0 24 24" fill="white">
//         <Line x1="22" x2="9.218" y1="3" y2="10.083" stroke="currentColor" strokeWidth="2" />
//         <Polygon
//             points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
//             stroke="currentColor"
//             strokeWidth="2"
//         />
//     </Svg>
// );

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 },
    statsRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    statsText: { color: 'gray', fontSize: 12 },
    divider: { width: 2, height: 2, backgroundColor: 'gray', borderRadius: 1 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '90%',
        backgroundColor: '#2C3E50',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#34495E',
        borderRadius: 5,
        padding: 10,
        color: 'white',
        marginBottom: 15,
    },
    replyButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    replyButtonText: { color: 'white', fontWeight: 'bold' },
    closeButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: { color: 'white', fontWeight: 'bold' },
});

export default Actions;
