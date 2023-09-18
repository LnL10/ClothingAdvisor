import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { db } from '../firebase.config';
import styles from '../styles/styles';

const bgimage = require("../assets/background.png");
const logo = require("../assets/logo.png");

const EditProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersCollectionRef, where('email', '==', user.email)));

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = await getDoc(userDoc.ref);
          if (userData.exists()) {
            const userFields = userData.data();
            setName(userFields.name || '');
            setAddress(userFields.address || '');
            setGender(userFields.gender || '');
          } else {
            setName('');
            setAddress('');
            setGender('');
          }
        } else {
          setName('');
          setAddress('');
          setGender('');
        }
      } else {
        setUser(null);
        setName('');
        setAddress('');
        setGender('');
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleSave = async () => {
    const usersCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(query(usersCollectionRef, where('email', '==', user.email)));

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, 'users', userDoc.id);
      await updateDoc(userRef, {
        name,
        address,
        gender,
      });

      if (newPassword) {
        if (newPassword === confirmPassword) {
          if (newPassword === user.password) {
            Alert.alert('Error', 'The new password cannot be the same as the old!!!');
            return;
          }

          const auth = getAuth();
          await updatePassword(auth.currentUser, newPassword);
        } else {
          Alert.alert('Error', 'The password do not match!!!');
          return;
        }
      }

      navigation.navigate('User', {
        name,
        address,
        gender,
      });
    } else {
      navigation.navigate('User');
    }
  };

  const handleCancel = () => {
    navigation.navigate('User');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgimage} style={styles.background}>
        <View>
          <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', paddingBottom: 40 }}>EDIT PROFILE</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', textAlign: 'left'}}>Name</Text>
          <View style={styles.inputbox4}>
            <AntDesign name="user" size={24} color="black" />
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ width:260,height:100}}/>
          </View>

        <View>
          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Gender</Text>
          <View style={styles.inputbox5}>
            <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
            <TextInput placeholder="Gender" value={gender} onChangeText={setGender} style={{ width:260,height:100}} />
          </View>

          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>New Password</Text>
          <View style={styles.inputbox4}>
            <AntDesign name="lock1" size={24} color="black" />
            <TextInput placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} style={{ width:260,height:100}}/>
          </View>

          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Confirm Password</Text>
          <View style={styles.inputbox4}>
            <AntDesign name="lock1" size={24} color="black" />
            <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={{ width:260,height:100}}/>
          </View>

          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Address</Text>
          <View style={styles.inputbox6}>
            <Ionicons name="home-outline" size={24} color="black" />
            <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={{ width:260,height:100}}/>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.button2} onPress={handleSave}>
              <Text style={{ fontWeight: '600', fontSize: 17, paddingLeft: 110, paddingTop: 10 }}>Save Settings</Text>
            </TouchableOpacity>

            {user && user.uid === 'SLKt03BSnAa3oFztL6CpTSRxh253' && (
              <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("AllClothes")}>
                <FontAwesome5 name='tshirt' size={27} color={'black'} style={{ paddingLeft: 125 }} />
                <Text style={{ fontWeight: '700', fontSize: 17, paddingLeft: 97 }}>Edit Clothes</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.button2} onPress={handleCancel}>
            <Text style={{ fontWeight: '600', fontSize: 17, paddingLeft: 135, paddingTop: 10 }}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EditProfile;
