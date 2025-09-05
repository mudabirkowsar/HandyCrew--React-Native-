import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import services from '../../../data/services.json';
import SearchBar from '../../components/SearchBar';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';

export default function ServicesScreen({navigation}) {
  const renderService = ({ item }) => (
    <View style={styles.card}>
      {/* Left side image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Right side content */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.categoryText, { color: colors.primary }]}>{item.category}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.detailText}>{item.rating}</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="cash" size={14} color={colors.secondary} />
            <Text style={styles.detailText}>{item.priceRange}</Text>
          </View>
        </View>

        {/* Big bottom button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.85}
        onPress={() => navigation.navigate("ServiceProvidersAllScreen",{category: item.type})}
        >
          <Text style={styles.buttonText}>View All Providers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});



// import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import services from '../../../data/services.json';
// import SearchBar from '../../components/SearchBar';
// import colors from '../../config/colors';

// export default function ServicesScreen() {
//   const renderService = ({ item }) => (
//     <View style={styles.card}>
//       {/* Background Image */}
//       <ImageBackground
//         source={{ uri: item.image }}
//         style={styles.imageBackground}
//         imageStyle={{ borderRadius: 16 }}
//       >
//         {/* Gradient Overlay */}
//         <LinearGradient
//           colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent']}
//           style={styles.overlay}
//         />

//         {/* Content on top of gradient */}
//         <View style={styles.infoContainer}>
//           <View style={styles.headerRow}>
//             <Text style={styles.name}>{item.name}</Text>
//             <View style={styles.categoryBadge}>
//               <Text style={styles.categoryText}>{item.category}</Text>
//             </View>
//           </View>

//           <Text style={styles.description} numberOfLines={2}>
//             {item.description}
//           </Text>

//           <View style={styles.detailsRow}>
//             <View style={styles.detail}>
//               <Ionicons name="star" size={14} color="#FFD700" />
//               <Text style={styles.detailText}>{item.rating}</Text>
//             </View>
//             <View style={styles.detail}>
//               <Ionicons name="cash" size={14} color={colors.secondary} />
//               <Text style={styles.detailText}>{item.priceRange}</Text>
//             </View>
//             <View style={styles.detail}>
//               <Ionicons name="time" size={14} color="#fff" />
//               <Text style={styles.detailText}>{item.estimatedTime}</Text>
//             </View>
//           </View>

//           {/* Big Bottom Button */}
//           <TouchableOpacity style={styles.button} activeOpacity={0.85}>
//             <Text style={styles.buttonText}>View All Providers</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <SearchBar />
//       <FlatList
//         data={services}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderService}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   listContent: {
//     padding: 16,
//     paddingBottom: 120,
//   },
//   card: {
//     borderRadius: 16,
//     marginBottom: 16,
//     overflow: 'hidden',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 6,
//   },
//   imageBackground: {
//     height: 220,
//     justifyContent: 'flex-end',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 16,
//   },
//   infoContainer: {
//     padding: 16,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#fff',
//     flex: 1,
//     marginRight: 6,
//   },
//   categoryBadge: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
//   categoryText: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   description: {
//     fontSize: 13,
//     color: '#f5f5f5',
//     marginBottom: 8,
//   },
//   detailsRow: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   detail: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   detailText: {
//     marginLeft: 4,
//     fontSize: 12,
//     color: '#fff',
//     fontWeight: '500',
//   },
//   button: {
//     backgroundColor: colors.secondary,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 14,
//     textTransform: 'uppercase',
//   },
// });
