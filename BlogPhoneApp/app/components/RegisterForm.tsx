import { Text, StyleSheet, View, TextInput, ScrollView, Button, ImageBackground } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RegisterForm() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <LinearGradient
                colors={['#276CDB', '#27DBD8']}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.overlay}>

                        <ImageBackground source={require("../../assets/images/News article resources/dddepth-227.jpg")} resizeMode="contain" style={styles.formContainer}>

                            <View style={styles.form}>
                                <View>
                                    <Text>Type in your email here...</Text>
                                    <TextInput placeholder="Submit your email here..." style={styles.inputBorders}></TextInput>
                                </View>

                                <View>
                                    <Text>Type in your password here...</Text>
                                    <TextInput placeholder="Submit your password here..." style={styles.inputBorders}></TextInput>
                                </View>

                                <View style={styles.buttonCont}>
                                    <Button title="Log in"></Button>
                                    <Button title="Create account"></Button>
                                </View>
                            </View>
                        </ImageBackground>
                    </SafeAreaView>
                </ScrollView>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    formContainer: {
        width: 400,
        height: 600,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 5,
        width: 300,
        height: 300,
        backgroundColor: "black",
        borderRadius: 12,
        gap: 12,
    },
    inputBorders: {
        borderWidth: 2,
        borderColor: "white",
        borderStyle: "solid",
        borderRadius: 12,
        color: "white",
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCont: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 12,
        alignItems: "center",
    }
})