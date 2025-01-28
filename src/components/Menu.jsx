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

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'HomeScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('HomeScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'1'} active={activeButton === 'HomeScreen'}/>
                    </View>
                    {activeButton === 'HomeScreen' && <Text style={styles.activeBtnText}>Places</Text>}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'TicketsScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('TicketsScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'2'} active={activeButton === 'TicketsScreen'}/>
                    </View>
                    {activeButton === 'TicketsScreen' && <Text style={styles.activeBtnText}>Tickets</Text>}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'LevelsScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('LevelsScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'3'} active={activeButton === 'LevelsScreen'}/>
                    </View>
                    {activeButton === 'LevelsScreen' && <Text style={styles.activeBtnText}>Game</Text>}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'ProfileScreen' && styles.activeBtn]} 
                    onPress={() => handleNavigate('ProfileScreen')}>
                    <View style={{width: 24, height: 24}}>
                        <Icons type={'4'} active={activeButton === 'ProfileScreen'}/>
                    </View>
                    {activeButton === 'ProfileScreen' && <Text style={styles.activeBtnText}>Tools</Text>}
                </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 350,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        height: 56,
        flexDirection: 'row',
        backgroundColor: '#1c1c1c',
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

    activeBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffdc00',
        borderRadius: 100,
        width: 'auto',
        height: 'auto',
    },

    activeBtnText: {
        color: '#000',
        fontSize: 11,
        marginLeft: 4,
        fontWeight: '700',
        lineHeight: 15
    }
});

export default Menu;
