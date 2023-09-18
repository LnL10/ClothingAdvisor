import { 
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image
  
} from "react-native";
import React, {useState,useEffect} from "react";
import styles from "../styles/styles";
import { AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const bgimage = require("../assets/background.png");
const logo = require("../assets/logo.png");


const Login = ({navigation}) =>{
  const auth = getAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        navigation.navigate("OutfitDayLogged");
      })
      .catch((error) => {
        let errorMessage = "Erro de login";

        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Email não encontrado";
            break;
          case "auth/wrong-password":
            errorMessage = "Password incorreta";
            break;

        }
        console.log(error);
        setError(errorMessage);
      });
        
  };

  
 return(
    
    <View style={styles.container}> 


      <ImageBackground source={bgimage}  style={styles.background} >
      <Image source={logo} />

      <Text style = {styles.text}>LOGIN</Text>

      <View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Text style={{fontWeight: 'bold',textAlign: 'left'}}>Email Address</Text>
        <View style = {styles.inputbox}>
          <AntDesign name="mail" size={24} color="black"/>
          <TextInput placeholder="Enter Email" autoComplete="email" style={{width:260,height:100}} value={email} onChangeText={setEmail}/>
        </View>

        <Text style={{fontWeight: 'bold',textAlign: 'left',marginTop:20}}>Password</Text>
        <View style = {styles.inputbox}>
          <AntDesign name="lock1" size={24} color="black" style={styles.inputIcon}/>
          <TextInput placeholder="Enter Password" style={{width:260,height:100}}secureTextEntry={true}  value={password}
             onChangeText={setPassword}/>
        </View>

      </View>
        
      <CheckBox
        title="Remember me"
        checked={rememberMe}
        onPress={handleRememberMe}
        containerStyle={{backgroundColor:"transparent",borderWidth:0}}
        checkedColor="grey"
        textStyle={{fontWeight: 'normal',
        fontSize: 13,}}
      />    
                
        <TouchableOpacity style = {styles.loginBtn} onPress={handleLogin}>
          <Text>Login</Text>  
        </TouchableOpacity>  
        
        


        
      <TouchableOpacity style={{paddingTop:30}}>
        <Text style={{textAlign:"center"}}>
            Forgot your password ?
        </Text>

        </TouchableOpacity>
       



        <TouchableOpacity onPress={() => navigation.navigate("Register")}>

        <View style={{flexDirection:"row"}}>

          <Text style={{color:"gray"}}>Not registered yet? </Text>
          <Text>Create an Account</Text>

        </View>
        </TouchableOpacity>
  
      </ImageBackground>
            
    </View>
    

  )

};
export default Login;