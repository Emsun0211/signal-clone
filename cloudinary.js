// import React from "react";
// import { View, Button } from "react-native";
import axios from "axios";

export const uploadImage = async (image) => {
	// Set your Cloudinary cloud name, upload preset, and API endpoint
	const cloudName = "dxz1djlc2";
	const uploadPreset = "chatsignal";
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

	// Select an image from the device's gallery using a suitable image picker library

	// Perform any necessary image preprocessing or conversion (e.g., resizing, encoding)

	// Create a FormData object to hold the image data
	const data = new FormData();
	data.append("file", {
		uri: image, // Replace with the URI of the selected image
		type: "image/jpeg", // Adjust the type based on your image format
	});
	data.append("upload_preset", uploadPreset);

	try {
		// Send the image data to Cloudinary
		const response = await axios.post(url, data);

		// Handle the response as needed (e.g., extract the uploaded image URL)
		const imageUrl = response.data.secure_url;
		console.log("Uploaded image URL:", imageUrl);
		return imageUrl;
	} catch (error) {
		// Handle the error
		console.error("Error uploading image:", error);
	}
};

// const CloudinaryUpload = () => {

// 	return (
// 		<View>
// 			<Button title='Upload Image' onPress={uploadImage} />
// 		</View>
// 	);
// };

// export default CloudinaryUpload;
