import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchComp from "../component/SearchComp";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BottomNavBar } from "../component/BottomNavBar";
import ipAddress from "../ipconfig";

const DietPlanWaterIntake = ({ navigation }) => {

    const route = useRoute();
    const {babyId} = route.params;
    const {babyAge}=route.params;

    useEffect(()=>{
        console.log("Baby Age at Diet Plan:",babyAge)
    })

    const [data, setData] = useState([]);
    const [newFilter, setNewFilter] = useState("");
    const [newData, setNewData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();


    useEffect(() => {
        axios
          .get(`http://${ipAddress}:3000/getDietPlan?babyAge=${babyAge}`)
          .then((response) => {
            console.log("Response data:", response.data);
            setData(response.data);
            setOldData(response.data);
          })
          .catch((error) => console.error(error));
      }, [babyAge]);
      


      const onSearch = (text) => {
        if (text === '') {
          setData(oldData);
        } else {
          let tempList = oldData.filter((item) => {
            return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
          });
          setData(tempList);
        }
      };


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
            <View style={{ flex: 0.10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Ionicons name='ios-search' size={20} color='black' style={{ margin: 5 }} />
                <TextInput
                    ref={searchRef}
                    placeholder="search item here...."
                    style={{ width: '70%', borderBottomWidth: 0, height: 30, fontSize: 20, backgroundColor: 'white' }}
                    value={search}
                    onChangeText={text => {
                        onSearch(text)
                        setSearch(text)
                    }} />
                {
                    search == '' ? null : (
                        <TouchableOpacity onPress={() => {
                            searchRef.current.clear()
                            onSearch('')
                            setSearch('')

                        }}>
                            <Ionicons name='ios-close' size={20} color='black' style={{ margin: 5 }} />
                        </TouchableOpacity>
                    )
                }
            </View>


            <View style={{
                flex: 0.55, alignItems: 'center', justifyContent: 'center', shadowColor: "#000",
                shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                elevation: 8, borderRadius: 20, alignItems: 'center', backgroundColor: '#dcdcdc', width: '80%', height: '100%',
            }} >
               <ScrollView style={{ margin: 30 }}>
                    {data && Array.isArray(data) && data.map(item => (
                        <View key={item.id}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                            {item.title}
                        </Text>
                        <Text style={{ fontSize: 14, marginLeft: 2, marginRight: 2, marginTop: 2 }}>
                            {item.description}
                        </Text>
                        </View>
                    ))}
                    </ScrollView>

            </View>

            <View style={{ flex: 0.10 }}>

                <TouchableOpacity style={{
                    width: 200, marginTop: 10, backgroundColor: 'black', borderRadius: 20, justifyContent: 'center',
                    alignItems: 'center', height: 50, shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8,
                }}
                    onPress={() => navigation.navigate('customizeDietPlan')}><Text style={{ color: 'white', fontSize: 20 }}>Customize Diet Plan</Text></TouchableOpacity>


            </View>

            <BottomNavBar/>

        </View>
    )
}

export default DietPlanWaterIntake;
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