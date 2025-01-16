import { ActivityIndicator, Pressable, View, Image, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';

interface ICardProps {
    postId: number;
    onPress: () => void;
}

export type HomeStackParamList = {
    Home: undefined;
    Account: undefined;
    AccountPostScreen: undefined;
    FullPost: { postId: number }; 
    RegisterScreen: undefined;
    LoginScreen: undefined;
};
  
export default function Card({onPress, postId} : ICardProps) {
    const [loaded, error] = useFonts({
        'lora-bold-italic': require('../../assets/fonts/Lora/static/Lora-BoldItalic.ttf'),
        'lora-bold': require('../../assets/fonts/Lora/static/Lora-Bold.ttf')
      });
    
      useEffect(() => {
        if (!loaded) {
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00416A" />;
          </View>
        }
      }, [loaded, error]);

    return (
        <View style={styles.card}>
                
                <Image
                    source={require("../../assets/images/News article resources/Putin.jpg")}
                    style={styles.imageStyles}
                    resizeMode="cover"
                />

                <View>
                    <Text style={[styles.text, {padding: 2, marginBlock: 10}]}>
                        Putin has been captured since the war in Ukraine!
                    </Text>

                    <Text style={[styles.text, { margin: 12 }]}>
                        Vladimir Putin's feelings and motivations during the ongoing war in Ukraine seem deeply tied to his view of Russia's security and his desire to maintain or restore Russian influence over Ukraine.
                    </Text>

                    <Pressable style={styles.mainButton} onPress={onPress}>
                        <Text style={styles.buttonText}>Click to learn more</Text>
                    </Pressable>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 'auto',
        width: 350,
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
        fontFamily: "lora-bold",
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    mainButton: {
        marginTop: 15,
        backgroundColor: "#DBA027",
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
        height: 50,
    },
    buttonText: {
        color: "white", 
        fontSize: 18,
        fontWeight: 'bold', 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
