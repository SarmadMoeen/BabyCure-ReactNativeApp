import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { Button, Input } from "react-native-elements";
//import { auth } from "../firebase";
//import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import ipAddress from "../ipconfig";

const RegisterScreen = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [relation, setRelation] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  

  const register = () => {
    const userData = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
  
    // Make a POST request to your registration route on the backend
    fetch(`http://${ipAddress}:3000/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (token and user) as needed
        console.log(data);
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.error(error);
        // Handle the error
      });
  };
  
  
  
  /*const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        const auth = getAuth();
        updateProfile(auth.user, {
          displayName: name,
          photoURL: imageURL ? imageURL : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
        navigation.popToTop();
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });

  }*/

  const passCheck = () => {
    if (password !== confirmPassword) {
      alert("Password and confirm password don't match");
    } else {
      register();
    }
  };

  return (
    <View style={styles.container}>


      <View style={{flex:0.70}}>

      </View>
      <Input placeholder="enter email" label="email" leftIcon={{ type: "material", name: "email" }} value={email}
        onChangeText={text => setEmail(text)} />
      <Input placeholder="enter name" label="Name" leftIcon={{ type: "material", name: "badge" }} value={name}
        onChangeText={text => setName(text)} />
                     <Input placeholder="enter Password" label="Password" leftIcon={{ type: "material", name: "lock" }} 
                rightIcon={<TouchableOpacity onPress={()=>{setIsSecureEntry((prev) => !prev)}}><Text>{isSecureEntry?"Show":"Hide"}</Text></TouchableOpacity>}
                value={password}
                    onChangeText={text => setPassword(text)} secureTextEntry={isSecureEntry} />
                     <Input placeholder="enter Confirm Password" label="Confirm Password" leftIcon={{ type: "material", name: "lock" }} 
                rightIcon={<TouchableOpacity onPress={()=>{setIsSecureEntryConfirm((prev) => !prev)}}><Text>{isSecureEntryConfirm?"Show":"Hide"}</Text></TouchableOpacity>}
                value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)} secureTextEntry={isSecureEntryConfirm} />
      <Input placeholder="Enter Relationship with Child" label="Relationship" leftIcon={{ type: "material", name: "face" }} value={relation}
        onChangeText={text => setRelation(text)} />
      {/*   <Input placeholder="Enter Your Image URL" label="Profile Picture" 
           leftIcon={{type:"material", name:"face"}} value={imageURL} 
           onChangeText={text=> setImageURL(text)}/> */}
      <View style={{ flexDirection: 'row', marginBottom: "5%", alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontWeight: '800' }}>Already a Member?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}><Text style={{ color: 'red', fontWeight: '800' }} >Login</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={{
        backgroundColor: 'black', width: 100, height: 40, alignItems: 'center',
        justifyContent: 'center', borderRadius: 5, shadowColor: "#000",
        shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
        elevation: 8, alignSelf: 'center'
      }} onPress={() => { register(), passCheck() }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Register</Text></TouchableOpacity>

      {/* <Button title = 'Register' style = {styles.button} onPress={register}/> */}
    </View>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 30,
    backgroundColor: '#6FB3B8'

  },
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc'
  }
})