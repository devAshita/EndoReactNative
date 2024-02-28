//LoginForm.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../providers/AuthContext.js';
import { NavigationHelpersContext } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function LoginForm() {
  const [data, setData] = useState('');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useAuth();
  const navigation = useNavigation();

  const apiUrl = 'http://13.115.60.102/MyLaravel/api/';


  const handleLogin = () => {
	console.log('ログイン処理開始');
	const userData = {
		name: name,
		password: password,
	};

	axios.post('http://13.115.60.102/MyLaravel/api/login', userData)
		.then((response) => {
			console.log('ログインしました。');
			login(response.data['user']);
			console.log(response.data['user'].name);
			navigation.navigate('MainScreen');
		})
		.catch((error) => {
			console.error('エラー:', error);
			// navigation.navigate('Login');
		});
  }

useEffect(() => {
    // データを取得するためのGETリクエストを送信
    axios.get(apiUrl + 'data')
      .then((response) => {
        // レスポンスからデータを取得し、stateにセット
        setData(response.data);
      })
      .catch((error) => {
        console.error('エラー:', error);
      });
  }, []);

  return (
	<View style={styles.container}>

		<Text>response:{data.response}</Text>
		<Text>名前</Text>
		<TextInput
			style={styles.input}
			placeholder="名前を入力"
			onChangeText={setName}
			value={name}
		/>
		<Text>パスワード</Text>
		<TextInput
			style={styles.input}
			placeholder="パスワードを入力"
			onChangeText={setPassword}
			value={password}
			secureTextEntry
		/>
		<TouchableOpacity style={styles.button} onPress={handleLogin} >
			<Text style={styles.buttonText}>Login</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.button}>
			<Text style={styles.buttonText}>顔認証</Text>
		</TouchableOpacity>


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
	input: {
	  width: 200,
	  height: 40,
	  borderColor: 'gray',
	  borderWidth: 1,
	  marginBottom: 10,
	  paddingLeft: 5,
	},
	button: {
	  backgroundColor: 'gray',
	  padding: 10,
	  borderRadius: 5,
	},
	buttonText: {
	  color: 'white',
	  fontWeight: 'bold',
	},
  });