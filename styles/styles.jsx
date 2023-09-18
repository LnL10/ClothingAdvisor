import { StyleSheet, Dimensions } from "react-native";

export default styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },

    button:{
        alignItems: 'center',
        marginTop: 50
    },

    
    image: {
        position: 'absolute',
        top: 45,
        alignSelf: 'center',
    },

    text: {
        color: 'black',
        fontSize: 25,
        lineHeight: 100,
        fontWeight: 'bold',
        marginTop: 40
          
    },


    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
    },
    
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "rosybrown",
    },

    loginBtn2: {
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: 'black',
    },

    check: {
        width: "40%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: 'black',
    },

    RegisterBtn: {
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "rosybrown",
        
    },


    InputView: {
        alignItems : "center",
    },

    inputbox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
        height: 60,
        width:300,
        backgroundColor: '#fff',
    },

    inputbox2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
        height: 60,
        width:300,
        
    },
  

    icon2: {
        alignItems: 'center',
        paddingLeft: 38,
        paddingBottom: 30,

    },

    editclothes: {
        paddingLeft: 75,
    },
  
    button2: {
        
        paddingTop:50,
    },

    inputIcon: {
        marginRight: 10,
    },

    text2: {
        color: 'sienna',
        fontSize: 25,
        lineHeight: 100,
        fontWeight: 'bold',
        marginTop:40,
        top:-60,
        
    },

    text3: {
        color: 'sienna',
        fontSize: 25,
        lineHeight: 100,
        fontWeight: 'bold',
        marginTop:40,
        top:-75,
        
    },
    
    box: {
        paddingTop: 5,
        paddingRight: 195,
    },
    
    RegisterBtn2: {
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "black",
    },
    
    inputbox3: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
        height: 45,
        width: 180,
        backgroundColor: 'transparent',
    },
    
    teste: {
            paddingLeft: 200,
            paddingTop: 500,
    },

    inputbox4: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
        height: 60,
        width: 300,
        backgroundColor: 'transparent',
        
    },

    inputbox5: {

        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
        height: 60,
        width: 120,
        backgroundColor: 'transparent',

    },

    inputbox6: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
        height: 60,
        width: 350,
        backgroundColor: 'transparent',
        
    },
    errorText:{
        textAlign:"center",
        fontSize:15,
        backgroundColor:"tomato",
        
        
    }
}) 