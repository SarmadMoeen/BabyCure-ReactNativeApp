import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { BottomNavBar } from "../component/BottomNavBar";
import LogoBar from "../component/LogoBar";
import ipAddress from "../ipconfig";



// ...



const BabyDetails = ({ navigation }) => {

    const route = useRoute();
    const {babyId} = route.params;
    const {babyAge} = route.params;

    

    useEffect(()=>{
        console.log("baby id at baby details:",babyId)
    },[babyId])
    useEffect(()=>{
        console.log("baby id at baby Age:",babyAge)
    },[babyAge])

  

    const [vacc, setVacc] = useState("");
    const [showDate, setshowDate] = useState(false);
    const [date, setDate] = useState([]);
    const [data1, setData1] = useState([]);
    const [doneVacc, setdoneVacc] = useState([]);
    const [storeKey, setStoreKey] = useState([]);
    const [isSelected, setSelection] = useState(false);

    const [type, setType] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [newtitle, setNewtitle] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [newData,setNewData] = useState([])
    


    useEffect(() => {
        axios
          .get(`http://${ipAddress}:3000/getVaccinations?babyId=${babyId}`)
          .then(response => {
            console.log("Response data:", response.data); // Check if data is coming
            setNewData(response.data);
          })
          .catch(error => console.error(error));
      }, [babyId]);

    useEffect(() => {
        axios
          .get(`http://${ipAddress}:3000/getDoneVaccinations?babyId=${babyId}`)
          .then(response => {
            console.log("Done Vaccination Response data:", response.data); // Check if data is coming
            setdoneVacc(response.data);
          })
          .catch(error => console.error(error));
      }, [babyId]);
    


    let generateRandomNum = () => Math.floor(Math.random() * 1001);

    const data = [
        { 'key': '1', 'vaccname': 'BCG' },
        { 'key': '2', 'vaccname': 'OPV-0' },
        { 'key': '3', 'vaccname': 'Hep-B' },
        { 'key': '4', 'vaccname': 'OPV-I' },
        { 'key': '5', 'vaccname': 'Pneumococcal-I' },
        { 'key': '6', 'vaccname': 'Rotavirus-I' },
        { 'key': '7', 'vaccname': 'Pentavalent-I' },
        { 'key': '8', 'vaccname': 'OPV-II' },
        { 'key': '9', 'vaccname': 'Pneumococcal-II' },
        { 'key': '10', 'vaccname': 'Rotavirus-II' },
        { 'key': '11', 'vaccname': 'Pentavalent-II' },
        { 'key': '12', 'vaccname': 'OPV-III' },
        { 'key': '13', 'vaccname': 'Pneumococcal-III' },
        { 'key': '14', 'vaccname': 'IPV-I' },
        { 'key': '15', 'vaccname': 'Pentavalent-III' },
        { 'key': '16', 'vaccname': ' MR-I' },
        { 'key': '17', 'vaccname': 'Typhoid' },
    ]

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    
      
    const onAddVacc = () => {
        if (vacc === "") {
          alert("Can't add");
        } else if (type === "") {
          alert("Please select Done or upcoming");
        } else {
          const routeUrl = type === "Upcoming" ? "/vaccinations" : "/doneVaccinations";
          axios
            .post(`http://${ipAddress}:3000${routeUrl}`, {
              babyId: babyId,
              key: generateRandomNum(),
              vaccname: vacc,
              date: date,
            })
            .then(response => {
              // Handle the response if needed
            })
            .catch(error => {
              // Handle the error if needed
            });
      
          const newDataObject = {
            key: generateRandomNum(),
            vaccname: vacc,
            date: date,
            type: type,
          };
          
          if (type === "Upcoming") {
            setNewData([...newData, newDataObject]);
          } else if (type === "Done") {
            setdoneVacc(doneVacc => [...doneVacc, newDataObject]);
          }
      
          setType("");
        }
      };
      
      
      

      const onDoneVaccination = () => {
        const newDataObject = {
          key: item.key,
          vaccname: item.vaccname,
          date: item.date
        };
        setNewData(newData => newData.filter(newItem => newItem.key !== item.key));
        setdoneVacc(doneVacc => [...doneVacc, newDataObject]);
      };
      

      const onDeleteItem = (id) => {
        console.log("Deleteing Upcoming Vaccination ID:",id)
        axios
          .delete(`http://${ipAddress}:3000/deleteVaccination/${id}`)
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
      
      const onDeleteItemDone = (id) => {
        console.log("Deleteing Done Vaccination ID:",id)
        axios
          .delete(`http://${ipAddress}:3000/deleteDoneVaccination/${id}`)
          .then((response) => {
            // Check if the delete request was successful
            console.log("Response after delete:", response.data);
            // Filter the newData array to remove the deleted milestone
            setdoneVacc((prevData) => prevData.filter((item) => item._id !== id));
          })
          .catch((error) => {
            console.error(error);
            // Display an error message if the delete request fails
            Alert.alert("Error", "Failed to delete milestone");
          });
      };
      

    const renderItemList = ({ item }) => {
        <FlatList
                data={newData}
                renderItem={renderItemList}
                />


        const onDoneVaccination = () => {
            const newDataObject = {
              key: item.key,
              vaccname: item.vaccname,
              date: item.date
            };
            setNewData(newData => newData.filter(newItem => newItem.key !== item.key));
            setdoneVacc(doneVacc => [...doneVacc, newDataObject]);
          };

        return (
            <View style={{
                flex: 1, padding: 10, borderRadius: 6, backgroundColor: 'black', flexDirection: 'row', shadowColor: "#000",
                shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                elevation: 8, height: "5%", width: 370, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 3
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginLeft: 2, color: 'white' }}>{item.vaccname}</Text>
                    <Text style={{ paddingLeft: '10%', color: 'white' }}>{moment(item.date).format('MMMM Do, YYYY')}</Text>


                    <TouchableOpacity onPress={() => { setStoreKey(item.key); onDoneVaccination() }}>
                        <CheckBox
                            value={selectedItems.includes(item)}
                            onValueChange={newValue => {
                                if (selectedItems.includes(item)) {
                                    setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
                                } else {
                                    setSelectedItems([...selectedItems, item]);
                                }
                                onDoneVaccination(); // Call the function here
                                }}
                        />
                    </TouchableOpacity>

                    <Text style={{ marginLeft: 10, color: 'white' }}>Mark as done?</Text>
                    <TouchableOpacity onPress={() => { onDeleteItem(item._id) }}>
                        <Text style={{ fontWeight: '900', fontSize: 20, textAlign: 'right', color: 'white' }}> X</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>


                    {/* <Text style={{ marginLeft: '2%' }}>{isSelected ? onDoneVaccination : '👎'}</Text> */}



                </View>
            </View>

        )

    }
    const renderItemListDone = ({ item }) => {

        

        const onDoneVaccination = () => {
            const newDataObject = {
              key: item.key,
              vaccname: item.vaccname,
              date: item.date
            };
            setNewData(newData => newData.filter(newItem => newItem.key !== item.key));
            setdoneVacc(doneVacc => [...doneVacc, newDataObject]);
          };
        return (
            <View style={{
                flex: 1, padding: 10, borderRadius: 6, backgroundColor: 'black', flexDirection: 'row', shadowColor: "#000",
                shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                elevation: 8, height: "5%", width: 370, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 3
            }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white' }}>{item.vaccname}</Text>
                    <Text style={{ paddingLeft: '10%', color: 'white' }}>{moment(item.date).format('MMMM Do, YYYY')}</Text>

                </View>

                <TouchableOpacity onPress={() => { onDeleteItemDone(item._id) }}>
                    <Text style={{ fontWeight: '900', fontSize: 20, textAlign: 'right', color: 'white' }}> X</Text>
                </TouchableOpacity>

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
            
            <LogoBar/>

            <View style={{ flex: 0.01, backgroundColor: '#daa520', height: '100%', width: '100%' }}></View>
            <View style={{ flex: 0.01, backgroundColor: 'black', height: '100%', width: '100%' }}></View>
            <View style={{
                flex: 0.70, backgroundColor: '#dcdcdc', width: '90%', shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65,
                elevation: 8, borderRadius: 20, alignItems: 'center', marginTop: '2%'
            }}>

                <View style={{
                    flex: 0.30, marginTop: 10, background: '#6FB3B8', alignItems: 'center', width: '100%'

                }}>
                    <Text style={{ fontSize: 18, color: 'black', fontWeight: 'normal' }}>Upcoming Vaccination</Text>
                    <FlatList
                        data={newData}
                        renderItem={renderItemList}
                    />
                </View>


                <View style={{
                    flex: 0.30, background: '#6FB3B8', alignItems: 'center', marginTop: 10
                }}>
                    <Text style={{
                        fontSize: 18, color: 'black', fontWeight: 'normal',
                        marginTop: 3
                    }}>Done Vaccination</Text>
                    <FlatList
                        data={doneVacc}
                        renderItem={renderItemListDone}
                    />
                </View>

                <View style={{ flex: 0.20, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={toggleModal}>
                        <Ionicons name='ios-add-circle-outline' size={50} color='black' />
                    </TouchableOpacity>
                </View>

            </View>

            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={toggleModal}><Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'right' }}>X</Text></TouchableOpacity>
                    <View style={{ flex: 0.60 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) =>
                            (

                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 0.50 }}>
                                        <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>{item.vaccname}</Text>
                                    </View>

                                    <View style={{ flex: 0.50, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => { setshowDate(true); setVacc(item.vaccname); setStoreKey(item.key) }} >
                                            <Text style={{ fontSize: 14, color: 'yellow', marginTop: 10, marginLeft: 20 }}>Date</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            )
                            }
                        />

                    </View>
                    <View style={{ flex: 0.30, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.20, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { setType("Done") }} style={{
                                backgroundColor: '#daa520', height: 40, width: 150,
                                alignItems: 'center', justifyContent: 'center', borderRadius: 10
                            }}><Text style={{ color: 'black', fontSize: 18 }}>Done</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { setType("Upcoming") }} style={{
                                backgroundColor: '#daa520', height: 40, width: 150,
                                alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginLeft: 15
                            }}><Text style={{ color: 'black', fontSize: 18 }}>Upcoming</Text></TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.10, marginTop: 30 }}>
                            <TouchableOpacity onPress={() => { toggleModal(); onAddVacc() }} style={{
                                backgroundColor: 'black', height: 40, width: 150,
                                alignItems: 'center', justifyContent: 'center', borderRadius: 10
                            }}><Text style={{ color: 'white', fontSize: 18 }}>Add Vaccnation</Text></TouchableOpacity>
                        </View>


                    </View>


                </View>


            </Modal>

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

export default BabyDetails;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,

    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})