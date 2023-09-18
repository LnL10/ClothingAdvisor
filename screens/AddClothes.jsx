import { 
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native";

import styles from "../styles/styles";
import React, { useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import { CheckBox } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import * as ImagePicker from 'expo-image-picker';



const bgimage = require("../assets/background.png");
const logo = require("../assets/logo.png");

const AddClothes = ({navigation}) => {
  
  const [name, setName] = useState("");
  const [colour, setColour] = useState("");
  const [material, setMaterial] = useState("");
  const [bodyarea, setBodyArea] = useState("");
  const [range, setRange] = useState(15);
  const [weather, setWeather] = useState("");
  const [imageUri, setImageUri] = useState(null);
  
    

    const colours = [
            {value: 'Blue'},
            {value: 'Red'},
            {value: 'Green'},
            {value: 'Yellow'},
            {value: 'Pink'},
            {value: 'Purple'},
            {value: 'White'},
            {value: 'Black'},
            {value: 'Grey'},
    ];

    const materials = [
            {value: 'Algodão'},
            {value: 'Poliéster'},
            {value: 'Lã'},
            {value: 'Seda'},
            {value: 'Linho'},
    ];

         const bodyareas = [
            {value: 'Cabeça'},
            {value: 'Tronco'},
            {value: 'Pernas'},
            {value: 'Calçado'},
    ];

        const weathers = [
            {key:'SO', value: 'Dia Solerengo'},
            {key:'CH', value: 'Dia de Chuva'},
            {key:'NE', value: 'Dia de Nevoeiro'},
    ];

        const [male, setMale] = useState(false);
        const [female, setFemale] = useState(false);
        const [other, setOther] = useState(false);
    
        const handleMaleChange = () => {
            setMale(!male);
            setFemale(false);
            setOther(false);
        };
    
        const handleFemaleChange = () => {
            setFemale(!female);
            setMale(false);
            setOther(false);
        };
    
        const handleOtherChange = () => {
            setOther(!other);
            setMale(false);
            setFemale(false);
        };

        
  const handleAddCloth = async () => {
    try {
      const clothData = {
        name: name,
        colour: colour,
        material: material,
        bodyarea: bodyarea,
        temperature: range,
        weather: weather,
        gender: male ? "Male" : female ? "Female" : other ? "Other" : "",
      };

      const docRef = await addDoc(collection(db, "clothing"), clothData);

      console.log("Roupa adicionada com ID:", docRef.id);

      setName("");
      setColour("");
      setMaterial("");
      setBodyArea("");
      setRange(15);
      setWeather("");
      setMale(false);
      setFemale(false);
      setOther(false);

      Alert.alert("Success", "Cloth successfully added!");
    } catch (error) {
      console.error("Erro ao adicionar a roupa:", error);
      Alert.alert("Error", "Failed to add cloth.");
    }
  };

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const selectedImageUri = result.uri;
      setImageUri(selectedImageUri);
    }
  };

        

    return (

       
<View style = {styles.container}>
    <ImageBackground source = {bgimage} style = {styles.background}>
    
         <View>
             <Text style={{fontSize: 33, fontWeight:'bold' , textAlign: 'center', paddingBottom: 40}}>ADD NEW CLOTHES</Text>
        </View>

        <View style={{position: 'absolute', right:0, top:300}}>

        <TouchableOpacity onPress={handleImageSelection}>
            <EvilIcons name="image" size={225} color="black"/>
            <Text style = {{color: 'black', fontSize:20 , fontWeight:'bold', paddingLeft:60}}>ADD IMAGE</Text>  
        </TouchableOpacity>    
        </View>

        <View styles={{flexDirection: 'row'}}>

        <Text style={{fontWeight: 'bold', fontSize: 18}}>Name: </Text>
        <View style = {styles.inputbox3}>
        <TextInput placeholder="Name of the cloth..." autoComplete="name" style={{width:260,height:100 }} value={name}
        onChangeText={setName}/>
        </View>

                <Text style={{fontWeight: 'bold', fontSize: 18}}>Colour: </Text>

                    <View style = {styles.box}>
                    <SelectList
                    setSelected = {setColour}
                    data = {colours}
                    placeholder={"Select a Colour..."}
                    selected={colour}
                    />
                    </View>

                    <Text style={{fontWeight: 'bold', fontSize: 18, paddingTop: 10}}>Material: </Text>
             
                    <View style = {styles.box}>
                    <SelectList
                    setSelected = {setMaterial}
                    data = {materials}
                    placeholder={"Select a Material..."}
                    selected={material}
                    />
                    </View>
                    
<Text style={{fontWeight: 'bold', fontSize: 18, paddingTop: 10}}>Body Area: </Text>

                    <View style = {styles.box}>
                    <SelectList
                    setSelected = {setBodyArea}
                    data = {bodyareas}
                    placeholder={"Select a Body..."}
                    selected={bodyarea}
                    />
                    </View>

 <Text style={{fontWeight: 'bold', fontSize: 18, paddingTop: 10}}>Temperature: </Text>

<Text style = {{fontSize:12, fontWeight: 'bold', paddingLeft: 80, paddingTop: 7}}>{range + 'ºC'}</Text>
                    
                    <Slider
                   style={{width: 183}}
                   minimumValue={0}
                   maximumValue={30}
                   minimumTrackTintColor="tomato"
                    maximumTrackTintColor="black"
                    thumbTintColor="tomato"
                   step={1}
                   onValueChange={(range) => setRange(range)}
                   value={range}
                     />

<Text style={{fontWeight: 'bold', fontSize: 18, paddingTop: 10}}>Weather Condition: </Text>

                    <View style = {styles.box}>

                    <SelectList
                    setSelected = {setWeather}
                    data = {weathers}
                    placeholder={"Select a Weather..."}
                    selected={weather} 
                    />
                    </View>

         </View>


                    <View style = {{flexDirection: 'row', paddingTop: 10}}>
                <CheckBox
                    
                    containerStyle={{ borderRadius: 10,borderWidth:1, borderColor: '#000000', backgroundColor: '#f8f8ff'}}
                    size={12}
                    checked={male}
                    onPress={handleMaleChange}
                    title="Male"
            
                />
                <CheckBox
                    containerStyle={{ borderRadius: 10,borderWidth:1, borderColor: '#000000', backgroundColor: '#f8f8ff'}}
                    size={12}
                    checked={female}
                    onPress={handleFemaleChange}
                    title="Female"
                />
                <CheckBox
                    containerStyle={{ borderRadius: 10, borderWidth:1 , borderColor: '#000000', backgroundColor: '#f8f8ff'}} 
                    size={12}
                    checked={other}
                    onPress={handleOtherChange}
                    title="Other"
                />
                </View>            
            <TouchableOpacity style = {styles.RegisterBtn2} onPress={handleAddCloth}>
                    <Text style = {{color: 'white',fontWeight:"bold"}}>ADD CLOTH</Text>  
                </TouchableOpacity>
                    
    </ImageBackground>
</View>

   )
}

export default AddClothes;