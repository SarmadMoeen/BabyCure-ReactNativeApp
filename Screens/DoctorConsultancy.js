import React, { useState, useEffect, useRef ,useMemo} from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import { useRoute } from "@react-navigation/native";
import { BottomNavBar } from "../component/BottomNavBar";
import ipAddress from "../ipconfig";



const DoctorConsultancy = ({ navigation }) => {

    const route = useRoute();
    const {babyId} = route.params;
    const {babyAge}=route.params;

    const [data, setData] = useState([]);
    const [newFilter, setNewFilter] = useState("");
    const [newData, setNewData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const listRef = useRef();

  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByReviews, setSortByReviews] = useState(false);

  const toggleSortByPrice = () => {
    setSortByPrice(!sortByPrice);
    setSortByReviews(false); // Reset the reviews sorting
  };

  const toggleSortByReviews = () => {
    setSortByReviews(!sortByReviews);
    setSortByPrice(false); // Reset the price sorting
  };

    

    const categories = [
        'Sort By Price', 'Sort by Reviews'
    ]

    const [ind, setInd] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);
    

    let generateRandomNum = () => Math.floor(Math.random() * 1001);


    const onSearch = (text) => {

        if (text == '') {
            setData(oldData);
        }
        else {
            let tempList = data.filter(item => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            })
            setData(tempList);

        }

    }

   

    

    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
          stars.push(<FontAwesomeIcon key={i} name="star" size={14} color="gold" />);
        }
        return stars;
      };


    useEffect(() => {
        // fetch('https://fakestoreapi.com/products')
        fetch(`http://${ipAddress}:3000/getDoctorInfo`)
            .then((response) => response.json())
            .then(response => {
                setData(response);
                setOldData(response)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const sortedData = useMemo(() => {
        let sortedData = [...data];
    
        if (sortByPrice) {
          sortedData.sort((a, b) => a.charges - b.charges);
        }
    
        if (sortByReviews) {
          sortedData.sort((a, b) => b.review - a.review);
        }
    
        return sortedData;
      }, [data, sortByPrice, sortByReviews]);

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

            <View style={{ flex: 0.10, flexDirection: 'row' }}>
                <View>
                <TouchableOpacity onPress={toggleSortByPrice}>
                    <Text
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: sortByPrice ? 'white' : 'black',
                        borderRadius: 10,
                        fontSize: 15,
                        margin: 5,
                        backgroundColor: sortByPrice ? 'black' : 'white',
                        color: sortByPrice ? 'white' : 'black',
                    }}
                    >
                    Sort By Price
                    </Text>
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity onPress={toggleSortByReviews}>
                    <Text
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: sortByReviews ? 'white' : 'black',
                        borderRadius: 10,
                        fontSize: 15,
                        margin: 5,
                        backgroundColor: sortByReviews ? 'black' : 'white',
                        color: sortByReviews ? 'white' : 'black',
                    }}
                    >
                    Sort by Reviews
                    </Text>
                </TouchableOpacity>
                </View>
            </View>


            <View style={{ flex: 0.60 }}>
                <FlatList
                    initialScrollIndex={ind}
                    ref={listRef}
                    data={sortedData}
                    renderItem={({ item }) =>
                    (
                        <View style={{
                            borderWidth: 1, backgroundColor: '#dcdcdc', borderColor: 'grey',
                            flexDirection: 'row', shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65,
                            elevation: 8, marginTop: 5, marginLeft: 5, marginRight: 5
                        }}>

                            <View style={{ justifyContent: 'center' }}>{item.image ? (
                                    <Image source={{ uri: item.image }} style={{ width: 120, height: 160, margin: 8 }} />
                                ) : (
                                    <MaterialIcons name="person" size={120} style={{ margin: 8 }} />
                                )}</View>
                            <View>
                                <Text style={{ fontSize: 16, color: 'black', margin: 10, fontWeight: 'bold', width: '90%' }}>{item.name}</Text>
                                <Text style={{ fontSize: 14, color: 'black', margin: 10, width: '30%' }}>{item.qualification}</Text>
                                <Text style={{ fontSize: 14, color: 'black', margin: 10, width: '80%' }}>{item.specialization}</Text>
                                <Text style={{ fontSize: 14, color: 'black', margin: 10, width: '80%' }}>{item.contactNo}</Text>
                                <Text style={{ fontSize: 14, color: 'black', margin: 10, width: '80%' }}>{renderStars(item.review)}</Text>
                                <Text style={{ fontSize: 14, color: 'black', margin: 10, width: '80%' }}>{item.charges}</Text>
                                <TouchableOpacity style={{ fontSize: 14, color: 'blue', margin: 10, backgroundColor: 'black', width: 150, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                                   onPress={() => {
                                    navigation.navigate('Payment');

                                    }}
                                ><Text style={{ color: '#b8860b' }}>Pay now</Text></TouchableOpacity>
                            </View>
                        </View>
                    )} />
            </View>


            
            <BottomNavBar/>

        </View>
    )
}

export default DoctorConsultancy;
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