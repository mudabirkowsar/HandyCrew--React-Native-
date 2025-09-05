import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import SearchBar from '../../components/SearchBar';
import BannerCarousel from '../../components/BannerCarousel';
import ServicesList from '../../components/ServicesList';
import WelcomeMessage from '../../components/WelcomeMessage';
import YouMayLike from '../../components/YouMayLike';
// Local images for banners
const banners = [
  { id: '5', image: require('../../../assets/banner/banner6.png') },
  { id: '1', image: require('../../../assets/banner/banner5.png') },
  { id: '2', image: require('../../../assets/banner/banner2.png') },
  { id: '3', image: require('../../../assets/banner/banner3.png') },
  { id: '4', image: require('../../../assets/banner/banner4.png') },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView style={{ flex: 1 }}>
        <WelcomeMessage />
        <BannerCarousel banners={banners} />
        <YouMayLike />
        <ServicesList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background || '#a03434',
    backgroundColor:"#fff",
    // marginTop: 30,
  },
});
