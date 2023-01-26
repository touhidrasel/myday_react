import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert, TouchableHighlight, SafeAreaView } from 'react-native';


export default function DataCollection({ navigation }) {
    const onPressHandler = () => {
      Alert.alert('Note','Please add license key', [
        {text: 'Cancel', style: 'destructive', onPress:  () => {}},
        {text:'OK', onPress:() => navigation.openDrawer()}
      ])
    }
    return (
      
      <View style={styles.container}>
        <Text style={styles.appTitlePro}>factoryworkx pro</Text>  
        <View style={styles.pressableStyle}>
            <Pressable
              onPress={onPressHandler}
              style={({ pressed }) => ({ backgroundColor: pressed ? 'gray' : 'white', borderWidth:1, borderRadius:7, height:50, width:120, justifyContent: 'center', alignItems: 'center' })}
            >
            <Text style={styles.text}>
                Click Here!
            </Text>
            </Pressable>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    
    appTitlePro: {
      textAlign: 'center',       
      fontSize: 35,
      color:'#7393a7',
      fontWeight: 'bold',
      marginTop: 25,
    },
    text: {
      textAlign: 'center',       
    },
    pressableStyle:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'gray',
    },
    
});
  