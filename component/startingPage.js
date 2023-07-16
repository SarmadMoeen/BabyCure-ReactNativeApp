import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const StartingPage = ({ navigation }) => {
  useEffect(() => {
    const delay = setTimeout(() => {
      navigation.navigate('mainPage');
    }, 4000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animatable.Image
          animation="fadeIn"
          duration={1500}
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Animatable.Text
            animation="fadeIn"
            duration={2000}
            delay={1000}
            style={styles.welcomeText}
          >
            Welcome
          </Animatable.Text>
          <Animatable.Text
            animation="fadeIn"
            duration={2000}
            delay={2000}
            style={styles.centerText}
          >
            To
          </Animatable.Text>
          <Animatable.Text
            animation="fadeIn"
            duration={2000}
            delay={2000}
            style={styles.bottomText}
          >
            Baby Cure
          </Animatable.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32, // Increase the margin to create more space below the logo
  },
  logo: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 8, // Reduce the marginTop to reduce the spacing between "Welcome," "To," and "Baby Cure"
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  centerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4, // Reduce the marginTop to reduce the spacing between "To" and "Baby Cure"
  },
  bottomText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4, // Reduce the marginTop to reduce the spacing between "Baby Cure" and the bottom
  },
});

export default StartingPage;
