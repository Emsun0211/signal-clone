import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Button, Text } from "@rneui/themed";
import { auth } from "../firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Back to Login",
		});
	}, [navigation]);

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				await updateProfile(auth.currentUser, {
					displayName: name, // Set the user's name
					photoURL:
						imgUrl ||
						"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png", // Set the user's photo URL
				})
					.then(() => {
						// Profile updated successfully
						console.log("User profile updated");

						// Additional actions after successful registration and profile update
					})
					.catch((error) => {
						// An error occurred while updating the profile
						console.error("Error updating user profile:", error);
					});
				// console.log(auth.currentUser);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				alert(errorMessage);
			});
	};
	return (
		<View behavior='padding' style={styles.container}>
			<StatusBar style='light' />
			<Text h3 style={{ marginBottom: 50 }}>
				Create a Signal Account
			</Text>
			<View style={styles.inputContainer}>
				<Input
					placeholder='Full Name'
					autoFocus
					type='text'
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<Input
					placeholder='Email'
					type='email'
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder='Password'
					type='password'
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>

				<Input
					placeholder='Profile Picture URL [Optional]'
					type='text'
					value={imgUrl}
					onChangeText={(text) => setImgUrl(text)}
					onSubmitEditing={register}
				/>
			</View>
			<Button
				raised
				containerStyle={styles.button}
				title={"Register"}
				onPress={register}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "#fff",
	},
	inputContainer: {
		width: 300,
	},
	button: {
		width: 200,
		marginTop: 10,
		marginBottom: 20,
	},
});

export default RegisterScreen;
