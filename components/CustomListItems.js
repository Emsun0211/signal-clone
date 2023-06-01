import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "../firebase";

const CustomListItems = ({ id, chatName, enterChat }) => {
	const [chatMessages, setChatMessages] = useState([]);

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
				messages.push(message.data());
			});
			setChatMessages(messages);
		});

		return () => unsubscribe();
	}, []);
	return (
		// List items from rneui
		<ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
			<Avatar
				rounded
				source={{
					uri:
						chatMessages[0]?.photoURL ||
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssi7y7FIvHybEXvcKap4tQB4h71JgW555jlRUCp1u&s",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: "800" }}>
					{chatName}
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
					{chatMessages && chatMessages?.[0]?.displayName} :
					{chatMessages && chatMessages?.[0]?.message}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItems;

const styles = StyleSheet.create({});
