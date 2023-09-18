import { 
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
} from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import { AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { db} from "../firebase.config";
import { getAuth, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';





const bgimage = require("../assets/background.png");
const logo = require("../assets/logo.png");




const Register = ({navigation}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    const auth = getAuth();

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

    const handleRegistration = async () => {
        if (!name || !email || !password || !confirmPassword || !address) {
          alert('Please fill in all fields');
          return;
        }
      
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        const nameQuery = query(collection(db, 'users'), where('name', '==', name));
        const nameQuerySnapshot = await getDocs(nameQuery);
      
        if (!nameQuerySnapshot.empty) {
          alert('Name is already in use. Please choose a different name.');
          return;
        }
      
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, { displayName: name });
          })
          .then(() => {
            
            return addDoc(collection(db, 'users'), {
              name: name,
              address: address,
              email: email,
              gender: male ? 'Male' : female ? 'Female' : other ? 'Other' : '',
            });
          })
          .then(() => {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAddress('');
            navigation.navigate('OutfitDayLogged');
          })
          .catch((error) => {
            
            alert('Registration failed. Please try again.');
            console.error(error);
          });
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


     
      
      
    return(
        
        <View style = {styles.container}>
            <ImageBackground source={bgimage}  style={styles.background}>
            
           {/* <Image source={logo} style = {styles.image} />*/}
            
            <View>
            <TouchableOpacity onPress={handleImageSelection}>
                <AntDesign name="adduser" size={96} color="black" />    
                <Text>Upload Image</Text>
            </TouchableOpacity>
            </View>


            

                <View>
                    <Text style={{fontWeight: 'bold',textAlign: 'left'}}>Your Name</Text>
                    <View style = {styles.inputbox}>
                        <AntDesign name="user" size={24} color="black"/>
                        <TextInput placeholder="Your Full Name" autoComplete="name" style={{ width:260,height:100}} value={name} onChangeText={setName}/>
                    </View>
                </View>


                
                <View style = {{flexDirection: 'row'}}>
                <CheckBox
                    
                    containerStyle={{ borderRadius: 10,borderWidth:1, borderColor: 'purple'}}
                    size={12}
                    checked={male}
                    onPress={handleMaleChange}
                    title="Male"
            
                />
                <CheckBox
                    containerStyle={{ borderRadius: 10,borderWidth:1, borderColor: 'purple'}}
                    size={12}
                    checked={female}
                    onPress={handleFemaleChange}
                    title="Female"
                />
                <CheckBox
                    containerStyle={{ borderRadius: 10,borderWidth:1, borderColor: 'purple'}} 
                    size={12}
                    checked={other}
                    onPress={handleOtherChange}
                    title="Other"
                />
                </View>

                <View>
                        <Text style={{fontWeight: 'bold',textAlign: 'left'}}>Email Address</Text>
                        <View style = {styles.inputbox}>
                            <AntDesign name="mail" size={24} color="black"/>
                            <TextInput placeholder="Email Address" autoComplete="email"  style={{width:260,height:100}} value={email} onChangeText={setEmail}/>
                        </View>
                    
                    <Text style={{fontWeight: 'bold',textAlign: 'left'}}>Password</Text>

                    <View style = {styles.inputbox}>
                        
                        <AntDesign name="lock1" size={24} color="black" style={styles.inputIcon}/>
                        <TextInput placeholder="Enter Your Password"  style={{width:260,height:100}} secureTextEntry={true} value={password} onChangeText={setPassword} />
                    </View>


                    <Text style={{fontWeight: 'bold',textAlign: 'left'}}>Confirm Password</Text>
                    <View style = {styles.inputbox}>
                        
                        <AntDesign name="lock1" size={24} color="black" style={styles.inputIcon}/>
                        <TextInput placeholder="Enter Your Password Again" style={{width:260,height:100 }} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                    </View>

                    
                    <Text style={{fontWeight: 'bold',textAlign: 'left'}}>Address</Text>
                    <View style = {styles.inputbox}>
                        <AntDesign name="home" size={24} color="black"/>
                        <TextInput placeholder="Enter Your Address" autoComplete="postal-address"  style={{width:260,height:100}} value={address} onChangeText={setAddress}/>
                    </View>
                    
                </View>

                <TouchableOpacity style = {styles.RegisterBtn} onPress={handleRegistration}>
                    <Text style = {{color: 'white',fontWeight:"bold"}}>REGISTER</Text>  
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>

                    <View style={{flexDirection:"row", marginTop:10}}>

                    <Text>Already have an account?</Text>
                    <Text style={{textDecorationLine:"underline", fontWeight:"bold"}}> Login</Text>

                    </View>
                </TouchableOpacity>
                            

            

            </ImageBackground>


        </View>
        
        

    )

}

export default Register;