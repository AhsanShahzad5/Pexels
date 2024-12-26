import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';
const useLogout = () => {
	const setUser = useSetRecoilState(userAtom);
//	const showToast = useShowToast();

	const logout = async () => {
		try {
			const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';

			
			const res = await fetch(`${apiUrl}/api/users/logout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
//				showToast("Error", data.error, "error");
				return;
			}
			
			AsyncStorage.removeItem("user-data");
			setUser(null);
		} catch (error) {
			//showToast("Error", error, "error");
		}
	};

	return logout;
};

export default useLogout;