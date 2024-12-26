import React , {useState , useEffect} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const suggestedUsers2 = [
    { id: 1, username: "hamza_", fullName: "Hamza Shahzad", avatar: null },
    { id: 2, username: "Farooq", fullName: "Mohsin", avatar: null },
    { id: 3, username: "TommyXX", fullName: "Tommy", avatar: null },
    { id: 4, username: "Elon_nerd", fullName: "Elon Musk", avatar: "https://i.imgur.com/elon.jpg" }, // Example avatar URL
];

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
                    }
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

console.log(suggestedUsers);
console.log(suggestedUsers2);



    const handleUserPress = (userId) => {
        // Logic for navigating to the user's profile
        console.log(`Navigating to profile of user with ID: ${userId}`);
        //navigation.navigate("UserProfile", { userId });
        navigation.navigate("Profile", { user: userId });

    };

    const handleFollowPress = (userId) => {
        // Logic for following the user
        console.log(`Follow button pressed for user with ID: ${userId}`);
    };

    const renderUserItem = ({ item }) => (
        <View style={styles.userItem}>
            {/* User Avatar */}
            {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
                <View style={styles.placeholderAvatar}>
                    <Text style={styles.avatarText}>{item.username.charAt(0)}</Text>
                </View>
            )}

            {/* User Info */}
            <TouchableOpacity style={styles.userInfo} onPress={() => handleUserPress(item.id)}>
                <View>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.fullName}>{item.fullName}</Text>
                </View>
            </TouchableOpacity>

            {/* Follow Button */}
            <TouchableOpacity
                style={styles.followButton}
                onPress={() => handleFollowPress(item.id)}
            >
                <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suggested Users</Text>
            <FlatList
                data={suggestedUsers2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUserItem}
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
