import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
	const [input, setInput] = useState("");
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a new Chat",
			headerBackTitle: "Chats",
		});
	}, [navigation]);

	const createChat = async () => {
		try {
			const docRef = await addDoc(collection(db, "Chats"), {
				chatName: input,
			});
			console.log("Document written with ID: ", docRef.id);
			navigation.goBack();
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	return (
		<View style={styles.container}>
			<Input
				placeholder='Enter a chat Name'
				value={input}
				onChangeText={(text) => setInput(text)}
				leftIcon={
					<Icon name='wechat' type='antdesign' size={24} color='black' />
				}
			/>
			<Button title={"Create new Chat"} onPress={createChat} />
		</View>
	);
};

export default AddChatScreen;

const styles = StyleSheet.create({ container: {} });
