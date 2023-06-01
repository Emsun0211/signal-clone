import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItems from "../components/CustomListItems";
import { Avatar } from "@rneui/themed";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
	const [Chats, setChats] = useState([]);
	const signOut = () => {
		auth.signOut().then(() => {
			navigation.replace("Login");
		});
	};

	// Editing the layout header
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<View style={{ marginRight: 5 }}>
					<TouchableOpacity activeOpacity={0.5} onPress={signOut}>
						<Avatar
							rounded
							source={{
								uri:
									auth?.currentUser?.photoURL ||
									"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssi7y7FIvHybEXvcKap4tQB4h71JgW555jlRUCp1u&s",
							}}
						/>
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 80,
						marginRight: 20,
					}}>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign name='camerao' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.navigate("AddChat")}>
						<SimpleLineIcons name='pencil' size={24} color='black' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	// Fetching Chats from firestore
	useEffect(() => {
		const querySnapshot = async () => {
			const chatList = await getDocs(collection(db, "Chats"));

			const gottenChats = [];
			chatList.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()}`);
				gottenChats.push({ id: doc.id, data: doc.data() });
			});
			setChats(gottenChats);
		};

		querySnapshot();
	}, []);

	const enterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			id,
			chatName,
		});
	};
	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{Chats.map(({ id, data: { chatName } }) => (
					<CustomListItems
						id={id}
						chatName={chatName}
						key={id}
						enterChat={enterChat}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
