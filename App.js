import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Start from './screens/Start';
import Register from './screens/Register';
import NavBar from './components/NavBar';
import OutfitDayLogged from './screens/OutfitDayLogged';
import OutfitDayNoLogged from './screens/OutfitDayNoLogged';
import User from './screens/User';
import AllClothes from './screens/AllClothes';
import AddClothes from './screens/AddClothes';
import StackNavigation from './components/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
<NavigationContainer>
    <StackNavigation/>
</NavigationContainer>
//<AddClothes/>
//<AllClothes/>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
