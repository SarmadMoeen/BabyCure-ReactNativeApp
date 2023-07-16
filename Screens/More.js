import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, Input } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, setOptions } from "firebase/auth";
import { BottomNavBar } from "../component/BottomNavBar";
import { AuthContext } from "../AuthContexts/AuthContext";
import { useContext } from "react";

const More = ({ navigation }) => {

   const {user} = useContext(AuthContext)

   console.log("Name:", user.name)

const [loggingOff, setLoggingOff] = useState(false);

  const handleLogout = () => {
    setLoggingOff(true);

    // Simulate a 3-second delay before navigating to LoginScreen
    setTimeout(() => {
      setLoggingOff(false);
      navigation.replace('mainPage');
    }, 3000);
}




    /*const dosignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.replace('LoginScreen');
        }).catch((error) => {
            // An error happened.
        });
    }*/


    return (
        <View style={styles.container}>
            <View style={{ flex: 0.90 }}>
                <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => { navigation.navigate('Profile') }}>
                    <Ionicons name="person-circle-outline" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, marginLeft: 20, justifyContent: 'center' }}>   My Profile</Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => { }}>
                    <Ionicons name="bookmark-outline" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, marginLeft: 20, justifyContent: 'center' }}>   Saved</Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => { }}>
                    <Ionicons name="star-outline" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, marginLeft: 20, justifyContent: 'center' }}>   Rate Us</Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => { }}>
                    <Ionicons name="help-outline" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, marginLeft: 20, justifyContent: 'center' }}>   QnA</Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => { }}>
                    <Ionicons name="alert-circle-outline" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, marginLeft: 20 }}>   About Us</Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => { }}>
                    <Ionicons name="settings-outline" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, marginLeft: 20 }}>   Setting</Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => { }}>
                    <Ionicons name="construct-outline" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, marginLeft: 20 }}>   Serives</Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => { }}>
                    <Ionicons >
                        <Text style={{ fontSize: 18, marginLeft: 20 }}>  </Text>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={handleLogout}>
                <Ionicons name="md-log-out" size={35} style={{ marginTop: 20, marginLeft: 20 }}>
                    <Text style={{ fontSize: 18, marginLeft: 20 }}>   Logout</Text>
                </Ionicons>
                </TouchableOpacity>

            </View>
            {loggingOff && (
                <View style={styles.loggingOffContainer}>
                <View style={styles.loggingOffBox}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.thanksText}>Thanks {user.name} for using Baby Cure!</Text>
                    <Text style={styles.loggingOffText}>Logging off...</Text>
                    
                </View>
                </View>
            )}

            <BottomNavBar/>
        </View>
    )
}

export default More;
const styles = StyleSheet.create({
    button: {
      width: 200,
      marginTop: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#dcdcdc',
    },
    loggingOffContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    },
    loggingOffBox: {
        backgroundColor: '#dcdcdc', // Adjust the background color as needed
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        boxShadow: "1px 2px 9px #000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      },
    loggingOffText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black', // Change the text color to match your UI
      marginTop: 20,
      marginLeft:60,
      alignItems:'center'
    },
    thanksText: {
        fontSize: 18,
        color: 'black', // Change the text color to match your UI
        marginTop: 10,
        fontWeight:'bold',
        fontStyle:"italic"
      },
  });
  