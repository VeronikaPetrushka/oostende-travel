import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HScrn from './src/screens/HScrn';
import DtlsScrn from './src/screens/DtlsScrn';
import FvrtsScrn from './src/screens/FvrtsScrn';
import TScrn from './src/screens/TScrn';
import AFScrn from './src/screens/AFScrn';
import AHScrn from './src/screens/AHScrn';
import AEScrn from './src/screens/AEScrn';
import FvrtTScrn from './src/screens/FvrtTScren';
import PrflScrn from './src/screens/PrflScrn';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    const [loaderIsEnded, setLoaderIsEnded] = useState(false);

    const loaderAnim = useRef(new Animated.Value(0)).current;

    const loader = require('./src/assets/loader.png');

    useEffect(() => {
        Animated.timing(loaderAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
                setLoaderIsEnded(true);
            });
    }, []);
    
    return (
      <NavigationContainer>
         {
            !loaderIsEnded ? (
                <View style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1 }} source={loader}>
                        <View style={styles.container}>
                            <Animated.View style={[styles.imageContainer, { opacity: loaderAnim }]}>
                                <ImageBackground source={loader} style={styles.image} />
                            </Animated.View>
                        </View>
                    </ImageBackground>
                </View>
            ) : (
                <Stack.Navigator initialRouteName="HScrn">
                    <Stack.Screen 
                        name="HScrn" 
                        component={HScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="DtlsScrn" 
                        component={DtlsScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="FvrtsScrn" 
                        component={FvrtsScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="TScrn" 
                        component={TScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="AFScrn" 
                        component={AFScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="AHScrn" 
                        component={AHScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="AEScrn" 
                        component={AEScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="FvrtTScrn" 
                        component={FvrtTScrn} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="PrflScrn" 
                        component={PrflScrn} 
                        options={{ headerShown: false }} 
                    />
                </Stack.Navigator>
        )
    }
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default App;