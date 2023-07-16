import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from "react-native";
import { Button, ButtonGroup, Input, Icon } from "react-native-elements";

import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar } from "react-native-calendars";
import { RadioGroup, FormControlLabel } from 'react-native-radio-buttons-group';
import axios from "axios";
//import { useRoute } from '@react-navigation/native';
import { useContext } from "react";
import { AuthContext } from "../AuthContexts/AuthContext";

import ipAddress from "../ipconfig";




const AddBaby = ({ navigation }) => {

    const {user} = useContext(AuthContext)

    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const [showDate, setshowDate] = useState(false);
    const [date, setDate] = useState([]);
    const [selectedGender, setSelectedGender] = useState('Male'); // Default value for gender


    console.log(date);

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!name.trim()) {
            alert('Please Enter Name');
            return;
        }
        //Check for the Email TextInput
        if (!date.trim()) {
            alert('Please Enter Age');
            return;
        }
        if (!weight.trim()) {
            alert('Please Enter Weight');
            return;
        }
        if (!height.trim()) {
            alert('Please Enter Height');
            return;
        }
        if (height < 42) {
            alert('Please Enter Height Correctly');
            return;
        }

        if (weight < 2) {
            alert('Please Enter Weight Correctly.. Weight is ttooo less');
            return;
        }

        //Checked Successfully
        //Do whatever you want

        //navigation.navigate('homeScreen', { userID:userID });
        navigation.navigate('homeScreen');

        axios.post(`http://${ipAddress}:3000/Babies`, {

            userID:user.id,
            name,
            date,
            value:selectedGender,
            weight,
            height
            },[])
    };

    /*useEffect(()=>{
        
        console.log("Here is the user ID",userID);
        
    })*/

    useEffect(()=>{
        console.log("user id at addbaby:",user.id)
    },[])


    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'Male'
        },
        {
            id: '2',
            label: 'Female',
            value: 'Female'
        },
        {
            id: '3',
            label: 'Other',
            value: 'Other'
        }
    ]);

    const onPressRadioButton = (radioButtonsArray) => {
        setRadioButtons(radioButtonsArray);
        const selectedValue = radioButtonsArray.find((button) => button.selected === true).value;
        setSelectedGender(selectedValue);
    };

    const handleSkipForNow = () => {
        navigation.navigate('homeScreen');
      };


    return (


        <View style={styles.container}>
            <View style={{ backgroundColor: 'black', width: "100%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require('../assets/Logo.png')}
                    style={{ height: '80%', width: '10%', resizeMode: 'contain' }}
                />
                <Text style={{ fontSize: 24, color: 'white' }}>Baby Cure</Text></View>
            <View style={{ backgroundColor: '#daa520', width: '100%', alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 24, color: 'black' }}>Let's Add a Baby</Text></View>

            <View style={{
                flex: 0.70, width: '80%', height: '100%', marginTop: '3%',
                shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30,
                shadowRadius: 4.65, elevation: 8
            }}>

                <Input placeholder="enter name" label="Name" leftIcon={{ type: "font-awesome", name: "user" }} value={name}
                    onChangeText={setName} />


                <TouchableOpacity onPress={() => setshowDate(true)}>
                    <Input style={{
                        marginLeft: '1.5%'
                    }} placeholder="add date" label="Date"
                        leftIcon={{ type: "font-awesome", name: "calendar" }}
                        placeholderTextColor="#6FB3B8" labelColor="black" value={date}></Input>
                </TouchableOpacity>


                <Text style={{ marginLeft: '3%', fontSize: 16, fontWeight: 'bold', color: '#5f9ea0' }}>Gender</Text>
                <View style={{ flexDirection: 'row', marginBottom: '5%' }}><RadioGroup
                    layout='row'
                    label="Gender"
                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                /></View>



                <View style={{ flexDirection: 'row' }}>

                    <Input
                        keyboardType={"decimal-pad"}
                        placeholder="enter weight" label="Weight of baby"
                        leftIcon={<Ionicons name="barbell-outline" size={25}></Ionicons>}
                        placeholderTextColor="#6FB3B8" labelColor="black" value={weight}
                        onChangeText={setWeight} />
                    <Text style={{ marginTop: '12%', fontSize: 14 }}>Kg</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>

                    <Input
                        keyboardType={"decimal-pad"}
                        placeholder="enter height" label="Height of baby"
                        leftIcon={{ type: "material", name: "height" }} size={40}
                        placeholderTextColor="#6FB3B8" labelColor="black" value={height}
                        onChangeText={setHeight} />
                    <Text style={{ marginTop: '12%', fontSize: 14 }}>Cm</Text>
                </View>



                <View style={{ alignItems: 'center',flexDirection:"row" }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'black', width: 100, height: 40, alignItems: 'center',
                        justifyContent: 'center', borderRadius: 5, shadowColor: "#000",marginLeft:"35%",
                        shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                        elevation: 8,
                    }} onPress={() => { checkTextInput() }}><Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Add Baby</Text></TouchableOpacity>
                
                <TouchableOpacity style={{marginLeft:"20%"}} onPress={handleSkipForNow}>
                    <Text style={{color:"red",fontStyle:"italic",textDecorationLine:"underline"}}>Skip for Now</Text>
                    </TouchableOpacity>
                
                
                </View>
                

            </View>

            <Modal visible={showDate} animationType='fade'>
                <Calendar style={{ margin: 40, elevation: 4, borderRadius: 10 }} onDayPress={text => {
                    setshowDate(false),
                        setDate(text.dateString)
                }}
                //   hideArrows={true}
                ></Calendar>
            </Modal>

        </View>
    )
}

export default AddBaby;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,


    },
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
        alignItems: 'center',

    }
  
})