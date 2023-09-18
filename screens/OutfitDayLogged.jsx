import { 
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/styles";
import { AntDesign } from '@expo/vector-icons';
import { db, storage } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const bgimage = require("../assets/back.png");
const logo = require("../assets/logo.png");
const API_KEY = '6ab4ff2b88454e91b22211907230306';
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';


const OutfitDayLogged = () => {
  const [headImage, setCabecaImage] = useState(null);
  const [torsoImage, setTroncoImage] = useState(null);
  const [legsImage, setPernasImage] = useState(null);
  const [footwearImage, setCalcadoImage] = useState(null);
  const [newOutfit, setNewOutfit] = useState(null);
  const [filteredRoupas, setFilteredRoupas] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${WEATHER_API_BASE_URL}/current.json?key=${API_KEY}&q=Braga`,
        );

        const { temp_c: currentTemperature } = response.data.current;
        console.log(currentTemperature);
        fetchClothingImages(currentTemperature);
      } catch (error) {
        console.error('Erro ao obter a temperatura:', error);
        return null;
      }
    };

    const fetchClothingImages = async (currentTemperature) => {
      try {
        const usersCollectionRef = collection(db, 'users');
    let queryRef = query(usersCollectionRef);

    if (user && user.email) {
      queryRef = query(usersCollectionRef, where('email', '==', user.email));
    } 
    

    const querySnapshot = await getDocs(queryRef);
    const userSnapshot = querySnapshot.docs[0];

        if (userSnapshot) {
          const userData = userSnapshot.data();
          console.log(userData.gender)

          const roupasRef = collection(db, 'clothing');
          const snapshot = await getDocs(roupasRef);

          const roupas = snapshot.docs.map(async (doc) => {
            const roupaData = doc.data();
            const storageRef = ref(storage, roupaData.imagem);
            const imageUrl = await getDownloadURL(storageRef); 
            return { ...roupaData, imageUrl };
          });

          const roupasWithImageUrl = await Promise.all(roupas);
          const filteredRoupas = roupasWithImageUrl.filter((roupa) => {
            return roupa.gender === userData.gender && roupa.temperature > currentTemperature;
          });
          
          setFilteredRoupas(filteredRoupas);

          const headRoupa = filteredRoupas.find((roupa) => roupa.bodyarea === 'Cabeça');
          const torsoRoupa = filteredRoupas.find((roupa) => roupa.bodyarea === 'Tronco');
          const legsRoupa = filteredRoupas.find((roupa) => roupa.bodyarea === 'Pernas');
          const footwearRoupa = filteredRoupas.find((roupa) => roupa.bodyarea === 'Calçado');

          if (headRoupa) {
            setCabecaImage(headRoupa.imageUrl);
          }
          if (torsoRoupa) {
            setTroncoImage(torsoRoupa.imageUrl);
          }
          if (legsRoupa) {
            setPernasImage(legsRoupa.imageUrl);
          }
          if (footwearRoupa) {
            setCalcadoImage(footwearRoupa.imageUrl);
          }
        } else {
          console.error('Utilizaor não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao obter as roupas:', error);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchWeather();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSwapOutfit = () => {
    const randomHead = filteredRoupas.filter(roupa => roupa.bodyarea === 'Cabeça');
    const randomTorso = filteredRoupas.filter(roupa => roupa.bodyarea === 'Tronco');
    const randomLegs = filteredRoupas.filter(roupa => roupa.bodyarea === 'Pernas');
    const randomFootwear = filteredRoupas.filter(roupa => roupa.bodyarea === 'Calçado');

    const newHeadRoupa = randomHead[Math.floor(Math.random() * randomHead.length)];
    const newTorsoRoupa = randomTorso[Math.floor(Math.random() * randomTorso.length)];
    const newLegsRoupa = randomLegs[Math.floor(Math.random() * randomLegs.length)];
    const newFootwearRoupa = randomFootwear[Math.floor(Math.random() * randomFootwear.length)];

    if (newHeadRoupa) {
      setCabecaImage(newHeadRoupa.imageUrl);
    }
    if (newTorsoRoupa) {
      setTroncoImage(newTorsoRoupa.imageUrl);
    }
    if (newLegsRoupa) {
      setPernasImage(newLegsRoupa.imageUrl);
    }
    if (newFootwearRoupa) {
      setCalcadoImage(newFootwearRoupa.imageUrl);
    }

    setNewOutfit({
      headRoupa: newHeadRoupa,
      torsoRoupa: newTorsoRoupa,
      legsRoupa: newLegsRoupa,
      footwearRoupa: newFootwearRoupa
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgimage} style={styles.background}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.text2}>OUTFIT OF THE DAY </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{ justifyContent: "center", position: "absolute", left: -60, top: 100 }}>
            <TouchableOpacity onPress={handleSwapOutfit}>
              <AntDesign name="swap" size={40} />
              <Text style={{ fontWeight: "bold", left: -20 }}>Swap Outfit</Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center" }}>
            {headImage && (
              <Image source={{ uri: headImage }} style={{ left: 50, top: -100,height: 90, width: 120 }} />
            )}
            {torsoImage && (
              <Image source={{ uri: torsoImage }} style={{ position: "absolute", left: 25, top: -20 ,height: 150, width: 150 }} />
            )}
            {legsImage && (
              <Image source={{ uri: legsImage }} style={{ top: 30,left:20,height: 200, width: 200}} />
            )}
            {footwearImage && (
              <Image source={{ uri: footwearImage }} style={{ justifyContent: "flex-end", left: 40, top: 30 ,height: 100, width: 100}} />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OutfitDayLogged;
