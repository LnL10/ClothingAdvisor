import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from '../screens/Start';
import Register from "../screens/Register";
import Login from "../screens/Login";
import OutfitDayNoLogged from '../screens/OutfitDayNoLogged';
import OutfitDayLogged from '../screens/OutfitDayLogged';
import NavBar from './NavBar';
import AllClothes from '../screens/AllClothes';
import AddClothes from '../screens/AddClothes';
import EditProfile from '../screens/EditProfile';


const Stack = createStackNavigator();


const StackNavigation = () => {
return(
   
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OutfitDayNoLogged" component={OutfitDayNoLogged} />
            <Stack.Screen name="AllClothes" component={AllClothes}/>
            <Stack.Screen name="AddClothes" component={AddClothes}/>
            <Stack.Screen name="OutfitDayLogged" component={NavBar}/>
            <Stack.Screen name="EditProfile" component={EditProfile}/>
        </Stack.Navigator>
    );


}

export default StackNavigation;