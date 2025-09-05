import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import SearchBar from '../../components/SearchBar';
import BannerCarousel from '../../components/BannerCarousel';
import ServicesList from '../../components/ServicesList';
import WelcomeMessage from '../../components/WelcomeMessage';
// Local images for banners
const banners = [
  { id: '1', image: require('../../../assets/banner/banner1.png') },
  { id: '2', image: require('../../../assets/banner/banner2.png') },
  { id: '3', image: require('../../../assets/banner/banner3.png') },
];

// Local images for services
const services = [
  { id: '1', name: 'Plumbing', icon: require('../../../assets/profile/plumber.png') },
  { id: '2', name: 'Electrical', icon: require('../../../assets/profile/electrical.png') },
  { id: '3', name: 'Mechanical', icon: require('../../../assets/profile/mechinical.png') },
  { id: '4', name: 'Cleaning', icon: require('../../../assets/profile/cleaner.png') },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 80 }}>
        <WelcomeMessage />
        <BannerCarousel banners={banners} />
        <ServicesList services={services} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#a03434',
    marginTop: 30,
  },
});
