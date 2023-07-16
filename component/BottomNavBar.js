import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity,Text } from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export function BottomNavBar() {

  const navigation = useNavigation();
  return (
    <>
    <View style={{ flex: 0.01, backgroundColor: 'black', height: '100%', width: '100%', marginTop: '2%' }}></View>
    <View style={{
        flex: 0.10, width: '100%', backgroundColor: '#daa520', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    }}>

       
          <View style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center', marginLeft: 4}}>
          <TouchableOpacity  onPress={() => navigation.navigate('homeScreen')}>
          <FontAwesomeIcon name="home" size={30} ></FontAwesomeIcon>
            <Text >Home</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center', marginLeft: 60}}>
          <TouchableOpacity  onPress={() => navigation.navigate('AddBaby')}>
          <FontAwesomeIcon name="plus" size={30}  />
            <Text >Add Baby</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center', marginLeft: 60}}>
          <TouchableOpacity  onPress={() => navigation.navigate('PhysicalActivities')}>
          <FontAwesomeIcon name="clipboard" size={30} ></FontAwesomeIcon>
            <Text >Activities</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center', marginLeft: 60}}>
          <TouchableOpacity  onPress={() => navigation.navigate('More')}>
          <MaterialIcons name="more" size={30} ></MaterialIcons>
            <Text >More</Text>
            </TouchableOpacity>
          </View>


    </View>
    </>

  );
} 