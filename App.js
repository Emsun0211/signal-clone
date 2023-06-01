import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import UpdateScreen from "./screens/UpdateScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

export default function App() {
	const Stack = createNativeStackNavigator();
	const globalScreenOPtion = {
		headerStyle: { backgroundColor: "#2c6bed" },
		headerTitleStyle: { color: "white" },
		headerTintColor: "white",
	};
	return (
		<NavigationContainer>
			<Stack.Navigator
				// initialRouteName='Home'
				screenOptions={globalScreenOPtion}>
				<Stack.Screen name='Login' component={LoginScreen} />
				<Stack.Screen name='Register' component={RegisterScreen} />
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='Update' component={UpdateScreen} />
				<Stack.Screen name='AddChat' component={AddChatScreen} />
				<Stack.Screen name='Chat' component={ChatScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
