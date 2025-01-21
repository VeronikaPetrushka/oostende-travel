import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'PlacesScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('PlacesScreen')}>
                    <Icons type={'1'} active={activeButton === 'PlacesScreen'}/>
                    {activeButton === 'PlacesScreen' && <Text>Places</Text> }
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'TicketsScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('TicketsScreen')}>
                    <Icons type={'2'} active={activeButton === 'TicketsScreen'}/>
                    {activeButton === 'TicketsScreen' && <Text>Tickets</Text> }
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'GameScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('GameScreen')}>
                    <Icons type={'4'} active={activeButton === 'GameScreen'}/>
                    {activeButton === 'GameScreen' && <Text>Game</Text> }
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'ProfileScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('ProfileScreen')}>
                    <Icons type={'5'} active={activeButton === 'ProfileScreen'}/>
                    {activeButton === 'ProfileScreen' && <Text>Profile</Text> }
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 290,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
        height: 62,
        flexDirection: 'row',
        backgroundColor: '#ff6059',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 100,
        alignSelf: "center",
    },
    
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button: {
        width: 35,
        height: 35,
        padding: 5
    },

    addBtn: {
        width: 80,
        height: 80,
        padding: 19,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
});

export default Menu;
