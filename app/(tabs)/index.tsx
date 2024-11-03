import { Card } from "@/components/Card";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { GameDetails } from "@/components/game/GameDetails";
import { findTopTenGames, GameProps } from "@/functions/game";


export default function Index() {
  const colors = useThemeColors();
  const {isPending, isError, data, error} = findTopTenGames();

  const games = data as GameProps[];
 

 
  
  return (
    <RootView>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Row style={styles.header}>
        <Image source={require("@/assets/images/place_holder_logo.png")} style={styles.logo} />
        <ThemedText variant="headline" style={styles.title}>GameStack</ThemedText>
      </Row>

      <Image source={require("@/assets/static_images/WW.webp")} style={styles.landingImage} />

      <View style={styles.content}>
        <Card>
          <ThemedText variant="subtitle" style={[styles.cardTitle, {color: colors.tint}]}>Create and Share Your Video Game Library</ThemedText>
          <ThemedText variant="body" style={[styles.cardText]}>GameStack is the ultimate platform to track your video games, share your experiences, and explore the community's recommendations. Manage your collection, rate games, and discover new titles from fellow gamers.</ThemedText>
          <Image source={require("@/assets/static_images/landing-page-mobile.png")} style={{width: 200, height: 400, alignSelf: "center"}} />
        </Card>

        <Card>
            <ThemedText variant="subtitle" style={[styles.cardTitle, { color: colors.tint }]}>Discover New Games</ThemedText>
            <ThemedText variant="body" style={[styles.cardText]}>Stay up-to-date with new game releases, see what others are playing, and find hidden gems from the community's favorite lists.</ThemedText>
          <Image source={require("@/assets/static_images/landing-page-mobile-2.png")} style={{width: 200, height: 400, alignSelf: "center"}} />
        </Card>

        <Card>
          <ThemedText variant="subtitle" style={[styles.cardTitle, { color: colors.tint }]}>Join the Community</ThemedText>
          <ThemedText variant="body" style={[styles.cardText]}>Create your own personalized game lists and share them with your friends or make them public to get feedback from the community.</ThemedText>
        </Card>

        <TouchableOpacity style={[styles.ctaButton, {backgroundColor: colors.tint}]}>
          <Text style={[styles.ctaText, {color: colors.grayLight}]}>Start Your Game Journey</Text>
        </TouchableOpacity>
      </View>

      <View>
        <ThemedText variant="headline">Popular Games</ThemedText>
        {isPending && <ThemedText variant="body">Loading...</ThemedText>}
        {isError && <ThemedText variant="body">Error : {error.message}</ThemedText>}
        {games && games.map((game) => {
          return (
            <GameDetails
              key={game.id}
              id={game.id}
              name={game.name}
              platforms={game.platforms}
              tags={game.tags}
              releaseDate={game.release_date}
              rating={game.rating}
              image={game.image}
              slug={game.slug}
              />
            );
          })}
      </View>
    </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
  },
  title: {
    textAlign: "center", // Texte en gris clair
    marginVertical: 10,
    fontSize: 28,
  },
  logo: {
    width: 100,
    height: 100,
  },
  landingImage: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: "cover", 
  },
  content: {
    paddingHorizontal: 20,
  },
  cardTitle: { 
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    lineHeight: 22,
  },
  ctaButton: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 30,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
