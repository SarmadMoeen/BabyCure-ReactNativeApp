import React, { useLayoutEffect, useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getAuth, signOut, setOptions } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";
import { GiftedChat } from "react-native-gifted-chat";
import { auth } from "../firebase";

const ChatScreen = ({ navigation }) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])


  useLayoutEffect(() => {
    navigation.setOptions({

      headerLeft: () => (
        <View>
          <Avatar
            rounded
            source={{ uri: auth?.user?.photoURL }} />
        </View>
      ),


      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 30 }} onPress={dosignOut}>
          <AntDesign name='logout' size={24} color='black'></AntDesign>
        </TouchableOpacity>
      )
    })
  }, [])


  const dosignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.replace('Login');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <GiftedChat
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.user?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />

  )
}

export default ChatScreen