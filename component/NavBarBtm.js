import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NavBarBtm = ({ navigation }) => {
   


    return (
 
            <View style={styles.container}>
                    
               <View style={{ flex: 0.10, width: '100%', height: 100, backgroundColor: '#388087' , shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                         elevation: 8, flexDirection:'row',marginTop:30, alignItems:'center',justifyContent:'center'}}>

                    <TouchableOpacity style={{flexDirection:'column'}}onPress={()=>navigation.navigate('homeScreen')}>
                        <FontAwesomeIcon name="home" size={30} style={{padding: 10, marginLeft: 140, marginRight: 140}} ></FontAwesomeIcon>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>navigation.navigate('AddBaby')}>
                        <FontAwesomeIcon name="plus" size={30} style={{padding: 10, marginLeft: 140, marginRight: 140}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Activities')}>
                        <FontAwesomeIcon name="clipboard" size={30} style={{padding: 10, marginLeft: 140, marginRight: 140}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>navigation.navigate('More')}>
                        <MaterialIcons name="more" size={30} style={{padding: 10, marginLeft: 140, marginRight: 140}}/>
                    </TouchableOpacity>

                </View> 
            </View>
    )
}

export default NavBarBtm;

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,

    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F2'
    }
})