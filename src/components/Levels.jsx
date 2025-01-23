import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import game from "../constants/game";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Levels = () => {
    const navigation = useNavigation();
    const [levels, setLevels] = useState([]);

    const initializeLevels = async () => {
        try {
            const storedLevels = await AsyncStorage.getItem("levels");
            if (storedLevels) {
                setLevels(JSON.parse(storedLevels));
            } else {
                const initialLevels = game.map((item, index) => ({
                    level: item.level,
                    success: false,
                    fail: false,
                    open: index === 0
                }));
                setLevels(initialLevels);
                await AsyncStorage.setItem("levels", JSON.stringify(initialLevels));
            }
        } catch (error) {
            console.error("Error initializing levels:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            initializeLevels();
        }, [])
    );

    const handleLevelPress = async (item) => {
        try {
            navigation.navigate("GameScreen", { item });
        } catch (error) {
            console.error("Error navigating to level:", error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.upperContainer}>
                <Text style={styles.upperText}>Oostende game</Text>
            </View>

            <ScrollView style={{width: '100%', paddingHorizontal: 16}}>
                {levels.map((level, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleLevelPress(game.find(g => g.level === level.level))}
                        style={[
                            styles.btn,
                            !level.open && {opacity: 0.4},
                            level.open && !level.success && {backgroundColor: '#ffcc02'}
                        ]}
                        disabled={!level.open}
                    >
                        <View style={[level.success ? {width: 32, height: 32, marginRight: 10} : {width: 24, height: 24, marginRight: 10}]}>
                            <Icons type={level.success ? 'success' : !level.open ? 'locked' : ''} />
                        </View>
                        <Text style={[styles.btnText, level.open && !level.success && {marginLeft: -30}]}>LVL {level.level}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },

    upperContainer: {
        width: '100%',
        paddingTop: height * 0.07,
        paddingBottom: 16,
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 40,
        backgroundColor: '#fff'
    },

    upperText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#000',
        lineHeight: 33.4
    },

    btn: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 24,
        flexDirection: 'row'
    },

    btnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        lineHeight: 19.1
    }

})

export default Levels;