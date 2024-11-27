import { Pressable, View, Image, Text, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

export default function Card() {
    return (
        <View style={styles.card}>
            <BlurView
                intensity={50} style={styles.blurContainer}>
                
                <Image
                    source={require("../../assets/images/News article resources/Putin.jpg")}
                    style={styles.imageStyles}
                    resizeMode="cover"
                />

                <View>
                    <Text style={styles.text}>
                        Putin has been captured since the war in Ukraine!
                    </Text>

                    <Text style={[styles.text, { margin: 12 }]}>
                        Vladimir Putin's feelings and motivations during the ongoing war in Ukraine seem deeply tied to his view of Russia's security and his desire to maintain or restore Russian influence over Ukraine.
                    </Text>

                    <Pressable style={styles.mainButton}>
                        <Text style={styles.buttonText}>Click to learn more</Text>
                    </Pressable>
                </View>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        width: 300,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        borderRadius: 12,
        overflow: 'hidden', 
    },
    card: {
        height: 'auto',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    imageStyles: {
        width: "100%",
        height: 200,
        borderRadius: 12,
    },
    text: {
        ...Platform.select({
            ios: {
                fontFamily: "System",
            },
            android: {
                fontFamily: "Roboto",
            },
        }),
        color: 'yellow',
        fontSize: 17,
        fontWeight: 'bold',
    },
    mainButton: {
        marginTop: 15,
        backgroundColor: "#03cafc",
        borderRadius: 12, 
        paddingVertical: 14, 
        paddingHorizontal: 30, 
        justifyContent: "center", 
        alignItems: "center", 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5, 
        height: 70,
    },
    buttonText: {
        color: "white", 
        fontSize: 18,
        fontWeight: 'bold', 
    }
});
