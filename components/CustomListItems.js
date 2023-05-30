import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";

const CustomListItems = ({ id, chatName, enterChat }) => {
	return (
		// List items from rneui
		<ListItem>
			<Avatar
				rounded
				source={{
					uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssi7y7FIvHybEXvcKap4tQB4h71JgW555jlRUCp1u&s",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: "800" }}>
					Youtube Chat
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
					This is a test subtitle This is a test subtitle This is a test
					subtitle This is a test subtitle This is a test subtitle
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItems;

const styles = StyleSheet.create({});
