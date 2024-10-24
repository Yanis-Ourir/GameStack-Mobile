import { Card } from "@/components/Card";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <RootView>
        <Row>
          <Image source={require("@/assets/images/place_holder_logo.png")} style={styles.logo} />
          <ThemedText variant="headline" style={styles.title}>GameStack</ThemedText>
        </Row>
        <Image source={require("@/assets/static_images/WW.webp")} style={styles.landingImage} />
        <Card>
          <ThemedText variant="subtitle">Share your video games list with the community</ThemedText>
          <ThemedText variant="body">GameHub is a platform where you can create and share your video games experience with the world. You can create your own games, share them with the community, and play games created by others.</ThemedText>
        </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    margin: 10,
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  landingImage: {
    width: "100%",
    height: "50%",
    alignSelf: "center",
    borderRadius: 20,
  }
});