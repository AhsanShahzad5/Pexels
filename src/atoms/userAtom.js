// // this will keep context if user is loggged in or not

// import { atom } from "recoil";

// const userAtom = atom({
//     key: 'userAtom',
//     default : JSON.parse(localStorage.getItem('pexels'))
// })

// export default userAtom;



// // this will keep context if user is loggged in or not

// import { atom } from "recoil";

// const userAtom = atom({
//     key: 'userAtom',
//     default : JSON.parse(localStorage.getItem('MAD'))
// })

// export default userAtom;

import { atom } from "recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize userAtom with data from AsyncStorage
const userAtom = atom({
    key: 'userAtom',
    default: null, // Default to null if no user is logged in
    effects: [
        ({ setSelf, onSet }) => {
            // Load stored user data on initialization
            const loadUser = async () => {
                const savedUser = await AsyncStorage.getItem('user-data');
                if (savedUser) {
                    setSelf(JSON.parse(savedUser));
                }
            };
            loadUser();

            // Save updated user data to AsyncStorage
            onSet(async (newUser) => {
                if (newUser) {
                    await AsyncStorage.setItem('user-data', JSON.stringify(newUser));
                } else {
                    await AsyncStorage.removeItem('user-data');
                }
            });
        },
    ],
});

export default userAtom;
