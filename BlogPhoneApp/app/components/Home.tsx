import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StatusBar, View, Image, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import Card from './Card';
import Footer from "./Footer"

export default function Home() {

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



  const imageAspectRatio = 12 / 9;

  return (
    <View style={styles.background}>
      <StatusBar hidden={false} translucent={true} backgroundColor="darkblue" barStyle="light-content" networkActivityIndicatorVisible={true} showHideTransition="slide" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#F8C741', '#F14E2A']}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.overlay}>
            <Image
              source={require('../../assets/images/News article resources/PersonalPhoto.jpg')}
              style={[styles.personalImage, { height: 500 / imageAspectRatio }]}
              resizeMode="cover"
            />
            <Text style={[styles.text, { position: 'absolute', textDecorationLine: 'underline', fontFamily: "fancy-font" }]}>
              Welcome to my personal blog!
            </Text>
          </SafeAreaView>

          <View style={[styles.overlay, styles.outerBorder]}>
            <View style={styles.innerBorder}>
              <Text style={[styles.header, { fontFamily: "lora-bold" }]}>Latest news!!!</Text>
            </View>
          </View>


            <Image source={require("../../assets/images/News article resources/Moon.webp")} style={[styles.picEffect, {top: 500, right: 150}]}></Image>
            <Image source={require("../../assets/images/News article resources/Saturn.webp")} style={[styles.picEffect, {top: 1200, right: 50}]}></Image>
            <Image source={require("../../assets/images/News article resources/Saturn01.png")} style={[styles.picEffect, {top: 1700, left: 100}]}></Image>

          <View style={styles.overlay}>
            <Card />
            <Card />
            <Card />
            <Card />
          </View>

          <Footer/>
        </LinearGradient>
      </ScrollView>
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
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  personalImage: {
    borderRadius: 12,
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
});
