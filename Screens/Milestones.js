import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { Input } from "react-native-elements";
import axios from "axios";
import moment from "moment"

import { useRoute } from "@react-navigation/native";
import { BottomNavBar } from "../component/BottomNavBar";
import ipAddress from "../ipconfig";


const Milestones = ({ navigation }) => {

    const route = useRoute();
    const {babyId} = route.params;
    const {babyAge}=route.params;

    useEffect(()=>{
        console.log("baby id at Milestones:",babyId)
    },[babyId])

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const [newtitle, setNewtitle] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newData, setNewData] = useState([]);



    const [showDate, setshowDate] = useState(false);
    const [date, setDate] = useState('');


    let generateRandomNum = () => Math.floor(Math.random() * 1001);


    useEffect(() => {
        axios
          .get(`http://${ipAddress}:3000/getMilestones?babyId=${babyId}`)
          .then(response => {
            console.log("Response data:", response.data); // Check if data is coming
            setNewData(response.data);
          })
          .catch(error => console.error(error));
      }, [babyId]);




    console.log(newtitle)

    const checkTextInput = () => {
        // Check for the Name TextInput
        if (!name.trim()) {
            alert('Please Enter Name');
            return;
        } else if (!description.trim()) {
            alert('Please Enter Description');
            return;
        } else if (date == "") {
            alert('Please Enter Date');
            return;
        }

        onAddMilestone();
        toggleModal(); // Move this line here to close the modal
    };

    const onAddMilestone = () => {
        axios
            .post(`http://${ipAddress}:3000/milestones`, {
                babyId: babyId,
                milestoneName: name,
                description: description,
                date: date,
            })
            .then((response) => {
                // The response.data will contain the newly created milestone's data
                // including the ID assigned by the backend
                console.log("Response after adding milestone:", response.data);
                // Adding the newly created milestone to the list of milestones
                setNewData((prevData) => [...prevData, response.data]);
                toggleModal(); // Move this line here to close the modal
            })
            .catch((error) => {
                console.error(error);
                // Display an error message if the add request fails
                Alert.alert("Error", "Failed to add milestone");
            });
    };



    useEffect(()=>{
        console.log("here is:",babyId)
    })


    
      

    console.log(newData)

    const onDeleteItem = (id) => {
        console.log("Deleteing milestone ID:",id)
        axios
          .delete(`http://${ipAddress}:3000/deleteMilestones/${id}`)
          .then((response) => {
            // Check if the delete request was successful
            console.log("Response after delete:", response.data);
            // Filter the newData array to remove the deleted milestone
            setNewData((prevData) => prevData.filter((item) => item._id !== id));
          })
          .catch((error) => {
            console.error(error);
            // Display an error message if the delete request fails
            Alert.alert("Error", "Failed to delete milestone");
          });
      };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);

    };


    const renderItemList = ({ item }) => {

        return (
            <View style={{
                flex: 1, padding: 10, borderRadius: 6, backgroundColor: 'black', flexDirection: 'row', shadowColor: "#000",
                shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                elevation: 8, height: "5%", width: 370, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10
            }}>

                <View style={{ flex: 0.90 }}>
                    <Text style={{ color: 'white' }}>{item.title}</Text>
                    <Text style={{ color: 'white' }}>{item.description}</Text>
                    <Text style={{ color: 'white' }}>{moment(item.date).format('MMMM Do, YYYY')}</Text>

                </View>
                <View>
                    <TouchableOpacity onPress={() => { onDeleteItem(item._id) }}>
                        <Text style={{ fontWeight: '900', fontSize: 24, color: 'white', textAlign: 'right' }}>X</Text>
                    </TouchableOpacity>
                </View>



                {/* <Text style={{ marginLeft: '2%' }}>{isSelected ? onDoneVaccination : '👎'}</Text> */}


            </View>


        )

    }



    return (
        <View style={styles.container}>
            <View style={{ flex: 0.10, flexDirection: 'row', backgroundColor: '#daa520' }}>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('BabyDetails',{babyId:babyId,babyAge:babyAge})}>
                    <Ionicons name='ios-medkit-outline' size={32} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('DietPlanWaterIntake',{babyId:babyId,babyAge:babyAge})}>
                    <Ionicons name='ios-nutrition-outline' size={32} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('Milestones',{babyId:babyId,babyAge:babyAge})}>
                    <Ionicons name='ios-trophy-outline' size={32} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('DoctorConsultancy',{babyId:babyId,babyAge:babyAge})}>
                    <Ionicons name='md-pulse' size={32} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.10, backgroundColor: 'black', width: "100%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require('../assets/Logo.png')}
                    style={{ height: '70%', width: '15%', resizeMode: 'contain' }}
                />
                <Text style={{ fontSize: 24, color: 'white' }}>Baby Cure</Text></View>
            <View style={{ flex: 0.01, backgroundColor: '#daa520', height: '100%', width: '100%' }}></View>
            <View style={{ flex: 0.01, backgroundColor: 'black', height: '100%', width: '100%' }}></View>
            <View style={{ flex: 0.70 }}>


                <FlatList
                    data={newData}
                    renderItem={renderItemList}
                />
            </View>

            <Modal isVisible={isModalVisible}>

                <View style={{ flex: 1, marginTop: 30 }}>

                    <TouchableOpacity  onPress={() => onDeleteItem(item._id)}>
                        <Text style={{ fontWeight: '900', fontSize: 24, color: 'white', textAlign: 'right' }}>X</Text>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '900', fontSize: 24, color: 'white', textAlign: 'center' }}>Add Milestone</Text>


                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter Milestone name"
                        keyboardType="default"
                        style={{
                            height: 55, borderWidth: 1 / 2,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            fontSize: 18,
                            width: '100%',
                            marginTop: 70

                        }}
                    />
                    <TextInput
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter Description of milestone"
                        keyboardType="default"
                        style={{
                            height: 55, borderWidth: 1 / 2,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            fontSize: 18,
                            width: '100%',
                            marginTop: 30

                        }}
                    />


                    <TouchableOpacity style={{
                        marginTop: 30,
                    }} onPress={() => setshowDate(true)}>
                        <Input placeholder="Add Milestone Achieved Date" label="Date"
                            leftIcon={{ type: "font-awesome", name: "calendar", color: 'white' }}
                            placeholderTextColor="#6FB3B8" labelTextStyle={{ color: "white" }} value={date}></Input>
                    </TouchableOpacity>

                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={checkTextInput} style={{
                        backgroundColor: '#C2EDCE', height: 40, width: 150,
                        alignItems: 'center', justifyContent: 'center', borderRadius: 10
                    }}><Text>Add Milestone</Text></TouchableOpacity>
                </View>
            </Modal>


            <View style={{ flex: 0.10, paddingLeft: 50 }}>
                <TouchableOpacity style={{ marginLeft: 250, marginRight: 10 }} onPress={() => { toggleModal(); setName(''), setDescription(''), setDate([]) }}>
                    <Ionicons name='ios-add-circle-outline' size={50} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
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

export default Milestones;

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