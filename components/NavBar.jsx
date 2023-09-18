import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



import OutfitDayLogged from '../screens/OutfitDayLogged';
import User from '../screens/User';



const homeName = "OutfitDay";
const detailsName = "User";


const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    //<NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
            tabBarStyle:{
                backgroundColor:"whitesmoke"
            },

            tabBarShowLabel:false,

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused = 'home';

            } else if (rn === detailsName) {
              iconName = 'person';

            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1e90ff',
        }}>

        <Tab.Screen name={homeName} component={OutfitDayLogged} options={{headerShown:false}}/>
        <Tab.Screen name={detailsName} component={User} options={{headerShown:false}}/>
        

      </Tab.Navigator>
    //</NavigationContainer>
  );
}

export default NavBar;