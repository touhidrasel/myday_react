{/*author@Touhid, date@December22 */}
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { Button, TextInput, IconButton, Stack, Switch, Surface} from "@react-native-material/core";
import 'react-native-gesture-handler'; 
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



export default function JobList({ route, navigation }) {
    const jobListStyle = require('./style');
    const  jobList = route.params;
    global.jobListStopWatch=jobList;
    {/*App logs out after 30 minutes=1800000ms */}
    setTimeout(() => {navigation.navigate('LogOut');}, 1800000);
    const onPressHandler = () => {navigation.navigate('TimeClock');}
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
            onPress={() => navigation.navigate('TimeCard', {
              item, userName, apiKey, userId, instanceName
            })}
            style={{margin:5, width: tileWidth, height: tileHeight, backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, borderRadius: 9, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={jobListStyle.tileText}>{item.name}</Text>
      </TouchableHighlight>;
    }
    

    return (   
      <View style={jobListStyle.container}>
                  <Text style={jobListStyle.appTitlePro}>factoryworkx pro</Text>
                                  <View style={jobListStyle.detailsStyle}>
                                      <Text style={jobListStyle.jobDetails}>Job List</Text>
                                      <Text style={jobListStyle.userDetails}>User: {userName}</Text>

                                  </View>
                  <SafeAreaView style={jobListStyle.safeView}>
                        <View style={jobListStyle.tilesStyle}>
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
