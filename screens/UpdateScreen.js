import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../firebase";
import { getAuth, updateProfile } from "firebase/auth";

const UpdateScreen = () => {
	const [imgUrl, setImgUrl] = useState("");
	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [name, setName] = useState("");

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		const source = { uri: result.assets[0].uri };
		console.log(source);

		setImage(source);
	};

	const uploadImage = async () => {
		setUploading(true);

		const response = await fetch(image.uri);

		const blob = response.blob();

		const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);

		var ref = auth.storage().ref().child(filename).put(blob);

		try {
			await ref;
		} catch (e) {
			console.log(e);
		}

		setUploading(false);

		Alert.alert("Photo uploaded!");

		setImage(null);
	};
	useEffect(() => {
		const auth = getAuth();
		updateProfile(auth.currentUser, {
			displayName: "Jane Q. User",
			photoURL: "https://example.com/jane-q-user/profile.jpg",
		})
			.then(() => {
				console.log("Photo uploaded!");
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View style={styles.container}>
			<Text h3 style={{ marginBottom: 50 }}>
				Update Profile
			</Text>
			{/* <View style={styles.inputContainer}>
				<Input
					placeholder='Full Name'
					autoFocus
					type='text'
					value={name}
					onChangeText={(text) => setName(text)}
				/>
			</View> */}
			<TouchableOpacity style={styles.selectButton} onPress={pickImage}>
				<Text style={styles.btnText}>Pick an Image</Text>
			</TouchableOpacity>
			<View style={styles.imageContainer}>
				{image && (
					<View>
						<Image
							source={{ uri: image.uri }}
							style={{ width: 300, height: 300 }}
						/>
						{/* <Text style={{ color: "red" }}>{image.uri}</Text> */}
					</View>
				)}

				<TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
					<Text style={styles.btnText}>Upload Image</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default UpdateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {},
	selectButton: {
		width: 200,
		padding: 20,
		backgroundColor: "#00ccbb",
		borderRadius: 20,
		marginBottom: 20,
	},
	imageContainer: {
		width: 200,
		padding: 20,
		backgroundColor: "blue",
		borderRadius: 20,
	},
	uploadButton: {},
	btnText: {},
});
