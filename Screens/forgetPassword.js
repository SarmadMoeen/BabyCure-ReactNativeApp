import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AdvanceLB } from "../component/AdvanceLB";
import { AuthContext } from "../AuthContexts/AuthContext";
import axios from "axios";

const ForgetPassword = ({ navigation }) => {
  const { recentUserId } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = () => {
    if (!recentUserId) {
      console.error('No recent user ID available');
      return;
    }
  
    axios
      .put(`http://192.168.221.221:3000/updatePassword/${recentUserId}`, {
        newPassword: resetPassword,
      })
      .then((response) => {
        // Password updated successfully
        // Do something, e.g., show a success message or navigate to another screen
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <View style={styles.container}>
      <AdvanceLB />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>FORGET PASSWORD</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter Email"
            label="Email"
            leftIcon={<MaterialIcons name="email" />}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter Reset Password"
            label="Reset Password"
            secureTextEntry={!showPassword}
            leftIcon={<FontAwesomeIcon name="lock" />}
            rightIcon={
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            }
            value={resetPassword}
            onChangeText={setResetPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleResetPassword} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#daa520',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
    width: '80%',
  },
  resetButton: {
    width: '40%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetText: {
    color: 'white',
    fontSize: 16
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default ForgetPassword;
