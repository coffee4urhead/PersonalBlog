import { ImageBackground, ScrollView, SafeAreaView, StatusBar, View, Image, Text, StyleSheet, Platform } from 'react-native';
import Card from "./components/Card"

export default function App() {
  const imageAspectRatio = 16 / 9;

  return (

    <ScrollView>
    <ImageBackground
      source={require("../assets/images/News article resources/stars.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar hidden={false} translucent={true} backgroundColor="darkblue" barStyle="light-content" networkActivityIndicatorVisible={true} showHideTransition="slide" />

      <SafeAreaView style={styles.overlay}>
        <Image source={require("../assets/images/News article resources/PersonalPhoto.jpg")}
          style={[styles.personalImage, { height: 500 / imageAspectRatio, flex: 1, }]}
          resizeMode='cover'>
        </Image>
        <Text style={[styles.text, { position: "absolute", textDecorationLine: "underline", textDecorationStyle: "solid", }]}>Welcome to my personal blog!</Text>
      </SafeAreaView>

      <View style={[styles.overlay, styles.outerBorder]}>
        <View style={styles.innerBorder}>
          <Text style={[styles.text]}>Latest news!</Text>
        </View>
      </View>

    <View style={[styles.overlay]}>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </View>
    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Platform.select({
      "ios": {
        fontFamily: "System",
      },
      "android": {
        fontFamily: "Roboto",
      },
    }),
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  personalImage: {
    width: "90%",
    borderRadius: 12,
    margin: 12,
  },
  outerBorder: {
    borderColor: "#5a03fc",  
    borderRadius: 12,
    borderWidth: 7,
    borderStyle: "solid",
    width: 300,
    marginBlock: 30,
    marginInline: "auto",
    justifyContent: 'center',
    alignItems: 'center', 
  },
  innerBorder: {
    borderColor: "#5a03fc",  
    borderRadius: 12,
    borderWidth: 7, 
    padding: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  }
});