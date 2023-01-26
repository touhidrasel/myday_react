import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert, TouchableHighlight, SafeAreaView, Switch } from 'react-native';
import { Button, Chip, TextInput, IconButton, Stack, Surface, FAB} from "@react-native-material/core";
import 'react-native-gesture-handler'; 
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';





export default function TimeCardStopWatch({ route, navigation }) {
    const  jobNameId = route.params;
    let apiKey = jobNameId.apiKey;
    let jobId= jobNameId.item.id;
    let userId= jobNameId.userId;
    let instanceName= jobNameId.instanceName;
    const onPressHandler = () => {navigation.navigate('TimeClock');}
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [showStopWatch, setShowStopWatch]= useState(true);
    const [showStartOnly, setStartOnly] = useState(true);
    const [showStopPause, setShowStopPause] = useState(false);
    const [showSubmitCancel, setSubmitCancel] = useState(false);
    const [startTime, setstartTime] = useState('');
    const [showStartTime, setShowStartTime] = useState(false);
    
  
    return (    
      <View style={styles.container}>     
              <View style={styles.detailsStyle}>
                  <Text style={styles.jobDetails}>Job: {jobNameId.item.name}</Text>
                  <Text style={styles.jobId}>Job Id: {jobNameId.item.id}</Text>
              </View>
              <Text style={styles.userDetails}>User: {jobNameId.userName}</Text>
            { showStopWatch ? ( 
              <Stopwatch
                  laps
                  start={isStopwatchStart}
                  // To start
                  reset={resetStopwatch}
                  // To reset
                  options={options}
                  // Options for the styling
                  getTime={(time) => {
                    //console.log(time);
                  }}
                />
            ):null }
            <View style={styles.buttonsStyle}>
                { showStartOnly ? ( 
                    <Button style={styles.startButtonStyle} variant="outlined" title='START' color="black" 
                            onPress={() => {				
                              setIsStopwatchStart(true);
                              setResetStopwatch(false);
                              setShowStopPause(true);
                              setStartOnly(false);
                              setShowStartTime(true);
                              setstartTime(DateTime());                         
                              }} />
                ):null }
                { showStopPause ? (   
                  <View style={styles.buttonsStyle}>
                    <Button style={styles.resetButtonStyle} variant="outlined" title="STOP" color="black" 
                            onPress={() => {
                              if(isStopwatchStart){
                               setIsStopwatchStart(false);
                              }  
                              setResetStopwatch(false);
                              setShowStopPause(false);
                              setSubmitCancel(true);
                            }}/>      
                    <Button style={styles.resetButtonStyle} variant="outlined" title= {isStopwatchStart ? 'PAUSE' : 'RESUME'} color="black" 
                            onPress={() => {
                              setIsStopwatchStart(!isStopwatchStart);
                              setResetStopwatch(false);
                            }}>
                    </Button>
                </View>
                ):null }
                { showSubmitCancel ? (   
                  <View style={styles.buttonsStyle}>
                    <Button style={styles.resetButtonStyle} variant="outlined" title="SUBMIT" color="black" 
                            onPress={() => {
                              setSubmitCancel(false);
                              setStartOnly(true);
                              createTimeCard(startTime, apiKey, jobId, instanceName, userId, setResetStopwatch);
                              setShowStartTime(false);                  
                            }}/>      
                    <Button style={styles.resetButtonStyle} variant="outlined" title="CANCEL" color="black" 
                            onPress={() => {
                              setResetStopwatch(true);
                              setSubmitCancel(false);
                              setStartOnly(true);
                              setShowStartTime(false);
                            }}/>
                </View>
                ):null }
            </View>
            { showStartTime ? (
            <View style={styles.timeCardStartTime} >
                <Chip icon="information" mode="flat" 
                    leading={props => <Icon name="clock-check" {...props} />} 
                          onPress={() => Alert.alert(
                            'Delete Start Time?',
                            'Press OK to delete start time',
                            [
                              {text: 'Cancel', style: 'destructive', onPress:  () => {setShowStartTime(true)}},
                              {text: 'OK', onPress: setShowStartTime(false)},
                            ],
                            { cancelable: false }
                            )}>
                    <Text>{'START TIME: '+startTime}</Text>
                </Chip>
            </View>
            ):null }

            <View style={styles.backButtonStyle}>
              { showStartOnly ? ( 
                <Button style={styles.buttonStyle} variant="outlined" title="Back" 
                  leading={props => <Icon name="arrow-u-left-top" {...props} />}
                  onPress={() => {navigation.openDrawer(); setStartOnly(true), setShowStopPause(false), setSubmitCancel(false)}}
                />
              ):null }
            </View>
            
      </View>
      
      
    )
  }
  function createTimeCard(startTime, apiKey, jobId, instanceName, userId, setResetStopwatch) {
    const timestamp = DateTime();
    const httpsInstance='https://'+ instanceName+'.factoryworkx.com';   
    console.log("Time now- "+timestamp+ " startTime"+startTime+ " apiKey-"+apiKey+ " jobId-"+jobId+ " userId-"+userId)
    fetch(httpsInstance+'/?mod=228?FuncName=DCS_CreateTimeCard_Lookup_V1&APIKey='+apiKey+'&JobID='+jobId+'&UserID='+userId+'&StatusID=263382&StartDate='+startTime +'&EndDate=' +timestamp, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        let noteMessage=''
        if(data.ErrorCode==0){
          noteMessage='Time card created successfully.'
        } else {
          noteMessage= data.ErrorMessage
        }
        Alert.alert('Note', noteMessage, [
        {text:'OK', onPress:() => {setResetStopwatch(true)}}
      ])})
  } 

  function DateTime() {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hours = new Date().getHours(); //Current Hours
      if(hours<10){
        hours='0'+hours;
      }
      var min = new Date().getMinutes(); //Current Minutes
      if(min<10){
        min='0'+min;
      }
      var sec = new Date().getSeconds(); //Current Seconds
      var dateString= date + '-' + month + '-' + year+ ' '+hours+':'+min+':'+sec;
      return dateString;
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
    appTitle: {
      fontSize: 50,
      color:'#7393a7',
      fontWeight: 'bold',
      padding: 10,
    },
    icon: {
      width: 24,
      height: 24,
    },
    userIcon: {
      width: 40,
      height: 40,
    },  
    appTitlePro: {
      textAlign: 'center',
      fontSize: 40,
      color:'#7393a7',
      fontWeight: 'bold',
      marginTop:50,
    },
    detailsStyle: {
      marginTop: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    jobDetails: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#7393a7',
      marginTop: 0,
    },
    jobId: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#7393a7',
      marginTop: 0,
      marginLeft:30,
    },
    userDetails: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#7393a7',
      marginTop: 5,
      marginBottom:10,
      marginLeft: 10,
      textAlign: 'right',
    },
   
    buttonsStyle: {
      flexDirection: 'row',
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    startButtonStyle: {
      marginTop:10,  
      padding: 10,
    },
    resetButtonStyle: {
      marginTop:10,  
      padding: 10,
      marginLeft: 20,
    },
    backButtonStyle:{     
      flex:1,
      justifyContent: 'flex-end',
      marginBottom:20,
    },    
    buttonStyle: {
      borderRadius: 0,
      width:240,
      height:50,
      justifyContent: 'center',
      textAlign: 'center',    
    },
     
    timeCardStartTime: {
      marginTop:35,
      jastifyContent: 'center',
      alignItems:'center',
      alignContent:'center',
      marginLeft:15,
    }
  });
  
  const options = {
    container: {
      backgroundColor: 'white',
      marginTop:70,
      padding: 5,
      borderRadius: 5,
      width: 220,
      alignSelf: "center",
    },
    text: {
      fontSize: 30,
      color: 'black',
      textAlign: 'center',
    },
  };