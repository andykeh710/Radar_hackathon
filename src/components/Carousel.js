import React, {useState} from 'react';
import {View, FlatList, StyleSheet, useColorScheme, useWindowDimensions} from 'react-native';
import { getIndexFromFlatlist } from '../utils/helpers';
import OnboardingItems from './OnboardingItems';
import features from '../data/features';
import { theme } from '../misc/styles';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {width} = useWindowDimensions();
    const ITEM_WIDTH = width;
    const styles = useStyle();
    const colorScheme = useColorScheme();

    const handleScroll = (event) => {
        const newIndex = getIndexFromFlatlist(event);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      };

    return (
        <View style={styles.carouselContainer}>
        <FlatList
          data={features}
          keyExtractor={(item) => item.id}
          bounces={false}
          pagingEnabled
          horizontal
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <OnboardingItems item={item} />}
          onScroll={handleScroll}
        />
        <View style={styles.pagination}>
          {features.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && {
                  backgroundColor:
                    colorScheme === "light"
                      ? theme.light.text.primary
                      : theme.dark.text.primary,
                  opacity: 1,
                },
              ]}
            />
          ))}
        </View>
      </View>
    )
}

const useStyle = () => {
    const colorScheme = useColorScheme();
    const DOT_SIZE = 4;
    const styles = StyleSheet.create({
        carouselContainer: {
            flex: 1,
          },
          dot: {
            borderRadius: 100,
            height: DOT_SIZE,
            width: DOT_SIZE,
            padding: DOT_SIZE,
            margin: 5,
            opacity: 0.3,
            backgroundColor:
              colorScheme === "light"
                ? theme.light.text.secondary
                : theme.dark.text.secondary,
          },
          pagination: {
            flexDirection: "row",
            justifyContent: "center",
            flex: 0.2,
          },
    })
    return styles;
}

export default Carousel