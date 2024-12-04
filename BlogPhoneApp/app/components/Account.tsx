import { Text, View, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Card from "./Card"
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from "./Card"


export default function Account() {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    
    const handleNavigateToFullPost = (paramNav: NativeStackNavigationProp<HomeStackParamList>, postId: number) => {
        paramNav.navigate('FullPost', { postId });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <LinearGradient
                    colors={['#F8C741', '#F14E2A']}
                    start={{ x: 1, y: 0.5 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.gradient}>
                    <View style={styles.headSection}>
                        <Text style={styles.importantText}>Mihail Mihaylov</Text>

                        <Image source={require("../../assets/images/News article resources/Putin.jpg")} style={styles.accountImage}></Image>

                        <Text style={styles.importantText}>Badges earned: </Text>

                        {/* These image badges could be made into components so that state of the user could be managed more efficiently */}

                        <View style={styles.badgeContainer}>
                            <Image source={require("../../assets/images/News article resources/iconBadges/creativity.png")} style={styles.badges}></Image>
                            <Image source={require("../../assets/images/News article resources/iconBadges/january.png")} style={styles.badges}></Image>
                            <Image source={require("../../assets/images/News article resources/iconBadges/february.png")} style={styles.badges}></Image>
                            <Image source={require("../../assets/images/News article resources/iconBadges/march.png")} style={styles.badges}></Image>
                            <Image source={require("../../assets/images/News article resources/iconBadges/rocket.png")} style={styles.badges}></Image>
                        </View>
                        <View>
                            <Text style={styles.importantText}>
                                Post Collections
                            </Text>

                            <View style={styles.postCards}>
                                <Card postId={1} onPress={() => handleNavigateToFullPost(navigation, 1)} />
                                <Card postId={2} onPress={() => handleNavigateToFullPost(navigation, 2)}/>
                                <Card postId={3} onPress={() => handleNavigateToFullPost(navigation, 3)}/>
                                <Card postId={4} onPress={() => handleNavigateToFullPost(navigation, 4)}/>
                                <Card postId={5} onPress={() => handleNavigateToFullPost(navigation, 5)}/>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postCards: {
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    accountImage: {
        width: 300,
        height: 300,
        borderRadius: 12,
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    },
    headSection: {
        justifyContent: "space-between",
        gap: 25,
        alignItems: "center",
    },
    importantText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 12,
    },
    badgeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        backgroundColor: "lightblue",
        gap: 20,
        alignItems: "center",
    },
    badges: {
        width: 100,
        height: 100,
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        backgroundColor: "none",
    }
});