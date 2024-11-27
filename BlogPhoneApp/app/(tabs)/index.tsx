import { ImageBackground, StatusBar, View, Image, Text, StyleSheet, Platform } from 'react-native';

export default function App() {
  return (

    <ImageBackground
      source={require("../../assets/images/News article resources/stars.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar hidden={false} translucent={true} backgroundColor="darkblue" barStyle="light-content" networkActivityIndicatorVisible={true} showHideTransition="slide" />
      
      <View style={styles.overlay}>
        <Text style={styles.text}>Hello, World!</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
