import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useMemo } from "react";
import { stylings, typography } from "../misc/styles";
import { useColors } from "../hooks/useColors";
import Avatar from "./Avatar";
import ScoreBarChart from "../patterns/ScoreBarChart";
import FeedPostReactButton from "./FeedPostReactButton";
import { getAuthorAvatar } from "../utils/helpers";

const FeedCard = ({ data }) => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <FeedPostAvatar author={data.author} />
      <FeedContent contents={data.content} />
      <FeedPostActionButtons data={data} />
    </View>
  );
};
export default FeedCard;

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    container: {
      borderRadius: stylings.borderRadiusSmall,
      backgroundColor: colorScheme.background.cardBg,
      marginVertical: 10,
    },
  });
  return styles;
};
const FeedPostAvatar = ({ author }) => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    avatarName: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#fff",
    },
    avatarHandle: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.caption1.fontSize,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingTop: 10,
    },
  });
  const avatar = useMemo(() => getAuthorAvatar(author), [author]);

  return (
    <View style={styles.container}>
      <Avatar image={avatar} size={40} style={{ margin: 20 }} />
      <View>
        <Text style={styles.avatarName}>{author.name}</Text>
        <Text style={styles.avatarHandle}>{author.handle}</Text>
      </View>
    </View>
  );
};
const FeedContent = ({ contents }) => {
  return (
    <FlatList
      data={contents}
      keyExtractor={(item) => item.id}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      renderItem={({ item }) => <ScoreBarChart data={item} />}
    />
  );
};
const FeedPostActionButtons = ({ data }) => {
  const styles = StyleSheet.create({
    container: { flexDirection: "row", padding: 20, marginBottom: 10 },
  });

  // TODO: Implement the button actions
  const handleAddFav = () => {};
  const handleShare = () => {};
  const handleSearch = () => {};

  return (
    <View style={styles.container}>
      <FeedPostReactButton
        icon="heart"
        counter={data.favCount}
        onPress={handleAddFav}
      />
      <FeedPostReactButton
        icon="send"
        counter={data.shareCount}
        onPress={handleShare}
      />
      <FeedPostReactButton icon="search" onPress={handleSearch} />
    </View>
  );
};
