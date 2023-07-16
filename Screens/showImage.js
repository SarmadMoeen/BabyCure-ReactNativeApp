import React, { useState , useEffect} from "react";
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView,ImageBackground} from "react-native";
import {Button, Input} from "react-native-elements";





let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const showImage = (props) => {

    return (


        <View style = {styles.container}>
            <ImageBackground source={props.route.params.url} style={{height: deviceHeight, width: deviceWidth}}/>
         
        </View>

    )
}

export default showImage;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,

    },
    container:{
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})