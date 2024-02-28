//ImageUpload.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import axios from 'axios';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const apiUrl = 'http://13.115.60.102/MyLaravel/api/';

  useEffect(() => {
    // コンポーネントがマウントされたときに位置情報を取得する
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(location);
  };

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access camera roll was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

	console.log(result.assets[0].uri);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUploadPhoto = () => {
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpeg', 
      name: 'photo.jpg', 
    });

    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    // 位置情報を含めてアップロードする
    formData.append('latitude', location.coords.latitude);
    formData.append('longitude', location.coords.longitude);

    axios.post(apiUrl + 'image_upload', formData)
      .then(console.log('アップロード処理'))
      .then(response => {
        console.log('Upload successful:', response.data);
        // 画像のアップロードに成功した場合の処理
      })
      .catch(error => {
        console.error('Upload failed:', error);
        // 画像のアップロードに失敗した場合の処理
      });
  };

  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <Button title="Upload Photo" onPress={handleUploadPhoto} disabled={!image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
