import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export interface IPostProps {
  title: string;
  subtitles: string[];
  text: string[];
  images: { src: string; imageCaption: string }[];
}

type ContentItem =
  | { type: "text"; content: string }
  | { type: "subtitle"; content: string }
  | { type: "image"; content: { src: string; imageCaption: string } };

export default function PostContent({ title, subtitles, text, images }: IPostProps) {
  const combinedContent: ContentItem[] = text.map((paragraph) => ({
    type: "text",
    content: paragraph,
  }));

  subtitles.forEach((subtitle) => {
    const randomIndex = Math.floor(Math.random() * combinedContent.length);
    combinedContent.splice(randomIndex, 0, { type: "subtitle", content: subtitle });
  });

  images.forEach((image) => {
    const randomIndex = Math.floor(Math.random() * combinedContent.length);
    combinedContent.splice(randomIndex, 0, { type: "image", content: image });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {combinedContent.map((item, index) => {
        switch (item.type) {
          case "text":
            return (
              <Text key={index} style={styles.text}>
                {item.content}
              </Text>
            );
          case "subtitle":
            return (
              <Text key={index} style={styles.subtitle}>
                {item.content}
              </Text>
            );
          case "image":
            return (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: item.content.src }} style={styles.image} />
                <Text style={styles.caption}>{item.content.imageCaption}</Text>
              </View>
            );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: "#fff", borderRadius: 8 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
    subtitle: { fontSize: 18, fontStyle: "italic", color: "#666", marginBottom: 16 },
    text: { fontSize: 16, lineHeight: 24, color: "#333", marginBottom: 12 },
    imageContainer: { marginBottom: 16 },
    image: { width: "100%", height: 200, borderRadius: 8 },
    caption: { fontSize: 14, color: "#555", fontStyle: "italic", textAlign: "center", marginTop: 4 },
  });
