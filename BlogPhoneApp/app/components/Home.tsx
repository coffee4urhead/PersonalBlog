import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StatusBar, View, Image, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import Card from './Card';

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
            colors={['#E4E5E6', '#00416A']}
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
  
            <View style={styles.overlay}>
              <Card />
              <Card />
              <Card />
              <Card />
            </View>
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
  