import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import {
	AntDesign,
	SimpleLineIcons,
	FontAwesome,
	Ionicons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import {
	collection,
	addDoc,
	doc,
	getDocs,
	orderBy,
	serverTimestamp,
	query,
	onSnapshot,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const { id, chatName } = route.params;
	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Chat`,
			headerTitleAlign: "left",
			headerBackTitleVisible: false,
			headerLeft: null,
			headerTitle: () => (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Avatar
						rounded
						source={{
							uri:
								messages[0]?.data.photoURL ||
								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssi7y7FIvHybEXvcKap4tQB4h71JgW555jlRUCp1u&s",
						}}
					/>
					<Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
						{chatName}
					</Text>
				</View>
			),
			headerTitleLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 10 }}
					onPress={navigation.goBack}>
					<AntDesign name='arrowleft' size={24} color='white' />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 80,
						marginRight: 20,
					}}>
					<TouchableOpacity>
						<FontAwesome name='video-camera' size={24} color='white' />
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons name='call' size={24} color='white' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation, messages]);
	const sendMessage = async () => {
		Keyboard.dismiss();
		try {
			const chatRef = doc(db, "Chats", id);

			const messagesRef = collection(chatRef, "Messages");

			const message = addDoc(messagesRef, {
				message: input,
				displayName: auth.currentUser.displayName,
				email: auth.currentUser.email,
				photoURL: auth.currentUser.photoURL,
				timestamp: serverTimestamp(),
			});

			console.log(message);
		} catch (error) {
			alert(error.message);
		}
		setInput("");
	};

	useEffect(() => {
		const chatRef = doc(db, "Chats", id);
		const q = query(
			collection(chatRef, "Messages"),
			orderBy("timestamp", "desc")
		);

		// console.log(q);
		const unsubscribe = onSnapshot(q, (querySnapShot) => {
			let messages = [];
			querySnapShot.forEach((message) => {
				messages.push({ data: message.data(), id: message.id });
			});

			setMessages(messages);
		});

		return () => unsubscribe();
	}, [route]);

	// console.log(messages);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={90}>
				<>
					{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
					<ScrollView contentContainerStyle={{ paddingTop: 15 }}>
						{messages.map(({ id, data }) =>
							data.email === auth.currentUser.email ? (
								<View key={id} style={styles.reciever}>
									<Avatar
										rounded
										size={30}
										position='absolute'
										bottom={-15}
										right={-5}
										containerStyle={{
											position: "absolute",
											bottom: -15,
											right: -5,
										}}
										source={{ uri: data.photoURL }}
									/>
									<Text style={styles.recieverText}>{data.message}</Text>
								</View>
							) : (
								<View key={id} style={styles.sender}>
									<Avatar
										rounded
										size={30}
										position='absolute'
										bottom={-15}
										left={-5}
										containerStyle={{
											position: "absolute",
											bottom: -15,
											left: -5,
										}}
										source={{ uri: data.photoURL }}
									/>
									<Text style={styles.senderText}>{data.message}</Text>
									<Text style={styles.senderName}>{data.displayName}</Text>
								</View>
							)
						)}
					</ScrollView>
					<View style={styles.footer}>
						<TextInput
							value={input}
							onChangeText={(text) => setInput(text)}
							placeholder='Signal Message'
							style={styles.textinput}
							onSubmitEditing={sendMessage}
						/>
						<TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
							<Ionicons name='send' size={24} color='#2b68e6' />
						</TouchableOpacity>
					</View>
					{/* </TouchableWithoutFeedback> */}
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	textinput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,

		backgroundColor: "#ececec",
		padding: 10,
		color: "grey",
		borderRadius: 30,
	},
	reciever: {
		padding: 10,
		backgroundColor: "#ececec",
		alignSelf: "flex-end",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	sender: {
		padding: 10,
		backgroundColor: "#2b68e6",
		alignSelf: "flex-start",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	senderName: {
		left: 10,
		paddingRight: 10,
		fontSize: 10,
		color: "white",
	},
	senderText: {
		color: "white",
		fontWeight: "500",
		marginLeft: 10,
		marginBottom: 15,
	},
	recieverText: {
		color: "#2b68e6",
		fontWeight: "500",
		marginRight: 10,
		marginBottom: 15,
	},
});
