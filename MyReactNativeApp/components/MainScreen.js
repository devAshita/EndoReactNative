//MainScreen.js

import React from 'react';
import { StyleSheet, View, Button, Vibration, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();

  const handleOnPressImageUpload = () => {
    navigation.navigate('ImageUpload');
  };

  const handleOnPressVibration = () => {
    console.log('バイブレーション');
    console.log(Platform.OS);
    
    // AndroidとiOSでバイブレーションの実装を分ける
    if (Platform.OS === 'android') {
      console.log('動作環境:Android');
      Vibration.vibrate(5000); // 1000ミリ秒（1秒）のバイブレーション
    } else if (Platform.OS === 'ios') {
      console.log('動作環境:ios');
      // [Rest, Vibrate, Rest, Vibrate] パターンで10秒間バイブレーション
      const PATTERN = [100, 50, 100, 50];
      Vibration.vibrate(PATTERN, true);
      setTimeout(() => {
        Vibration.cancel();
      }, 10000);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="画像アップロード" onPress={handleOnPressImageUpload} />
      <Button title="バイブレーション" onPress={handleOnPressVibration} />
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
});
