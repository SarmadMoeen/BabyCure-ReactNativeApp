import React, { useState , useEffect} from "react";
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import {Button, Input} from "react-native-elements";
import Images from "./Images";



let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Quotes = (props) => {

    return (

        <ScrollView>
        <View style = {styles.container}>
           { 
           
           Images.map((image, index)=>(
            <TouchableOpacity key={index} onPress={()=>{
                props.navigation.navigate('showImage', {url: image.url})
            }}>

            <Image source={image.url} style={{height: deviceHeight/3, width: deviceWidth/3-11, borderRadius: 10, margin: 2}}/>

            </TouchableOpacity>

           ))
            
            }
        </View>

        </ScrollView>
    )
}

export default Quotes;
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