import React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from './Card';
import Footer from './Footer';
import PostContents from "./PostContents"
import { IPostProps } from './PostContents';

interface FullPostRouteProp extends RouteProp<HomeStackParamList, 'FullPost'> { }

interface IFullPostProps {
  route: FullPostRouteProp;
}

export default function FullPost({ route }: IFullPostProps) {
  const { postId } = route.params;
  const imageAspectRatio = 12 / 9;

  let postData: IPostProps = {
    title: "War in Ukraine",
    subtitles: [
      "43,000 troops killed in war with Russia, Zelensky says",
      "What about the Ukrainian soldiers",
      "Controlled areas by Russia during the two-year war",
      "The Ukrainian president is thought to have been compelled to make the admission",
      "The UK's defence ministry says Russia suffered 45,680 casualties in November alone",
      "Russian forces continue to make incremental advances along the eastern front line",
    ],
    text: [
      "Some 43,000 Ukrainian soldiers have been killed since Russia's full-scale invasion began, Volodymyr Zelensky has said in a rare admission of the extent of the nation's casualties.",
      "In a post on social media, the Ukrainian president said 370,000 injuries had been reported, though this figure included soldiers who had been hurt more than once and some of the injuries were said to be minor.",
      "He also claimed that 198,000 Russian soldiers had been killed and a further 550,000 wounded.",
      "The BBC has not been able to verify either side's figures.",
      "While both Kyiv and Moscow have regularly published estimates of the other side's losses, they have been reluctant to detail their own.",
      "The new figure marks a significant increase in Ukrainian deaths since the start of the year.",
      "The last time Zelensky gave an update on Ukraine's casualties was in February, when he put deaths at 31,000.",
      "The Ukrainian president is thought to have been compelled to make the admission after incoming US President-elect Donald Trump wrote on social media that Ukraine had \"ridiculously lost\" 400,000 soldiers, while close to 600,000 Russians had been killed or wounded. Trump did not state where these figures were from.",
      "The incoming president, who has long made clear he wants to bring an end to the war, said too many lives had been \"needlessly wasted.\"",
      "Zelensky's estimates of Russian losses are similar to those provided by senior Western officials, who estimate Russia has suffered around 800,000 casualties, both killed and injured.",
      "The UK's defence ministry says Russia suffered 45,680 casualties in November alone - more than during any month since its full-scale invasion began in February 2022. According to the latest UK Defence Intelligence estimates, an average of 1,523 Russian soldiers are being killed and wounded every day.",
      "Russian forces continue to make incremental advances along the eastern front line, capturing and retaking about 2,350 sq km of territory (907 sq miles) in eastern Ukraine and in Russia's western Kursk region since the start of the year. Ukrainian forces maintain control over a small amount of Russian territory which was captured during a surprise offensive into Russia in August.",
    ],
    images: [
      {
        src: "../../assets/images/News article resources/RussiaWar.png",
        imageCaption: "Title image of war events."
      },
      {
        src: "../../assets/images/News article resources/russianWar.webp",
        imageCaption: "Controlled areas by Russia during the two-year war."
      },
      {
        src: "../../assets/images/News article resources/UkraineWar.jpg",
        imageCaption: "Picture of Ukrainian soldiers after an attack on Ukrainian territory."
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/News article resources/stars.webp')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {postData && (
            <PostContents
              title={postData.title}
              subtitles={postData.subtitles}
              text={postData.text}
              images={postData.images}
            />
          )}
          <Footer />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});