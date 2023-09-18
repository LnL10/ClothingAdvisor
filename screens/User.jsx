import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

import styles from "../styles/styles";
import { db } from "../firebase.config";


const bgimage = require("../assets/background.png");
const logo = require("../assets/logo.png");

const User = ({ navigation,route }) => {

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

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
            setName(userFields.name || "");
            setAddress(userFields.address || "");
            setGender(userFields.gender || "");
          } else {
            setName("");
            setAddress("");
            setGender("");
          }
        } else {
          setName("");
          setAddress("");
          setGender("");
        }
      } else {
        setUser(null);
        setName("");
        setAddress("");
        setGender("");
      }
    });

    return () => {
      unsubscribeAuth();
    };
    
  }, []);
  useEffect(() => {
    if (route.params) {
      const { name, address, gender } = route.params;
      setName(name || "");
      setAddress(address || "");
      setGender(gender || "");
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgimage} style={styles.background}>
        <View>
          <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>USER PROFILE</Text>
        </View>

        <View>
          <FontAwesome5 name="user-edit" style={styles.icon2} size={96} color="black" />
        </View>

        <View>
          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Your Name</Text>
          <View style={styles.inputbox2}>
            <AntDesign name="user" size={24} color="black" />
            <Text style={{ fontWeight: '500', paddingLeft: 25 }}>{name}</Text>
          </View>

          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Gender</Text>
          <View style={styles.inputbox2}>
            <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
            <Text style={{ fontWeight: '500', paddingLeft: 25 }}>{gender}</Text>
          </View>

          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Password</Text>
          <View style={styles.inputbox2}>
            <AntDesign name="lock1" size={24} color="black" />
            <Text style={{ paddingLeft: 25 }}>••••••</Text>
          </View>

          <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Address</Text>
          <View style={styles.inputbox2}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={{ fontWeight: '500', paddingLeft: 25 }}>{address}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.button2}  onPress={() => navigation.navigate("EditProfile")}>
              <SimpleLineIcons name="pencil" size={27} color={'black'} style={{ paddingLeft: 40 }} />
              <Text style={{ fontWeight: '600', fontSize: 17, paddingLeft: 9, paddingTop: 10 }}>Edit Profile</Text>
            </TouchableOpacity>

            {user && user.uid === 'UytcLSMyFbXzWsXyysEqxjU8hmy2' && (
              <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("AllClothes")}>
                <FontAwesome5 name='tshirt' size={27} color={'black'} style={{ paddingLeft: 125 }} />
                <Text style={{ fontWeight: '700', fontSize: 17, paddingLeft: 97, paddingTop: 10 }}>Edit Clothes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default User;
