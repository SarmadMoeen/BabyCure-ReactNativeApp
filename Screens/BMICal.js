import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { borderRadius } from "@mui/system";
import { RadioGroup, FormControlLabel } from 'react-native-radio-buttons-group';
import { Calendar } from "react-native-calendars";
import { Input } from "react-native-elements";
import axios from "axios";
import { BottomNavBar } from "../component/BottomNavBar";
import ipAddress from "../ipconfig";

const BMICal = ({ navigation }) => {

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmi] = useState('');
    const [description, setDescription] = useState('');
    const [showDate, setshowDate] = useState(false);
    const [date, setDate] = useState([]);
    const [radio, setRadio] = useState(0);
    const [gender, setGender] = useState("");


    const calculateBmi = () => {

        console.log(gender)

        if (gender == "Baby") {
            const newweight = weight * 2.2;
            const newheight = height / 2.54;
            const bmiResult = newweight / newheight;
            setBmi(bmiResult.toFixed(1))

            if (bmiResult < 5) {
                setDescription("Baby is UnderWeight");
            }
            else if (bmiResult >= 5 && bmiResult <= 84) {
                setDescription("Baby is Normal");
            }
            else if (bmiResult >= 85 && bmiResult <= 94) {
                setDescription("Baby is Over Weight");
            }
            else if (bmiResult > 95) {
                setDescription("Obese");
            }
            setHeight('');
            setWeight('');
            setDate([]);
            setRadio(0);
        }
        else {
            const bmiResult = [(weight / height / height)] * 10000;


            setBmi(bmiResult.toFixed(1))

            //Check for the Email TextInput
            if (date == "") {
                alert('Please Enter Date');
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
            if (bmiResult < 18.5) {
                setDescription("UnderWeight, eat more");
            }
            else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
                setDescription("Normal, keep it up");
            }
            else if (bmiResult >= 25 && bmiResult <= 29.9) {
                setDescription("Overweight, start working out");
            }
            else if (bmiResult >= 30) {
                setDescription("Obsese, Hit the gym");
            }

            setHeight('');
            setWeight('');
            setDate([]);
            setRadio(0);
        }

        axios.post(`http://${ipAddress}:3000/bmiCal`, {
            bmiResult,
            
            },[])

    }



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
            <View style={{ flex: 0.60, width: '90%' }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>BMI Calculator</Text>
                <TextInput
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                    placeholder="Weight in kgs"
                    keyboardType="numeric"
                    style={{
                        height: 50, borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        fontSize: 18,
                        width: '100%',
                        marginTop: 10

                    }}
                />
                <TextInput
                    value={height}
                    onChangeText={(text) => setHeight(text)}
                    keyboardType="numeric"
                    placeholder="Height in cms"
                    style={{
                        height: 50, borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        fontSize: 18,
                        width: '100%',
                        marginTop: 20

                    }}
                />


                <TouchableOpacity onPress={() => setshowDate(true)}>
                    <Input style={{
                        marginLeft: '1.5%', marginTop: 10
                    }} placeholder="add date" label="Date"
                        leftIcon={{ type: "font-awesome", name: "calendar" }}
                        placeholderTextColor="#6FB3B8" labelColor="black" value={date}></Input>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { setRadio(1); setGender(Male) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 30, width: 30, borderColor: "black", borderWidth: 2, borderRadius: 20, margin: 10 }}>
                                    {
                                        radio === 1 ? <View style={{ backgroundColor: 'black', height: 22, width: 22, borderRadius: 20, margin: 2 }}></View> : null
                                    }

                                </View>
                                <Text style={{ fontSize: 15, }}>Male</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { setRadio(2); setGender("Female") }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 30, width: 30, borderColor: "black", borderWidth: 2, borderRadius: 20, margin: 10 }}>
                                    {
                                        radio === 2 ? <View style={{ backgroundColor: 'black', height: 22, width: 22, borderRadius: 20, margin: 2 }}></View> : null
                                    }

                                </View>
                                <Text style={{ fontSize: 15, }}>Female</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { setRadio(3); setGender("Baby") }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 30, width: 30, borderColor: "black", borderWidth: 2, borderRadius: 20, margin: 10 }}>
                                    {
                                        radio === 3 ? <View style={{ backgroundColor: 'black', height: 22, width: 22, borderRadius: 20, margin: 2 }}></View> : null
                                    }

                                </View>
                                <Text style={{ fontSize: 15, }}>Baby</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity
                    style={{
                        height: 50, borderWidth: 1, marginTop: 20, width: 150,
                        borderRadius: 5, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
                    }}
                    onPress={calculateBmi}
                >
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Calculate BMI</Text>
                </TouchableOpacity>

            </View>

            <View style={{ flex: 0.20, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: '#2c6975', fontWeight: 'bold', marginTop: 70 }}>{bmiResult}</Text>
                <Text style={{ fontSize: 20, color: '#909E84', fontWeight: 'bold' }}>{description}</Text>
            </View>



            <Modal visible={showDate} animationType='fade'>
                <Calendar style={{ margin: 40, elevation: 4, borderRadius: 10 }} onDayPress={text => {
                    setshowDate(false),
                        setDate(text.dateString)
                }}
                //   hideArrows={true}
                ></Calendar>
            </Modal>
            
            <BottomNavBar/>
        </View>
    )
}

export default BMICal;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,

    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#dcdcdc'
    }
})