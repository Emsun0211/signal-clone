import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const signIn = () => {
		// const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorCode + " " + errorMessage);
			});
	};

	// Creating a signed in user
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			console.log(authUser);
			if (authUser) {
				navigation.replace("Home");
			}
		});

		return unsubscribe;
	}, []);

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style='light' />
			<Image
				source={{
					// uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
					uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwwMn124Xr9eLp-pJPUy22DX2NIcpQzarWO2kfxY&s",
				}}
				style={{ width: 180, height: 180 }}
			/>
			<View style={styles.inputContainer}>
				<Input
					placeholder='Email'
					autoFocus
					type='email'
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder='Password'
					secureTextEntry
					type='password'
					value={password}
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={signIn}
				/>
			</View>
			<Button title={"Login"} containerStyle={styles.button} onPress={signIn} />
			<Button
				onPress={() => navigation.navigate("Register")}
				title={"Register"}
				containerStyle={styles.button}
				type='outline'
			/>
			{/* <View style={{ height: 100 }}></View> */}
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},

	inputContainer: {
		width: 300,
		marginTop: 10,
	},
	button: {
		width: 200,
		marginTop: 10,
	},
});

export default LoginScreen;
