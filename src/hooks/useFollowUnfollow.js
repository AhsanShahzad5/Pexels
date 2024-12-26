import { useState } from "react";
import { useRecoilValue } from "recoil";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useFollowUnfollow = (user) => {
	const currentUser = useRecoilValue(userAtom);
	const [following, setFollowing] = useState(user?.followers.includes(currentUser?._id));
	const [updating, setUpdating] = useState(false);
	//const showToast = useShowToast();

	const handleFollowUnfollow = async () => {
		const token = await AsyncStorage.getItem("jwtToken");

		if (!currentUser) {
			console.log("Error: Please login to follow");
			return;
		}
		if (updating) return;

		setUpdating(true);
		try {
			const apiUrl = process.env.API_BASE_URL || "http://localhost:8000";
			const res = await fetch(`${apiUrl}/api/users/follow/${user._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			if (data.error) {
				console.log("Error:", data.error);
				return;
			}

			if (following) {
				console.log("Success", `Unfollowed ${user.name}`);
				user.followers.pop(); // simulate removing from followers
			} else {
				console.log("Success", `Followed ${user.name}`);
				user.followers.push(currentUser?._id); // simulate adding to followers
			}
			setFollowing(!following);

			//console.log(data);
		} catch (error) {
			console.log("Error", error);
		} finally {
			setUpdating(false);
		}
	};

	return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;