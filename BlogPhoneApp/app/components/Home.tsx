import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList, Button, Modal, SafeAreaView, StatusBar, View, Image, Text, StyleSheet, Platform, ActivityIndicator, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import Card, { HomeStackParamList } from './Card';
import Footer from "./Footer"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Home() {

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [isUserLoggedIn, setLoginStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNavigateToLogin = () => {
    setModalVisible(false);
    navigation.navigate('LoginScreen');
  };

  const handleNavigateToFullPost = (paramNav: NativeStackNavigationProp<HomeStackParamList>, postId: number) => {
    paramNav.navigate('FullPost', { postId });
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.102:3000/user/logged');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result.loggedIn) {
          setLoginStatus(true);
          console.log("User is logged in!");
        } else {
          setModalVisible(true);
          console.log("User is not logged in!");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);


  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.modalText}>{item}</Text>
    </View>
  );

  const data = ['Get the most recent insights on my personal working projects', 'Be able to post articles that will be controlled by admins', 'Leave comments on existing articles that will also be monitored by admins'];
  const imageAspectRatio = 12 / 9;

  /*<LinearGradient
        colors={['#F8C741', '#F14E2A']}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >*/
  /*
  Color scheme: #27A5DB #276CDB #27DBD8 #5627DB #7199DB 
  */
  return (

    <View style={styles.background}>
      <StatusBar hidden={false} translucent={true} backgroundColor="darkblue" barStyle="light-content" networkActivityIndicatorVisible={true} showHideTransition="slide" />

      <ImageBackground source={require("../../assets/images/News article resources/stars.webp")} resizeMode='cover' style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <SafeAreaView style={styles.overlay}>
            <Image
              source={require('../../assets/images/News article resources/fireplace.jpg')}
              style={[styles.personalImage, { height: 500 / imageAspectRatio }]}
              resizeMode="contain"
            />
            <Text style={[styles.text, { position: 'absolute', textDecorationLine: 'underline', fontFamily: "lora-bold" }]}>
              Welcome to my personal blog!
            </Text>

            <Modal visible={!isUserLoggedIn && modalVisible} transparent={true} animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>You need to log in to access this feature.</Text>
                  <Text style={styles.modalText}>By signing in you can: </Text>

                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()} />

                  <View style={styles.buttonCont}>
                    <Button title="Log In" onPress={handleNavigateToLogin} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                  </View>

                </View>
              </View>
            </Modal>

          </SafeAreaView>

          <View style={[styles.overlay, styles.outerBorder]}>
            <View style={styles.innerBorder}>
              <Text style={styles.header}>Latest news!!!</Text>
            </View>
          </View>


          <Image source={require("../../assets/images/News article resources/Moon.webp")} style={[styles.picEffect, { top: 500, right: 150 }]}></Image>
          <Image source={require("../../assets/images/News article resources/Saturn.webp")} style={[styles.picEffect, { top: 1200, right: 50 }]}></Image>
          <Image source={require("../../assets/images/News article resources/Saturn01.png")} style={[styles.picEffect, { top: 1700, left: 100 }]}></Image>

          <View style={styles.overlay}>
            <Card postId={1} onPress={() => handleNavigateToFullPost(navigation, 1)} />
            <Card postId={2} onPress={() => handleNavigateToFullPost(navigation, 2)} />
            <Card postId={3} onPress={() => handleNavigateToFullPost(navigation, 3)} />
            <Card postId={4} onPress={() => handleNavigateToFullPost(navigation, 4)} />
          </View>

          <Footer />
        </ScrollView>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fada39',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontFamily: "lora-bold",
    fontWeight: 'bold',
  },
  header: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "lora-bold-italic",
  },
  personalImage: {
    borderRadius: 12,
    marginBlock: 12,
  },
  outerBorder: {
    borderColor: '#5a03fc',
    borderRadius: 12,
    borderWidth: 7,
    borderStyle: 'solid',
    width: 300,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picEffect: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400,
  },
  innerBorder: {
    borderColor: '#5a03fc',
    borderRadius: 12,
    borderWidth: 7,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    padding: 12,
    width: 400,
    height: 400,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  buttonCont: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: { fontSize: 20, color: 'white', marginBottom: 24, fontWeight: "bold" },
  listItem: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
  },
});
