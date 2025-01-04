import {
    Text,
    StyleSheet,
    Image,
    Button,
    Linking,
    View,
    TextInput,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { HomeStackParamList } from "./Card";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native-safe-area-context";

type ErrorObject = {
    location: string,
    body: string,
    msg: string,
    path: string,
    type: string,
    value: string
}

export default function RegisterForm() {
    const navigator = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

    const imageAspectRatio = 10 / 9;
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let [errorEmail, setErrorEmail] = useState("");
    let [errorUsername, setErrorUsername] = useState("");
    let [errorPassword, setErrorPassword] = useState("");

    function assignErrorMessages(errorObject: ErrorObject[]) {
        errorObject.forEach((obj) => {
            if (obj.path === "username") {
                setErrorUsername(obj.msg);
            } else if (obj.path === "password") {
                setErrorPassword(obj.msg);
            } else if (obj.path === "email") {
                setErrorEmail(obj.msg);
            }
        })
    }

    async function submitUserInfo(path: string) {
        setErrorEmail("");
        setErrorPassword("");
        setErrorUsername("");

        switch (path) {
            case "google":
                Linking.openURL(`https://6331-151-237-68-134.ngrok-free.app/google/login`);
                break;
            case "facebook":
                Linking.openURL(`https://6331-151-237-68-134.ngrok-free.app/facebook/login`);
                break;
            case "user":
                let reqBody = { username, email, password };
                try {
                    const userReq = await fetch(`https://6331-151-237-68-134.ngrok-free.app/user/create`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(reqBody),
                    });
                    
                    if(userReq.ok) {
                        const userRes = await userReq.json();
                        console.log(userRes.message);

                        navigator.navigate("LoginScreen");
                    } else {
                        const errorData = await userReq.json();
                        console.error("Registration failed:", errorData);
                        alert("Registration failed: " + JSON.stringify(errorData));
                        { errorData ? assignErrorMessages(errorData) : null }
                    }
                    
                }  catch (error) {
                    console.error("Error during registration:", error);
                    alert("An error occurred during registration.");
                } finally {
                    setEmail("");
                    setPassword("");
                    setUsername("");
                }
                break;
            default:
                break;
        }

    }

    return (
        <View style={{ flex: 1, alignItems: "flex-end", backgroundColor: "#276CDB"}}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <SafeAreaView style={styles.overlay}>
                        <Image
                            source={require("../../assets/images/News article resources/Octo.png")}
                            style={[styles.octo, { height: 300 / imageAspectRatio }]}
                        />

                        <ImageBackground
                            source={require("../../assets/images/News article resources/dddepth-227.jpg")}
                            resizeMode="cover"
                            style={styles.formContainer}
                        >
                            <View style={styles.form}>
                                <View style={styles.submitContent}>
                                    <Text>Username</Text>
                                    {errorUsername ? <Text style={styles.errorText}>*{errorUsername}</Text> : null}

                                    <TextInput placeholder="Submit your username here..." style={styles.inputBorders} onChangeText={(e) => setUsername(e)} value={username}></TextInput>
                                </View>

                                <View style={styles.submitContent}>
                                    <Text>Email</Text>
                                    {errorEmail ? <Text style={styles.errorText}>*{errorEmail}</Text> : null}

                                    <TextInput placeholder="Submit your email here..." style={styles.inputBorders} onChangeText={(e) => setEmail(e)} value={email}></TextInput>
                                </View>

                                <View style={styles.submitContent}>
                                    <Text>Password</Text>
                                    {errorPassword ? <Text style={styles.errorText}>*{errorPassword}</Text> : null}
                                    <TextInput placeholder="Submit your password here..." style={styles.inputBorders} onChangeText={(e) => setPassword(e)} value={password}></TextInput>
                                </View>

                                <View style={styles.buttonCont}>
                                    <Button title="Log in" onPress={() => navigator.navigate("LoginScreen")}></Button>
                                    <Button title="Create account" onPress={() => submitUserInfo("user")}></Button>
                                </View>

                                <View style={styles.otherStrategies}>
                                    <TouchableOpacity
                                        style={styles.facebookBtn}
                                        onPress={() => submitUserInfo("facebook")}
                                    >
                                        <Image
                                            source={require("../../assets/images/News article resources/icons/facebook-logo.png")}
                                            style={styles.logo}
                                        />
                                        <Text style={styles.socialText}>Log in with Facebook</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.googleBtn}
                                        onPress={() => submitUserInfo("google")}
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

                    <Image
                        style={styles.alien}
                        source={require("../../assets/images/News article resources/Alien.png")}
                    />
                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
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
        left: "75%",
        transform: [{ rotateY: "180deg" }, { rotateX: "40deg" }],
        width: 100,
        height: 100,
    },
    octo: {
        width: 200,
        position: "absolute",
        zIndex: 1,
        transform: [{ rotate: "90deg" }],
        bottom: "79%",
    },
    otherStrategies: {
        flex: 1,
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
        width: "100%",
        justifyContent: "center",
    },
    googleBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 5,
        width: "100%",
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
        color: "white",
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
});
