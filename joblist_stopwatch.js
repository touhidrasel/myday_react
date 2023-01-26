import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, SafeAreaView, Dimensions, FlatList } from 'react-native';
import 'react-native-gesture-handler'; 



export default function JobListStopWatch({ route, navigation }) {
    const  jobList = global.jobListStopWatch; 
    const onPressHandler = () => {
      navigation.navigate('TimeClock');    
    }
    const screenWidth = Dimensions.get("window").width;
    let numColumns = 3;
    let tileHeight = 80;
    if(screenWidth < 420){
      numColumns=2;
      tileHeight = 65;
    }
    const tileWidth= screenWidth/ (numColumns+1);
    //console.log("screenWidth- "+screenWidth+ " tileWidth- "+tileWidth + " tileHeight "+tileHeight+ "numColumns-"+ numColumns);

    const jsonObject= JSON.stringify(jobList, null, 2)
    let jobName
    let userName  
    let apiKey
    let userId
    let instanceName
    
    if(jsonObject != null){
      let parsedJSON = JSON.parse(jsonObject)
      if(parsedJSON.data.length != 0){
        jobName= parsedJSON.data
        jobName= jobName.Jobs
        userName= jobList.user
        apiKey= jobList.apiKey
        instanceName= jobList.Instance
        userId= parsedJSON.data.UserID
      }else{
        jobName=[{"name":"No job assigned", "id":"00"}]
      }
    }else{
      jobName=[{"name":"No job assigned", "id":"00"}]
    }
    function renderItem({item}){
      return <TouchableHighlight
            key = {item.id}
            onPress={() => navigation.navigate('TimeCardStopWatch', {
              item, userName, apiKey, userId, instanceName
            })}
            style={{margin:5, width: tileWidth, height: tileHeight, backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, borderRadius: 9, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.tileText}>{item.name}</Text>
      </TouchableHighlight>;
    }
    


    return (
      
      <View style={styles.container}>
                  <Text style={styles.appTitlePro}>factoryworkx pro</Text>
                                  <View style={styles.detailsStyle}>
                                      <Text style={styles.jobDetails}>Job List</Text>
                                      <Text style={styles.userDetails}>User: {userName}</Text>
                                      <Text style={styles.userDetails}>{}</Text>
                                  </View>
                  <SafeAreaView style={styles.safeView}>
                        <View style={styles.tilesStyle}>
                                  <FlatList  
                                        data={jobName}    
                                        renderItem ={renderItem}
                                        //ItemSeparatorComponent={() => <View style={{height: 3}} />}
                                        numColumns= {numColumns}                                                                    
                                  />
                        </View> 
                  </SafeAreaView>
      </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    body:{
      marginTop:20,
    },
    image: {
      padding: 10,
    },
    tilesStyle: {
      flex:1,
      marginTop:30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    safeView:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      padding:5
    },   
    userInfoSection: {
      paddingLeft: 20,
      paddingTop:30,
    },
    appTitlePro: {
      textAlign: 'center',
      fontSize: 35,
      color:'#7393a7',
      fontWeight: 'bold',
      marginTop:25,
    },
    detailsStyle: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    jobDetails: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#7393a7',
      marginTop: 0,
      marginLeft:40,
    },
    userDetails: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#7393a7',
      marginTop: 0,
      marginLeft: 50,
      textAlign: 'right',
    },
  });