import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';



const PhysicalActivitiesMain = (props) => {

    const [data, setData] = useState([]);
    const [newFilter, setNewFilter] = useState("");
    const [newData, setNewData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const listRef = useRef();
    const navigation = useNavigation();


    const [ind, setInd] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);

    let generateRandomNum = () => Math.floor(Math.random() * 1001);




    const onAddFilter = () => {

        if (newFilter == "") {
            alert('Cant add');
        }

        else {
            console.log("in start")
            var newDataObject = {
                id: generateRandomNum,
                title: newFilter,
            }
            setNewData([...newData, newDataObject])
            console.log("in filter")
        }
    }

    const FilterClick = () => {
        let tempList = data.sort((a, b) =>
            a.title > b.title ? 1 : -1);
        setData(tempList);
        setNewFilter('Sort By Month')
        listRef.current.scrollToIndex({ animated: true, index: 0 })
    }


    useEffect(() => {
        // fetch('https://fakestoreapi.com/products')
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then(response => {
                setData(response);
                setOldData(response)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    return (
        <View style={styles.container}>
            <View style={{ flex: 0.10, flexDirection: 'row', backgroundColor: '#daa520' }}>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('BabyDetails')}>
                    <Ionicons name='ios-medkit-outline' size={32} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('DietPlanWaterIntake')}>
                    <Ionicons name='ios-nutrition-outline' size={32} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('Milestones')}>
                    <Ionicons name='ios-trophy-outline' size={32} color='black' style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 40, marginRight: 40 }} onPress={() => navigation.navigate('DoctorConsultancy')}>
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




            <View style={{ flex: 0.80, alignItems: 'center' }}>

                <View style={{ flex: 0.50, marginTop: 10 }}>
                    <Image source={{ uri: props.route.params.uri }} style={{ height: 300, width: 400, resizeMode: 'contain' }} />
                </View>

                <View style={{ flex: 0.30, marginTop: 200 }}>
                    <Text style={{ magrinTop: 10, fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>{props.route.params.title}</Text>
                    <Text style={{ marginTop: 10, fontSize: 14, marginLeft: 10 }}>{props.route.params.description}</Text>
                </View>

            </View>


            <View style={{ flex: 0.01, backgroundColor: 'black', height: '100%', width: '100%', marginTop: '2%' }}></View>
            <View style={{
                flex: 0.10, width: '100%', backgroundColor: '#daa520', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
            }}>

                <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => navigation.navigate('homeScreen')}>
                    <FontAwesomeIcon name="home" size={30} style={{ padding: 10, marginLeft: 39, marginRight: 39 }} ></FontAwesomeIcon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddBaby')}>
                    <FontAwesomeIcon name="plus" size={30} style={{ padding: 10, marginLeft: 40, marginRight: 40 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PhysicalActivities')}>
                    <FontAwesomeIcon name="clipboard" size={30} style={{ padding: 10, marginLeft: 40, marginRight: 40 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('More')}>
                    <MaterialIcons name="more" size={30} style={{ padding: 10, marginLeft: 39, marginRight: 39 }} />
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default PhysicalActivitiesMain;
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