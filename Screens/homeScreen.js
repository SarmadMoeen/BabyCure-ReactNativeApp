import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import moment from 'moment';
import LogoBar from "../component/LogoBar"
import { BottomNavBar } from "../component/BottomNavBar";
import { AuthContext } from "../AuthContexts/AuthContext";
import ipAddress from "../ipconfig";


const HomeScreen = ({ navigation }) => {
  const { user, setBabyId } = useContext(AuthContext);
  const [babyNames, setBabyNames] = useState([]);
  const [currentBabyIndex, setCurrentBabyIndex] = useState(0);
  const [upcomingVaccination, setUpcomingVaccination] = useState("");
  const [highlightedBabyIndex, setHighlightedBabyIndex] = useState(0);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    fetchBabyNames();
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    fetchUpcomingVaccination();
  }, [currentBabyIndex,babyNames]);

  const fetchUpcomingVaccination = () => {
    const currentBaby = babyNames[currentBabyIndex];
    if (currentBaby) {
      axios
        .get(`http://${ipAddress}:3000/getVaccinations?babyId=${currentBaby._id}`)
        .then(response => {
          console.log("Response data:", response.data);
          if (response.data.length > 0) {
            const firstVaccination = response.data[0];
            const upcomingDate = moment(firstVaccination.date).format("Do MMMM, YYYY");
            setUpcomingVaccination(`${firstVaccination.vaccname} - ${upcomingDate}`);
          } else {
            setUpcomingVaccination("");
          }
        })
        .catch(error => console.error(error));
    }
  };

  const fetchBabyNames = async () => {
    try {
      const response = await axios.get(`http://${ipAddress}:3000/getBabies`, {
        params: {
          userID: user.id
        }
      });
      const filteredBabyNames = response.data.filter(baby => baby.userID === user.id);
      setBabyNames(filteredBabyNames);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeftArrowClick = () => {
    setCurrentBabyIndex(prevIndex => {
      if (prevIndex > 0) {
        setHighlightedBabyIndex(prevIndex - 1);
        return prevIndex - 1;
      }
      return prevIndex;
    });
    setBabyId(babyId);
  };
  
  const handleRightArrowClick = () => {
    setCurrentBabyIndex(prevIndex => {
      if (prevIndex < babyNames.length - 1) {
        setHighlightedBabyIndex(prevIndex + 1);
        return prevIndex + 1;
      }
      return prevIndex;
    });
    fetchUpcomingVaccination();
    setBabyId(babyId);
  };

  const getGreeting = () => {
    const hour = moment().hour();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  const currentBaby = babyNames[currentBabyIndex] || {};
  const babyName = currentBaby.name || "";
  const babyId = currentBaby._id || "";
  const babyHeight = currentBaby.height || "";
  const babyWeight = currentBaby.weight || "";
  const dob = currentBaby.dob || "";
  const babyAge = moment().diff(dob, 'months');

  const now = moment();

  const years = Math.floor(babyAge / 12);
  const months = babyAge % 12;
  const days = now.diff(moment(dob).add(babyAge, 'months'), 'days')

  const parentName = user.name;

  console.log("Height:",babyHeight);
  console.log("weight:",babyWeight);

  return (
    <View style={styles.container}>
      <LogoBar/>
      <View style={{ flex: 0.01, backgroundColor: '#daa520', height: '100%', width: '100%' }}></View>
      <View style={{ flex: 0.01, backgroundColor: 'black', height: '100%', width: '100%' }}></View>

      <View style={{ flex: 0.60 }}>
        <TouchableOpacity style={{
          marginTop: 10, backgroundColor: '#dcdcdc', width: '80%', height: '100%', shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65,
          elevation: 8, borderRadius: 20, alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {currentBabyIndex > 0 && (
              <TouchableOpacity onPress={handleLeftArrowClick}>
                <Ionicons name='ios-arrow-back' size={20} color='black' style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('BabyDetails', { babyId: babyId, babyAge: babyAge })}
              style={[
                styles.babyNameContainer,
                currentBabyIndex === highlightedBabyIndex && styles.highlightedBabyNameContainer
              ]}
            >
              <Text style={[styles.babyName, currentBabyIndex === highlightedBabyIndex && styles.highlightedBabyName]}>
                {babyName}
              </Text>
            </TouchableOpacity>

            {currentBabyIndex < babyNames.length - 1 && (
              <TouchableOpacity onPress={handleRightArrowClick}>
                <Ionicons name='ios-arrow-forward' size={20} color='black' style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Mother')}>
              <Text style={{ fontSize: 16, fontWeight: '600', padding: '10%' }}>{parentName}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'column', paddingLeft: 25, paddingRight: 25 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20 }}>{greeting} {babyName} & {parentName}</Text>
            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20 }}>Upcoming Vaccination: {upcomingVaccination}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', flex: 1, textAlign: 'center' }}>{years} Years</Text>
            <Text style={{ fontSize: 16, fontWeight: '800', flex: 1, textAlign: 'center' }}>{months} Months</Text>
            <Text style={{ fontSize: 16, fontWeight: '800', flex: 1, textAlign: 'center' }}>{days} Days</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{
        flex: 0.10,
        marginTop: 20, backgroundColor: '#dcdcdc', width: '80%', height: '100%', shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65,
        elevation: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center'
      }} onPress={() => navigation.navigate('BMICal')}>
        <Ionicons name='md-calculator' size={30} color='black' style={{ marginLeft: 30, marginTop: 8 }} />
        <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20, marginTop: 8 }}>BMI Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        flex: 0.10,
        marginTop: 10, backgroundColor: '#dcdcdc', width: '80%', height: '60%', shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65,
        elevation: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center'
      }} onPress={() => navigation.navigate('CommonProblems')}>
        <Ionicons name='md-bulb' size={30} color='black' style={{ marginLeft: 30, marginTop: 8 }} />
        <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20, marginTop: 8 }}>Common Problems</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        flex: 0.10,
        marginTop: 10, backgroundColor: '#dcdcdc', width: '80%', height: '100%', shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 4.65,
        elevation: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center'
      }} onPress={() => navigation.navigate('DIYRemandRec')}>
        <Ionicons name='md-restaurant' size={30} color='black' style={{ marginLeft: 30, marginTop: 8 }} />
        <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20, marginTop: 8 }}>DIY Remedies & Recipes</Text>
      </TouchableOpacity>

      
      <BottomNavBar/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  babyNameContainer: {
    padding: 10,
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    marginRight: 10,
  },
  highlightedBabyNameContainer: {
    backgroundColor: "black",
  },
  babyName: {
    fontSize: 16,
    fontWeight: "600",
  },
  highlightedBabyName: {
    color: "#ffffff",
  },
});

export default HomeScreen;
