import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icns from './Icns';

const M = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HScrn');

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
                    style={[styles.button, activeButton === 'HScrn' && styles.activeBtn]} 
                    onPress={() => handleNavigate('HScrn')}>
                    <View style={{width: 24, height: 24}}>
                        <Icns type={'1'} active={activeButton === 'HScrn'}/>
                    </View>
                    {activeButton === 'HScrn' && <Text style={styles.activeBtnText}>Places</Text>}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'TScrn' && styles.activeBtn]} 
                    onPress={() => handleNavigate('TScrn')}>
                    <View style={{width: 24, height: 24}}>
                        <Icns type={'2'} active={activeButton === 'TScrn'}/>
                    </View>
                    {activeButton === 'TScrn' && <Text style={styles.activeBtnText}>Tickets</Text>}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'PrflScrn' && styles.activeBtn]} 
                    onPress={() => handleNavigate('PrflScrn')}>
                    <View style={{width: 24, height: 24}}>
                        <Icns type={'4'} active={activeButton === 'PrflScrn'}/>
                    </View>
                    {activeButton === 'PrflScrn' && <Text style={styles.activeBtnText}>Tools</Text>}
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

export default M;
