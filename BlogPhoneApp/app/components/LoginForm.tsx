import { Text, View, Linking, TextInput, StyleSheet, TouchableOpacity, Button, Image, ImageBackground, SafeAreaView, ScrollView } from "react-native"
import { useState } from "react"

export default function LoginForm() {
    let [userError, setUserError] = useState("");
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");

    async function logInUser(path: string) {
        switch (path) {
            case "google":
                Linking.openURL(`https://561a-151-237-68-134.ngrok-free.app/google/login`);
                break;
            case "facebook":
                Linking.openURL(`https://561a-151-237-68-134.ngrok-free.app/facebook/login`);
                break;
            case "user":
                try {
                    let body = { username, email };
                    let loginReq = await fetch("https://561a-151-237-68-134.ngrok-free.app/user/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                    });
                } catch (error) {
                    console.error("Error during registration:", error);
                    alert("An error occurred during registration.");
                } finally {
                    setEmail("");
                    setUsername("");
                }
                break;
            default:
                console.log("No such path");
                break;
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "flex-end", backgroundColor: "#276CDB" }}>
            <SafeAreaView style={styles.overlay}>
                <ImageBackground
                    source={require("../../assets/images/News article resources/dddepth-227.jpg")}
                    resizeMode="cover"
                    style={styles.formContainer}
                >
                    <View style={styles.form}>
                        <View style={styles.submitContent}>
                            <Text>Username</Text>
                            <TextInput placeholder="Submit your username here..." style={styles.inputBorders} onChangeText={(e) => setUsername(e)} value={username}></TextInput>
                        </View>

                        <View style={styles.submitContent}>
                            <Text>Email</Text>
                            <TextInput placeholder="Submit your email here..." style={styles.inputBorders} onChangeText={(e) => setEmail(e)} value={email}></TextInput>
                        </View>

                        <View style={styles.buttonCont}>
                            <TouchableOpacity
                                style={styles.logInButton}
                                onPress={() => logInUser("user")}>

                                <Text style={styles.logInButton}>Login</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.otherStrategies}>
                            <TouchableOpacity
                                style={styles.facebookBtn}
                                onPress={() => logInUser("facebook")}
                            >
                                <Image
                                    source={require("../../assets/images/News article resources/icons/facebook-logo.png")}
                                    style={styles.logo}
                                />
                                <Text style={styles.socialText}>Log in with Facebook</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.googleBtn}
                                onPress={() => logInUser("google")}
                            >
                                <Image
                                    source={require("../../assets/images/News article resources/icons/google-logo.png")}
                                    style={styles.logo}
                                />
                                <Text style={styles.socialText}>Log in with Google</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    },
    formContainer: {
        width: 400,
        height: 600,
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
        height: 500,
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
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        alignItems: "center",
    },
    submitContent: {
        width: "100%",
        gap: 10,
    },
    otherStrategies: {
        width: "100%",
        gap: 24,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    facebookBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1877F2",
        padding: 10,
        borderRadius: 5,
        width: 200,
        justifyContent: "center",
    },
    googleBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 5,
        width: 200,
        justifyContent: "center",
    },
    logo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    socialText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    buttonText: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontStyle: "italic",
        textDecorationLine: "underline",
        textDecorationStyle: "double",
        textDecorationColor: "red",
        marginLeft: 10,
    },
    logInButton: {
        width: 200,
        backgroundColor: "yellow",
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 17,
    },
})