import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import TicketsScreen from './src/screens/TicketsScreen';
import AddFlightScreen from './src/screens/AddFlightScreen';
import AddHotelScreen from './src/screens/AddHotelScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import FavTicketsScreen from './src/screens/FavTicketsScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    const [loaderIsEnded, setLoaderIsEnded] = useState(false);

    const loaderAnim = useRef(new Animated.Value(0)).current;

    const firstLoaderImage = require('./src/assets/loaders/1.png');

    const [currentLoader, setCurrentLoader] = useState(firstLoaderImage);
    
    useEffect(() => {
        Animated.timing(loaderAnim, {
            toValue: 1,
            duration: 1500,
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
                    <ImageBackground style={{ flex: 1 }} source={currentLoader}>
                        <View style={styles.container}>
                            <Animated.View style={[styles.imageContainer, { opacity: loaderAnim }]}>
                                <ImageBackground source={currentLoader} style={styles.image} />
                            </Animated.View>
                        </View>
                    </ImageBackground>
                </View>
            ) : (
              <Stack.Navigator initialRouteName="HomeScreen">
                  <Stack.Screen 
                      name="HomeScreen" 
                      component={HomeScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="DetailsScreen" 
                      component={DetailsScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="FavoritesScreen" 
                      component={FavoritesScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="TicketsScreen" 
                      component={TicketsScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="AddFlightScreen" 
                      component={AddFlightScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="AddHotelScreen" 
                      component={AddHotelScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="AddEventScreen" 
                      component={AddEventScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="FavTicketsScreen" 
                      component={FavTicketsScreen} 
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
