import React from 'react';
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
import LevelsScreen from './src/screens/LevelsScreen';
import GameScreen from './src/screens/GameScreen';
import ProfileScreen from './src/screens/ProfileScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    
    return (
      <NavigationContainer>
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
            <Stack.Screen 
                name="LevelsScreen" 
                component={LevelsScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="GameScreen" 
                component={GameScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ProfileScreen" 
                component={ProfileScreen} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
