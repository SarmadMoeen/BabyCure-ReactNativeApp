import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from "react-native";


const image = { uri: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" };
const mainPage = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1, backgroundColor: "#000000c0", justifyContent: 'center' }}>

                    <View style={{ flex: 0.60, justifyContent: 'center' }}>
                        <Text style={styles.text}>Hello !
                            Its great to see you her.
                            Baby Cure is an app and website which facilitate young mothers in raising their
                            child keep their food tracking and keep tracking of their vaccinations and much more....</Text>
                    </View>


                    <View style={{ flex: 0.20, justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={styles.text}>Not a Member?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                            <Text style={{
                                color: "red", fontSize: 22, fontWeight: "bold", textAlign: "center",
                                marginLeft: 20, marginRight: 20
                            }}>Signup</Text></TouchableOpacity>

                    </View>


                    <View style={{ flex: 0.20, justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={styles.text}>Already a Member?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('mainPageChoose')}>
                            <Text style={{
                                color: "red", fontSize: 22, fontWeight: "bold", textAlign: "center",
                                marginLeft: 20, marginRight: 20
                            }}>Login</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default mainPage;
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,

    },
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 22,
        fontWeight: "semi-bold",
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
    }
})