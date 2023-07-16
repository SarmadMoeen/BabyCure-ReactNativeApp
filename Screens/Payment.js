import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Input } from "react-native-elements";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AdvanceLB } from "../component/AdvanceLB";
import { BottomNavBar } from "../component/BottomNavBar";
import ipAddress from "../ipconfig";

// ADD localhost address of your server
const API_URL = `http://${ipAddress}:3000`;

const Payment = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    // 1. Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter complete card details and email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    // 2. Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      // 2. Confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        // Simulate successful payment
        setTimeout(async () => {
          try {
            // Send payment data to the backend
            const response = await fetch(`${API_URL}/process-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                cardDetails: cardDetails,
              }),
            });

            if (response.ok) {
              Alert.alert(
                "Alert",
                "Payment Successful!",
                [
                  { text: "OK", onPress: () => console.log("Payment Successful") }
                ]
              );
              navigation.replace('Chat');
            } else {
              // Handle backend error
              const errorResponse = await response.json();
              alert(`Payment Confirmation Error: ${errorResponse.error}`);
            }
          } catch (error) {
            // Handle network or other errors
            console.log(error);
            alert("Payment Confirmation Error: Failed to process payment");
          }
        }, 500);
      }
    } catch (e) {
      console.log(e);
    }
    // 3. Confirm the payment with the card details
  };

  return (
    <StripeProvider publishableKey='pk_test_51MrfnfLJL9bbPRxLiiBurdkzqTQzXh5OqT3yeZZWIJbcKNjU64EirIZcjFrkYEHzdPLYNkBV2h1Agoy9KwOtBOyI00a3reey17'>
      <View style={{ flex: 1, backgroundColor: '#dcdcdc' }}>
        <AdvanceLB/>

        <View style={styles.container}>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ color: '#daa520', fontSize: 40, fontWeight: 'bold' }}>PAYMENT</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Input placeholder="enter Email" label="Email" leftIcon={<MaterialIcons name="email" />} value={email} onChangeText={text => setEmail(text)} />
          </View>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={cardDetails => {
              setCardDetails(cardDetails);
            }}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={handlePayPress}
              style={styles.paystack}
              disabled={loading}
            >
              <Text style={styles.pay}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomNavBar/>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    marginHorizontal: 15,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    backgroundColor: "#efefefef",
  },
  card: {
    backgroundColor: "#efefefef",
  },
  paystack: {
    width: "40%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  pay: {
    color: "white",
    fontSize: 16
  },
});

export default Payment;
