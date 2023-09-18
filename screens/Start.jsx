import { View,
ImageBackground,
TouchableOpacity,
Image,
Text,
Linking
} from "react-native"
import React from "react";
import styles from "../styles/styles";
import { SocialIcon } from "react-native-elements";

const bgimage = require("../assets/background.png");
const logo = require("../assets/logo.png");



const Start = ({ navigation }) => {

    const InstagramPress = () => {
         Linking.openURL('https://www.instagram.com/slbenfica/');
      };
     const TwitterPress = () => {
        Linking.openURL('https://twitter.com/SLBenfica');
     };
    const FacebookPress = () => {
        Linking.openURL('https://www.facebook.com/SLBenfica');
     };
    return(
        <View>
            <ImageBackground source={bgimage}  style={styles.background} >
                <Image source={logo} />

                <TouchableOpacity style = {styles.loginBtn2} onPress={() => navigation.navigate("Login")}>
                    <Text style = {{margin: 5}}>LOGIN</Text>  
                </TouchableOpacity> 
                
                <View style = {{marginBottom: 10, marginTop: 25}}>
                    <Text style = {{fontWeight: 'bold'}}>OR</Text>
                </View>
                

                
                <TouchableOpacity style = {styles.RegisterBtn} onPress={() => navigation.navigate("Register")}>
                    <Text style = {{color: 'white'}}>REGISTER</Text>  

                </TouchableOpacity>
                
                <View style = {{flexDirection: 'row', margin: 20}}>
                    
                    <TouchableOpacity onPress={FacebookPress}>
                        <SocialIcon
                            
                            type='facebook'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={InstagramPress}>
                        <SocialIcon
                            type= 'instagram'
                            style = {{marginLeft: 20, marginRight: 20}}
                        />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={TwitterPress}>
                        <SocialIcon
                            type='twitter'
                        />
                    </TouchableOpacity>
                    

                </View>


                <TouchableOpacity style = {styles.check} onPress={() => navigation.navigate("OutfitDayNoLogged")}>
                        <Text>Check Today Outfit</Text>
                </TouchableOpacity>



                



            </ImageBackground>
        </View>

    )

}

export default Start;