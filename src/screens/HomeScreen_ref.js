import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen_ref = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Image
              source={{ uri: "https://example.com/profile-pic.jpg" }}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.username}>Ethmaster</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            {/* Add your notification icon here */}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>At a glance</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabText}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Top Influencers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Recommended</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.influencersContainer}>
          {/* Repeat this for each influencer */}
          <View style={styles.influencer}>
            <Image
              source={{ uri: "https://example.com/influencer1.jpg" }}
              style={styles.influencerPic}
            />
            <Text style={styles.influencerName}>MMCrypto</Text>
            <Text style={styles.influencerHandle}>@handler</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Feeds</Text>
        <View style={styles.feedCard}>
          <View style={styles.feedHeader}>
            <Image
              source={{ uri: "https://example.com/bobur.jpg" }}
              style={styles.feedProfilePic}
            />
            <View>
              <Text style={styles.feedName}>Bobur</Text>
              <Text style={styles.feedHandle}>@handler</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3.78%</Text>
              <Text style={styles.statLabel}>Sentiment</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95.4%</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>100%</Text>
              <Text style={styles.statLabel}>Reach</Text>
            </View>
          </View>

          <View style={styles.progressBarsContainer}>
            <ProgressBar label="Sentiment" progress={0.43} />
            <ProgressBar label="Score" progress={0.23} />
            <ProgressBar label="Reach" progress={0.95} />
          </View>

          <View style={styles.feedActions}>
            {/* Add your action icons here */}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {/* Add your bottom navigation icons here */}
      </View>
    </View>
  );
};

const ProgressBar = ({ label, progress }) => (
  <View style={styles.progressBarContainer}>
    <Text style={styles.progressLabel}>{label}</Text>
    <LinearGradient
      colors={["#8A2BE2", "#9370DB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.progressBar, { width: `${progress * 100}%` }]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1B25",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeText: {
    color: "#8A8D9F",
    fontSize: 14,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationIcon: {
    // Style your notification icon
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#8A2BE2",
  },
  tabText: {
    color: "#FFFFFF",
  },
  influencersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  influencer: {
    alignItems: "center",
  },
  influencerPic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  influencerName: {
    color: "#FFFFFF",
    marginTop: 5,
  },
  influencerHandle: {
    color: "#8A8D9F",
    fontSize: 12,
  },
  feedCard: {
    backgroundColor: "#252632",
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  feedProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  feedName: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  feedHandle: {
    color: "#8A8D9F",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#8A8D9F",
    fontSize: 12,
  },
  progressBarsContainer: {
    marginTop: 20,
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressLabel: {
    color: "#8A8D9F",
    marginBottom: 5,
  },
  progressBar: {
    height: 30,
    borderRadius: 15,
  },
  feedActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#252632",
  },
});

export default HomeScreen_ref;
