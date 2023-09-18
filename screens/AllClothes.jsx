import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/styles";
import { AntDesign } from '@expo/vector-icons';
import { db, storage } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from 'firebase/storage';

const bgimage = require("../assets/back.png");
const logo = require("../assets/logo.png");

const AllClothes = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

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

        const roupasWithImageUrl = await Promise.all(roupas);
        const imageUrls = roupasWithImageUrl.map((roupa) => roupa.imageUrl);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching clothing:', error);
      }
    };

    fetchClothingImages();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgimage} style={styles.background}>
        <View style={{ paddingTop: 70 }}>
          <Image source={logo} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', paddingBottom: 40 }}>All Clothes</Text>
          <View style={{ alignItems: 'center', marginLeft: 10, paddingBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("AddClothes")}>
              <AntDesign name="plus" size={48} />
            </TouchableOpacity>
            <Text style={{ paddingLeft: 5 }}>Add Cloth</Text>
          </View>
        </View>

        

        <FlatList
  numColumns={2}
  data={images}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => setSelectedImage(item)}>
      <Image
        source={{ uri: item }}
        key={index}
        style={{
          width: 150,
          height: 180,
          borderWidth: 2,
          borderColor: 'grey',
          resizeMode: 'contain',
          margin: 8
        }}
      />
    </TouchableOpacity>
  )}
/>



      </ImageBackground>
    </View>
  );
};

export default AllClothes;
