// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import { useNavigation } from '@react-navigation/native';
// import MapView, { Marker } from 'react-native-maps';
// import places from '../constants/places';
// import Icns from "./Icns";

// const { height } = Dimensions.get('window');

// const H = () => {
//     const navigation = useNavigation();
//     const [button, setButton] = useState('map');
//     const [favorites, setFavorites] = useState([]);
//     const [selectedPlace, setSelectedPlace] = useState(null);

//     const lF = async () => {
//         try {
//             const storedFavorites = await AsyncStorage.getItem('favorites');
//             if (storedFavorites) {
//                 setFavorites(JSON.parse(storedFavorites));
//             }
//         } catch (error) {
//             console.error("Failed to load favorites:", error);
//         }
//     };

//     useEffect(() => {
//         lF();
//     }, []);

//     const sF = async (placeToFav) => {
//         try {
//             const isAlreadyFav = favorites.some((place) => place.name === placeToFav.name);

//             let updatedFavorites;

//             if (isAlreadyFav) {
//                 updatedFavorites = favorites.filter((place) => place.name !== placeToFav.name);
//             } else {
//                 updatedFavorites = [...favorites, placeToFav];
//             }

//             setFavorites(updatedFavorites);

//             await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//         } catch (error) {
//             console.error('Error updating favorites:', error);
//         }
//     };

//     const handlePlacePin = (place) => {
//         if(selectedPlace != null) {
//             setSelectedPlace(null)
//         } else {
//             setSelectedPlace(place)
//         }
//     }

//     return (
//         <View style={styles.container}>

//             <View style={{width: '100%', alignItems: 'center', paddingHorizontal: 16}}>
//                 <View style={styles.upperPanel}>
//                     <Text style={styles.upperText}>Oostende Travel</Text>
//                     <TouchableOpacity style={styles.favIcon} onPress={() => navigation.navigate('FvrtsScrn')}>
//                         <Icns type={'fav'} />
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.toolsContainer}>
//                     <TouchableOpacity style={[styles.toolBtn, button === 'map' && {backgroundColor: '#ffcc02'}]} onPress={() => setButton('map')}>
//                         <Text style={styles.toolBtnText}>Map</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={[styles.toolBtn, button === 'list' && {backgroundColor: '#ffcc02'}]}  onPress={() => setButton('list')}>
//                         <Text style={styles.toolBtnText}>List</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {
//                 button === 'map' ? (
//                     <View style={styles.mapContainer}>
//                         <MapView
//                             style={StyleSheet.absoluteFillObject}
//                             initialRegion={{
//                                 latitude: 51.2258565,
//                                 longitude: 2.919496,
//                                 latitudeDelta: 0.05,
//                                 longitudeDelta: 0.05,
//                             }}
//                         >
//                             {places.map((place, index) => (
//                                 <Marker
//                                     key={index}
//                                     coordinate={{
//                                         latitude: place.coordinates[0].lat,
//                                         longitude: place.coordinates[0].lang,
//                                     }}
//                                     onPress={() => handlePlacePin(place)}
//                                 >
//                                     <View style={{
//                                         width: selectedPlace?.name === place.name ? 50 : 26,
//                                         height: selectedPlace?.name === place.name ? 61 : 32,
//                                     }}>
//                                         <Icns type={'pin'} />
//                                     </View>
//                                 </Marker>
//                             ))}
//                         </MapView>
//                         {selectedPlace && (
//                             <View style={[styles.placeCard, {position: 'absolute', bottom: 100, width: '91%', left: 16}]}>
//                                 <Image source={selectedPlace.image} style={styles.placeImage} />
//                                 <Text style={styles.placeName}>{selectedPlace.name}</Text>
//                                 <Text style={styles.placeDesc} numberOfLines={2}>{selectedPlace.description[0]}</Text>
//                                 <TouchableOpacity style={styles.moreBtn} onPress={() => navigation.navigate('DtlsScrn', { place: selectedPlace })}>
//                                     <Text style={styles.moreBtnText}>Read more</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.placeFav} onPress={() => sF(selectedPlace)}>
//                                     <Icns type={favorites.some((fav) => fav.name === selectedPlace.name) ? 'fav-saved' : 'fav-not'} />
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                     </View>
//                 ) : (
//                     <ScrollView style={{width: '100%', padding: 16, backgroundColor: '#000'}}>
//                         {
//                             places.map((place, index) => (
//                                 <View key={index} style={styles.placeCard}>
//                                     <Image source={place.image} style={styles.placeImage} />
//                                     <Text style={styles.placeName}>{place.name}</Text>
//                                     <Text style={styles.placeDesc} numberOfLines={1} ellipsizeMode='tail'>{place.description}</Text>
//                                     <TouchableOpacity style={styles.moreBtn} onPress={() => navigation.navigate('DtlsScrn', {place: place})}>
//                                         <Text style={styles.moreBtnText}>Read more</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.placeFav} onPress={() => sF(place)}>
//                                         <Icns type={favorites.some((fav) => fav.name === place.name) ? 'fav-saved' : 'fav-not'} light={favorites.some((fav) => fav.name === place.name)}  />
//                                     </TouchableOpacity>
//                                 </View>
//                             ))
//                         }
//                         <View style={{height: 120}} />
//                     </ScrollView>
//                 )
//             }

//         </View>
//     )
// };

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         paddingTop: height * 0.07,
//         alignItems: 'center',
//         backgroundColor: '#000'
//     },

//     upperPanel: {
//         width: '100%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 16
//     },

//     upperText: {
//         fontSize: 27,
//         fontWeight: '800',
//         color: '#fff',
//         lineHeight: 33.41
//     },

//     favIcon: {
//         width: 47,
//         height: 44,
//         padding: 11,
//         borderRadius: 12,
//         backgroundColor: '#ffcc02'
//     },

//     toolsContainer: {
//         width: '100%',
//         flexDirection: 'row',
//         padding: 2,
//         backgroundColor: '#ececec',
//         borderRadius: 12,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 16
//     },

//     toolBtn: {
//         width: '50%',
//         padding: 9,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 12
//     },

//     toolBtnText: {
//         fontSize: 13,
//         fontWeight: '600',
//         color: '#000',
//         lineHeight: 18
//     },

//     placeCard: {
//         width: '100%',
//         padding: 16,
//         borderRadius: 20,
//         backgroundColor: '#1c1c1c',
//         marginBottom: 16,
//         alignItems: 'flex-start',
//     },

//     placeImage: {
//         width: '100%',
//         height: 122,
//         borderRadius: 12,
//         resizeMode: 'cover',
//         marginBottom: 16
//     },

//     placeName: {
//         fontSize: 15,
//         fontWeight: '700',
//         color: '#fff',
//         lineHeight: 17.9,
//         marginBottom: 6,
//     },

//     placeDesc: {
//         fontSize: 13,
//         fontWeight: '400',
//         color: '#fff',
//         lineHeight: 15.5,
//         marginBottom: 6,
//         width: 286,
//     },

//     moreBtnText: {
//         fontSize: 13,
//         fontWeight: '400',
//         color: '#ffcc02',
//         lineHeight: 15.5,
//     },

//     placeFav: {
//         width: 25,
//         height: 22,
//         position: 'absolute',
//         right: 16,
//         bottom: 54
//     },

//     mapContainer: {
//         width: '100%',
//         height: '82%'
//     }


// })

// export default H;