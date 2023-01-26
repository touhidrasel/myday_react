import React, { useState } from "react";
import { StyleSheet, Text, View, Image} from 'react-native';



export default function UserInfo({route, navigation }) {

    const onPressHandler = () => {     
    }
    return (
      
      <View style={styles.container}>        
                 <Text style={styles.appTitlePro}>factoryworkx pro</Text>  
                 <Image source = {require('./resources/user.png')} style = {styles.imageStyle}/>
                 <Text style={styles.userDetails}>Hello {' '+global.appUser}!</Text>
                 <Text style={styles.instanceDetails}>{appInstance}</Text>
                 <View style={styles.tilesStyle}>
                    <Text style={{}}>Error Log</Text>                             
                </View> 
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    body:{
      marginTop:1,
    },
    image: {
      padding: 10,
    },
    appTitlePro: {
      textAlign: 'center',       
      fontSize: 35,
      color:'#7393a7',
      fontWeight: 'bold',
      marginTop: 25,
    },
    detailsStyle: {  
      flex:1,
      justifyContent: 'center',
    },
    instanceDetails: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#7393a7',
      textAlign: 'center',
      marginTop:5, 
    },
    userDetails: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#7393a7',
      textAlign: 'center',
      marginTop:10,      
    },
    tilesStyle: {
      flex:1,
      marginTop:30,
      alignItems: 'center',
      borderColor: 'gray',
      borderWidth: 1, 
      borderRadius: 9,
      minWidth:'80%',
      margin:20,
    },
    imageStyle:{
      width: '12%', 
      height: '7%', 
      alignItems: 'center', 
      marginTop:'5%',
    }
    
});
  