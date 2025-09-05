// src/components/BannerCarousel.js
import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';

const { width } = Dimensions.get('window');

export default function BannerCarousel({ banners }) {
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      setActiveIndex(nextIndex);
      if (bannerRef.current) {
        bannerRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex, banners.length]);

  const renderBanner = ({ item }) => (
    <View style={styles.bannerWrapper}>
      <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        style={styles.gradientOverlay}
      />
    </View>
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={bannerRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderBanner}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
      />

      {/* Animated Dots */}
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => {
          const scale = activeIndex === index ? 1.3 : 1;
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: activeIndex === index ? colors.primary : colors.border,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  bannerWrapper: {
    width: width - 40,
    height: 180,
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: 'hidden', // Ensures gradient and image respect border radius
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
