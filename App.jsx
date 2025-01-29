import React from 'react';
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
import LvlsScrn from './src/screens/LvlsScrn';
import GScrn from './src/screens/GScrn';
import PrflScrn from './src/screens/PrflScrn';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    
    return (
      <NavigationContainer>
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
                name="LvlsScrn" 
                component={LvlsScrn} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="GScrn" 
                component={GScrn} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="PrflScrn" 
                component={PrflScrn} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
