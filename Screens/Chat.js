import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";
import WebView from "react-native-webview";
import { StatusBar } from "expo-status-bar";

const Chat = () => {



    return (
        <View style={styles.container}>

            <WebView source={{ uri: "https://tawk.to/chat/641f0bf231ebfa0fe7f49fbd/1gsckdmg0" }} />

        </View>
    )
}

export default Chat;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,

    },
    container: {
        flex: 1,
    }
})