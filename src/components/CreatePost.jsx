import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import usePreviewImage from "../hooks/usePreviewImage"; // Import your custom hook for image preview
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_CHAR = 500;
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const CreatePost =  () => {
    const user =  useRecoilValue(userAtom);
    const userId = user?._id;
  
    //console.log(userId);
    
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage(); // Use the custom hook for handling image
    const [isModalVisible, setModalVisible] = useState(false);
    const [postText, setPostText] = useState("");
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef();

    const toggleModal = () => {
        setModalVisible(!isModalVisible); // Toggle modal visibility
    };

    const handleTextChange = (text) => {
        if (text.length > MAX_CHAR) {
            setPostText(text.slice(0, MAX_CHAR));
            setRemainingChar(0);
        } else {
            setPostText(text);
            setRemainingChar(MAX_CHAR - text.length);
        }
    };

    const handleCreatePost = async () => {
        const token = await AsyncStorage.getItem("jwtToken");
        if (!token) {
            Alert.alert("Error", "You are not logged in. Please log in to create a post.");
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';

            // const response = await fetch(`${apiUrl}/api/users/login`
            // console.log({
            //     postedBy: userId,
            //     text: postText,
            //     img: imgUrl,
            // });

            const response = await fetch(`${apiUrl}/api/posts/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Add the token here
                },
                body: JSON.stringify({
                    postedBy: userId,
                    text: postText,
                    img: imgUrl,
                }),
            });

            const data = await response.json();

            if (data.error) {
                Alert.alert("Error", data.error);
                return;
            }

            Alert.alert("Success", "Post created successfully!");
            setPostText(""); // Reset post content
            setImgUrl(""); // Reset image
            toggleModal(); // Close modal
            console.log(data);
        } catch (error) {
            Alert.alert("Error", "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Create Post Button */}
            <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="create" size={24} color="white" />
            </TouchableOpacity>

            {/* Create Post Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Create Post</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Post content goes here..."
                            placeholderTextColor="#aaa"
                            maxLength={MAX_CHAR}
                            multiline={true}
                            value={postText}
                            onChangeText={handleTextChange}
                        />
                        <Text style={styles.remainingChar}>
                            {remainingChar}/{MAX_CHAR}
                        </Text>

                        <TouchableOpacity
                            style={styles.imageButton}
                            onPress={() => imageRef.current.click()}
                        >
                            <Text style={styles.imageButtonText}>📷 Add Image</Text>
                        </TouchableOpacity>

                        <input
                            type="file"
                            ref={imageRef}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />

                        {imgUrl && (
                            <View style={styles.imagePreview}>
                                <Image
                                    source={{ uri: imgUrl }}
                                    style={{ width: 100, height: 100 }}
                                />
                                <TouchableOpacity
                                    onPress={() => setImgUrl("")}
                                    style={styles.imageRemoveButton}
                                >
                                    <Text style={styles.imageRemoveText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.postButton}
                                onPress={handleCreatePost}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.postButtonText}>Post</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default CreatePost;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#1c1c1e",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 100,
        backgroundColor: "#333",
        borderRadius: 5,
        padding: 10,
        color: "#fff",
        marginBottom: 10,
    },
    remainingChar: {
        fontSize: 12,
        color: "#aaa",
        alignSelf: "flex-end",
    },
    imageButton: {
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    imageButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    imagePreview: {
        marginVertical: 10,
        alignItems: "center",
    },
    imageRemoveButton: {
        marginTop: 5,
    },
    imageRemoveText: {
        color: "red",
        fontSize: 12,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    postButton: {
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
    },
    postButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});


// import { AddIcon } from "@chakra-ui/icons";
// import {
//     Button,
//     CloseButton,
//     Flex,
//     FormControl,
//     Image,
//     Input,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     Text,
//     Textarea,
//     useColorModeValue,
//     useDisclosure,
// } from "@chakra-ui/react";
// import usePreviewImage from '../../hooks/usePreviewImage';
// import React, { useRef, useState } from 'react'
// import { BsFillImageFill } from "react-icons/bs";
// import { useParams } from "react-router-dom";
// import userAtom from "../../atoms/userAtom";
// import { useRecoilState, useRecoilValue } from "recoil";
// import useShowToast from "../../hooks/useShowToast";
// import postsAtom from "../../atoms/postsAtom";
// const MAX_CHAR = 500;

// const CreatePost = () => {

//     const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage()

//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const [postText, setPostText] = useState('');
//     const imageRef = useRef(null);
//     const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
//     const user = useRecoilValue(userAtom);
//     const showToast = useShowToast();
//     const [loading, setLoading] = useState(false);
// 	const { username } = useParams();
//     const [posts,setPosts] = useRecoilState(postsAtom)
//     const handleTextChange = (e) => {
//         const inputText = e.target.value;

//         if (inputText.length > MAX_CHAR) {
//             const truncatedText = inputText.slice(0, MAX_CHAR);
//             setPostText(truncatedText);
//             setRemainingChar(0);
//         } else {
//             setPostText(inputText);
//             setRemainingChar(MAX_CHAR - inputText.length);
//         }
//     };

//     const handleCreatePost = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch("/api/posts/create", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 //postedby , text and image is what we wrote in the "re.body" thing in backend , which is why we provide all those fields here
//                 body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
//             });

//             const data = await res.json();
//             if (data.error) {
//                 showToast("Error", data.error, "error");
//                 return;
//             }
//             showToast("Success", "Post created successfully", "success");
//             if (username === user.username) {
//                 setPosts([data, ...posts]);
//             }
//             onClose();
//             setPostText("");
//             setImgUrl("");
//         } catch (error) {
//             showToast("Error", error, "error");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <>
//             <Buttonara
//                 position={'fixed'}
//                 bottom={10}
//                 right={5}
//                 size={{base : "sm" , sm:"md"}}
//                 bg={useColorModeValue("gray.300", "gray.dark")}
//                 onClick={onOpen}
//             >
//              <AddIcon />
//             </Buttonara>
//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Create Post</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody pb={6}>
//                         <FormControl>
//                             <Textarea
//                                 placeholder='Post content goes here..'
//                                 onChange={handleTextChange}
//                                 value={postText}
//                             />
//                             <Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.800"}>
//                                 {remainingChar}/{MAX_CHAR}
//                             </Text>

//                             <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

//                             <BsFillImageFill
//                                 style={{ marginLeft: "5px", cursor: "pointer" }}
//                                 size={16}
//                                 onClick={() => imageRef.current.click()}
//                             />
//                         </FormControl>
//                         {imgUrl && (
//                             <Flex mt={5} w={"full"} position={"relative"}>
//                                 <Image src={imgUrl} alt='Selected img' />
//                                 <CloseButton
//                                     onClick={() => {
//                                         setImgUrl("");
//                                     }}
//                                     bg={"gray.800"}
//                                     position={"absolute"}
//                                     top={2}
//                                     right={2}
//                                 />
//                             </Flex>
//                         )}
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
//                             Post
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     )
// }

// export default CreatePost



