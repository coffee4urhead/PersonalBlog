import { Image, TouchableOpacity, View, Text, StyleSheet, Linking } from "react-native"
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function Footer() {
    const openLink = (url: string) => {
        Linking.openURL(url);
    }

    return (
        <View style={styles.footerContainer}>
            <Image source={require("../../assets/images/News article resources/dddepth-227.jpg")} style={{ height: 800 }} resizeMode="contain"></Image>
            <View style={styles.footerInfo}>
                <Text>Facebook Contact:

                    <TouchableOpacity onPress={() => openLink("https://www.facebook.com/mihail.mihajlov.507/")}>
                    <FontAwesome name="facebook" size={30} color="#3b5998" />
                        <Text style={{ color: 'blue' }}>Click here to visit My Facebook account</Text>
                    </TouchableOpacity>

                </Text>
                <Text>LinkedIn:

                    <TouchableOpacity onPress={() => openLink("https://www.linkedin.com/in/mihail-mihailov-3b6255334/")}>
                    <FontAwesome name="linkedin" size={30} color="#0077b5" />
                        <Text style={{ color: 'blue' }}>Click here to visit My LinkedIn account</Text>
                    </TouchableOpacity>

                </Text>
                <Text>Github: 

                    <TouchableOpacity onPress={() => openLink("https://github.com/coffee4urhead")}>
                    <FontAwesome name="github" size={30} color="black" />
                        <Text style={{ color: 'blue' }}>Click here to visit My Github account</Text>
                    </TouchableOpacity>

                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        width: 300,
        height: 600,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
    },
    footerInfo: {
        position: "absolute",
        height: 500,
        width: 300,
        backgroundColor: "#43659C",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 12,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 20,
    }
})