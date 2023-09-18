import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/styles";
import { db, storage } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';

const bgimage = require("../assets/back.png");
const logo = require("../assets/logo.png");

const OutfitDayNoLogged = ({ navigation }) => {
  const [headImage, setCabecaImage] = useState(null);
  const [torsoImage, setTroncoImage] = useState(null);
  const [legsImage, setPernasImage] = useState(null);
  const [footwearImage, setCalcadoImage] = useState(null);

  useEffect(() => {
    const fetchClothingImages = async () => {
      try {
        const roupasRef = collection(db, 'clothing');
        const snapshot = await getDocs(roupasRef);

        const roupas = snapshot.docs.map(async (doc) => {
          const roupaData = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, roupaData.imagem));
          return { ...roupaData, imageUrl };
        });

        Promise.all(roupas).then((roupasWithImageUrl) => {
          const filteredRoupasByArea = (area) => roupasWithImageUrl.filter((roupa) => roupa.bodyarea === area);

          const getRandomRoupa = (roupas) => {
            const randomIndex = Math.floor(Math.random() * roupas.length);
            return roupas[randomIndex];
          };

          const headRoupas = filteredRoupasByArea('Cabeça');
          const torsoRoupas = filteredRoupasByArea('Tronco');
          const legsRoupas = filteredRoupasByArea('Pernas');
          const footwearRoupas = filteredRoupasByArea('Calçado');

          const randomHeadRoupa = getRandomRoupa(headRoupas);
          const randomTorsoRoupa = getRandomRoupa(torsoRoupas);
          const randomLegsRoupa = getRandomRoupa(legsRoupas);
          const randomFootwearRoupa = getRandomRoupa(footwearRoupas);

          if (randomHeadRoupa) {
            setCabecaImage(randomHeadRoupa.imageUrl);
          }
          if (randomTorsoRoupa) {
            setTroncoImage(randomTorsoRoupa.imageUrl);
          }
          if (randomLegsRoupa) {
            setPernasImage(randomLegsRoupa.imageUrl);
          }
          if (randomFootwearRoupa) {
            setCalcadoImage(randomFootwearRoupa.imageUrl);
          }
        });
      } catch (error) {
        console.error('Erro ao obter as roupas:', error);
      }
    };

    fetchClothingImages();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgimage} style={styles.background}>
        <Image source={logo} />
        <Text style={styles.text3}>OUTFIT OF THE DAY </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ justifyContent: "center" }}>
            {headImage && (
              <Image source={{ uri: headImage }} style={{ left: 40, top: -120, height: 90, width: 120 }} />
            )}
            {torsoImage && (
              <Image source={{ uri: torsoImage }} style={{ position: "absolute", left: 25, top: -50,height: 150, width: 150 }} />
            )}
            {legsImage && (
              <Image source={{ uri: legsImage }} style={{ top: 10 ,left:20,height: 200, width: 200}} />
            )}
            {footwearImage && (
              <Image source={{ uri: footwearImage }} style={{ justifyContent: "flex-end", left: 40, top: 0 ,height: 100, width: 100}} />
            )}
          </View>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>REGISTER TO HAVE ACCESS TO ANOTHER OUTFITS AND FEATURES</Text>
        <TouchableOpacity style={styles.RegisterBtn} onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: 'white', fontWeight: "bold" }}>REGISTER</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default OutfitDayNoLogged;
