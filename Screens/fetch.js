import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, Input } from "react-native-elements";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { students } from "../firebase";

const fetch = ({ navigation }) => {

  console.log(students);


  return (
    <View style={styles.container}>

      <FlatList
        data={students}
        renderItem={({ item }) =>
        (
          <View style={{ padding: 30, borderWidth: 4, borderColor: 'yellow' }}>
            <Text style={{ fontSize: 20, color: 'black' }}>Class: {item.class}: Name: {item.Name}</Text>
          </View>

        )
        }
      />
    </View>
  )
}

export default fetch;


const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  }
})