import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, ScrollView, Dimensions, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icns from './Icns';

const { height } = Dimensions.get('window');

const Dtls = ({ place }) => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("Failed to load favorites:", error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const sF = async (placeToFav) => {
        try {
            const isAlreadyFav = favorites.some((place) => place.name === placeToFav.name);

            let updatedFavorites;

            if (isAlreadyFav) {
                updatedFavorites = favorites.filter((place) => place.name !== placeToFav.name);
            } else {
                updatedFavorites = [...favorites, placeToFav];
            }

            setFavorites(updatedFavorites);

            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack('')}>
                <View style={{width: 17, height: 22, marginRight: 5}}>
                    <Icns type={'back'} light />
                </View>
                <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>

            <ScrollView style={{width: '100%'}}>
                <Image source={place.image} style={styles.image} />

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexDirection: 'row'}}>
                    <Text style={styles.name}>{place.name}</Text>
                    <TouchableOpacity style={{width: 31, height: 28}} onPress={() => sF(place)}>
                        <Icns type={favorites.some((fav) => fav.name === place.name) ? 'fav-saved' : 'fav-not'} light={favorites.some((fav) => fav.name === place.name)} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>Description</Text>

                {
                    place.description.map((desc, i) => (
                        <Text index={i} style={styles.description}>{desc}</Text>
                    ))
                }
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.13,
        padding: 16,
        backgroundColor: '#000',
    },

    backBtn: {
        alignItems: 'center', 
        flexDirection: 'row', 
        position: 'absolute', 
        top: height * 0.07, 
        left: 16
    },

    backBtnText: {
        fontSize: 17,
        color: '#ffcc02',
        fontWeight: '400',
        lineHeight: 22
    },

    image: {
        width: '100%',
        height: height * 0.37,
        borderRadius: 24,
        resizeMode: 'cover',
        marginBottom: 16
    },

    name: {
        fontSize: 24,
        color: '#ffcc02',
        fontWeight: '700',
        lineHeight: 28.64,
        width: '80%'
    },

    subTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 19.09,
        marginBottom: 10
    },

    description: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 19.09,
        marginBottom: 16
    },

})

export default Dtls;