import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import CustomListItems from "../components/CustomListItems";
import { Avatar } from "@rneui/themed";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
	const signOut = () => {
		auth.signOut().then(() => {
			navigation.replace("Login");
		});
	};
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
	return (
		<SafeAreaView>
			<ScrollView>
				<CustomListItems />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
