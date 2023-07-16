import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthContexts/AuthContext";
import ipAddress from "../ipconfig";

//import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = ({  props }) => {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);

   const SignIn = () => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`http://${ipAddress}:3000/login`, data)
      .then((response) => {
        // Authentication successful, call the login function from the context
        login(response.data.user);
        navigation.replace('AddBaby');
      })
      .catch((error) => {
        // Authentication failed, display error message
        const errorMessage = error.response.data.msg;
        alert(errorMessage);
      });
  };
        
      
      
    const navigation = useNavigation();

    /* useEffect(()=>{
         const auth = getAuth();
             const unsubscribe = onAuthStateChanged(auth, (user) => {
             if (user) {
                 navigation.replace('AddBaby');
             } else {
                 // User is signed out
                 // ...
                   navigation.canGoBack() &&
                 navigation.popToTop();  
             }
             });
             return unsubscribe;
     },[])
  */
    return (
        <View style={styles.container}>

            <View style={{ flex: 0.10, backgroundColor: 'black', width: "100%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require('../assets/Logo.png')}
                    style={{ height: '70%', width: '15%', resizeMode: 'contain' }}
                />
                <Text style={{ fontSize: 24, color: 'white' }}>Baby Cure</Text></View>
            <View style={{ flex: 0.01, backgroundColor: '#daa520', height: '100%', width: '100%' }}></View>
            <View style={{ flex: 0.01, backgroundColor: 'black', height: '100%', width: '100%' }}></View>
            <View style={{ flex: 0.01, backgroundColor: '#daa520', height: '100%', width: '100%' }}></View>
            <View style={{ flex: 0.01, backgroundColor: 'black', height: '100%', width: '100%' }}></View>
            <View style={{ flex: 0.86, marginTop: 40 }}>
                <Input placeholder="enter email" label="email" leftIcon={{ type: "material", name: "email" }} value={email}
                    onChangeText={text => setEmail(text)} />
                <Input placeholder="enter Password" label="Password" leftIcon={{ type: "material", name: "lock" }} 
                rightIcon={<TouchableOpacity onPress={()=>{setIsSecureEntry((prev) => !prev)}}><Text>{isSecureEntry?"Show":"Hide"}</Text></TouchableOpacity>}
                value={password}
                    onChangeText={text => setPassword(text)} secureTextEntry={isSecureEntry} />
                <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}><Text style={{ color: 'red', fontWeight: 'light', fontStyle: 'italic', textDecorationLine: 'underline', textAlign: "right" }}>Forget Password?</Text></TouchableOpacity>

                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'black', width: 100, height: 40, alignItems: 'center',
                        justifyContent: 'center', borderRadius: 5, shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                        elevation: 8,
                    }} onPress={() => { SignIn() }}><Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Login</Text></TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: '800' }}>Not a Member?    </Text>
                    <TouchableOpacity style={{ color: 'red', fontWeight: '800' }} onPress={() => navigation.navigate('RegisterScreen')}>
  <Text>Signup</Text>
</TouchableOpacity>

                </View>


            </View>

            {/* 
           <Button title = 'Register' style = {styles.button} onPress={()=>navigation.navigate('Register')}/> */}
        </View>
    )
}

export default LoginScreen;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,
        color: '#dcdcdc',
        backgroundColor: 'black',
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        fontSize: 24,
        fontWeight: '200'

    },
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc'
    }
})