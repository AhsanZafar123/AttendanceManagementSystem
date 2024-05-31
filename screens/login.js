import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const BlueBar = () => (
  <View style={styles.blueBar} /> // Blue bar
);

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make an API call to authenticate user
      const response = await fetch('http://192.168.18.16:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Authentication successful
        // Log the token to the console
        console.log('JWT:', data.token);
        // Handle successful login, e.g., navigate to the home screen
        navigation.navigate('Dashboard');
      } else {
        // Authentication failed
        Alert.alert('Error', data.message); // Display error message from the backend
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Failed to login. Please try again later.');
      // Handle other errors
    }
  };

  return (
    <View style={styles.container}>
      <BlueBar />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Attendance System</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={handleLogin}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onSubmitEditing={handleLogin}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Changed background color to white
  },
  blueBar: {
    height: 50,
    backgroundColor: '#007bff', // Blue color
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007bff', // Changed title color to blue
    textAlign: 'center', // Center align the title
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2', // Changed input field background color
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default LoginScreen;