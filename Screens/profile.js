import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Button, Input } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Title, Caption, Text, TouchableRipple } from "react-native-paper";
import editProfile from "./editProfile";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../AuthContexts/AuthContext";
import { useContext } from "react";
import { BottomNavBar } from "../component/BottomNavBar";
import ipAddress from "../ipconfig";






const Profile = (props) => {

    const { user } = useContext(AuthContext);
    const [babyNames,setBabyNames] = useState();

    useEffect(() => {
        fetchBabyNames();
      }, []);


    const fetchBabyNames = async () => {
        try {
          const response = await axios.get(`http://${ipAddress}:3000/getBabies`, {
            params: {
              userID: user.id
            }
          });
          const filteredBabyNames = response.data.filter(baby => baby.userID === user.id);
          setBabyNames(filteredBabyNames);
          console.log(filteredBabyNames);
        } catch (error) {
          console.error(error);
        }
      };

    const userName = user.name;
    const email = user.email

    const navigation = useNavigation(); 

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }} >
                    <Avatar.Image source={{ uri: 'https://api.adorable.io/avatars/80/abott@adorable.png' }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{userName}</Text>
                        <Text style={styles.caption}>captions here</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=> navigation.navigate('editProfile')}>
                         <Ionicons name="create-outline" size={30} color="black" style={{marginLeft: 80, marginTop: 20}}/>
                        </TouchableOpacity>
                       
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <MaterialIcons name="map-marker-radius" color="black" size={20} />
                    <Text style={{ marginLeft: 20, color: 'black', }}>Lahore, Pakistan</Text>
                </View>
                <View style={styles.row}>
                    <MaterialIcons name="phone" color="black" size={20} />
                    <Text style={{ color: "black", marginLeft: 20 }}>+92-3134389419</Text>
                </View>
                <View style={styles.row}>
                    <MaterialIcons name="email" color="black" size={20} />
                    <Text style={{ color: "black", marginLeft: 20 }}>{email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: 'grey',
                    borderRightWidth: 1
                }]}>
                    <Title>PKR 140.50/-</Title>
                    <Caption>Payments done</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>1</Title>
                    <Caption>Consult with doctor</Caption>
                </View>
            </View>

            <View style={[styles.menuWrapper,{marginTop: 10, marginLeft: 10}]}>
                <Text style={styles.title}>Children</Text>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <MaterialIcons name="baby" color="black" size={25} />
                        <Text style={styles.menuItemText}>{babyNames}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <MaterialIcons name="baby" color="black" size={25} />
                        <Text style={styles.menuItemText}>Faizan</Text>
                    </View>
                </TouchableRipple>
              
            </View>

            <View style={[styles.menuWrapper,{marginTop: 10, marginLeft: 10}]}>
                <Text style={styles.title}>Relationship</Text>
            </View>

            
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <MaterialIcons name="baby" color="black" size={25} />
                        <Text style={styles.menuItemText}>Mother</Text>
                    </View>
                </TouchableRipple>  
            </View>

        </SafeAreaView>
    )
}

export default Profile;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,

    },
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        borderTopColor: 'grey',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    }
})

