import { Text, StyleSheet, Image, View, TextInput, ScrollView, Button, ImageBackground, GestureResponderEvent } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import { PressableEvent } from "react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps";

export default function RegisterForm() {
    const imageAspectRatio = 10 / 9;
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    async function submitUserInfo() {
        console.log(email);
        console.log(password);

        setEmail("");
        setPassword("");
    }

    return (    
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <LinearGradient
                colors={['#276CDB', '#27DBD8']}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.overlay}>

                        <Image source={require("../../assets/images/News article resources/Octo.png")} style={[styles.octo, { height: 300 / imageAspectRatio }]}></Image>

                        <ImageBackground source={require("../../assets/images/News article resources/dddepth-227.jpg")} resizeMode="cover" style={styles.formContainer}>

                            <View style={styles.form}>
                                <View style={styles.submitContent}>
                                    <Text>Email</Text>
                                    <TextInput placeholder="Submit your email here..." style={styles.inputBorders} onChangeText={(e) => setEmail(e)} value={email}></TextInput>
                                </View>

                                <View style={styles.submitContent}>
                                    <Text>Password</Text>
                                    <TextInput placeholder="Submit your password here..." style={styles.inputBorders} onChangeText={(e) => setPassword(e)} value={password}></TextInput>
                                </View>

                                <View style={styles.buttonCont}>
                                    <Button title="Log in"></Button>
                                    <Button title="Create account" onPress={() => submitUserInfo()}></Button>
                                </View>
                            </View>
                        </ImageBackground>
                    </SafeAreaView>

                    <Image style={styles.alien} source={require("../../assets/images/News article resources/Alien.png")}></Image>
                </ScrollView>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    },
    formContainer: {
        width: 400,
        height: 500,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "black",
        borderStyle: "solid",
    },
    form: {
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        padding: 20,
        width: 300,
        height: 300,
        backgroundColor: "black",
        borderRadius: 12,
        gap: 12,
    },
    inputBorders: {
        width: "100%",
        borderWidth: 3,
        borderColor: "yellow",
        borderStyle: "solid",
        borderRadius: 12,
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    },
    buttonCont: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 12,
        alignItems: "center",
    },
    submitContent: {
        width: "100%",
        gap: 10,
    },
    alien: {
        position: "absolute",
        top: "70%",
        left: "50%",
        transform: [{ rotateY: "180deg" }, { rotateX: "20deg" }],
        width: 200,
        height: 200,
    },
    octo: {
        width: 200,
        position: "absolute",
        zIndex: 1,
        transform: [{ rotate: "90deg" }],
        bottom: "70%",
    }
})