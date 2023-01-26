import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native';
import { Button, Chip} from "@react-native-material/core";
import 'react-native-gesture-handler'; 
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';





export default function TimeCard({ route, navigation }) {
    const  jobNameId = route.params;
    const timeCardStyle = require('./style');
    let apiKey = jobNameId.apiKey;
    let jobId= jobNameId.item.id;
    let userId= jobNameId.userId;
    let instanceName= jobNameId.instanceName;
    const onPressHandler = () => {navigation.navigate('TimeClock');} 
    const [currentDateOnly, setCurrentDateOnly] = useState(getDateOnly);
    const [showBackButton, setShowBackButton] = useState(true);
    const [pickerdate, setPickerDate] = useState(new Date());
    const [displaymode, setMode] = useState('time');
    const [isDisplayTime, setShowDisplayTime] = useState(false);
    const [showDatePickup, setShowDatePickup] = useState(false);
    const [textTimeIn, setTextTimeIn] = useState(false);
    const [textTimeOut, setTextTimeOut] = useState(false);
    const [isTimeInTimeOut, setTimeInTimeOut] = useState(true);
    const [showTimeInOutButton, setTimeInOut] = useState(true);
    const [showTextTimeIn, setShowTextTimeIn] = useState(false);
    const [showTextTimeOut, setshowTextTimeOut] = useState(false);
    const [showSubmitCancelInOut, setSubmitCancelInOut] = useState(false);
    const [selectedBreak, setSelectedBreak] = useState("0 min");
    const [showBreakPicker, setShowBreakPicker] = useState(false);
    const [isCancelClicked, setIsCancelClicked] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showSetButton, setShowSetButton] = useState(false);


    //if(Platform.OS === 'ios'){setIsIOS(true);}
    const changeSelectedDate = (event, selectedDate) => {
      const currentDate = selectedDate || pickerdate;
      let tempDate = new Date(currentDate);
      let day = tempDate.getDate();
      let month = tempDate.getMonth()+1;
      let year = tempDate.getFullYear();
      setShowDatePickup(false);
      var dateString= year + '-' + month + '-' + day;
      setCurrentDateOnly('');
      setCurrentDateOnly(dateString);    
    }; 
   const changeSelectedTime = (event, selectedDate) => {
      const currentDate = selectedDate || pickerdate;
      let eventJSON=JSON.stringify(event);
      let parsedJSON = JSON.parse(eventJSON);
      global.tempEvent=parsedJSON.type;
      let tempDate = new Date(currentDate);
      let hours = tempDate.getHours();
      if(hours<10){
        hours='0'+hours;
      }
      let min = tempDate.getMinutes();
      if(min<10){
        min='0'+min;
      }

      setShowDisplayTime(false);//normal code---
      //setShowDisplayTime(Platform.OS === 'ios');
      let currentTime= hours+ ':'+min;
      if(isTimeInTimeOut){
        if(parsedJSON.type == 'set'){
          setTextTimeIn(currentTime);
          setTimeInTimeOut(false);
          setShowTextTimeIn(true);
        }
      } else{
        if(parsedJSON.type == 'set'){
          var timeInArr = textTimeIn.split(':');
          if(timeInArr[0] > hours){
            Alert.alert('Time out can not be before time in.');
            return;
          } 
          if((timeInArr[0] == hours) && (timeInArr[1] > min)){
            Alert.alert('Time out can not be before time in.');
            return;
          }
          setTextTimeOut(currentTime);
          setTimeInTimeOut(true);
          setTimeInOut(false);
          setshowTextTimeOut(true);
          setShowBreakPicker(true);
          setSubmitCancelInOut(true);
        }
      }
   };
   const showMode = (currentMode) => {  
      setShowDisplayTime(true);
      setMode(currentMode);
   };
   const displayTimepicker = () => { 
      setShowDisplayTime(true); //normal code---
      //setShowDisplayTime(Platform.OS === 'ios');
      showMode('time');   
   };
   const displayDatepicker = () => {
      showMode('date');
   };


  
    return (    
      <View style={timeCardStyle.container}>
              <View style={timeCardStyle.timeCardDetailsStyle}>
                  <Text style={timeCardStyle.timeCardJobDetails}>Job: {jobNameId.item.name}</Text>
                  <Text style={timeCardStyle.jobId}>Job Id: {jobNameId.item.id}</Text>
              </View>
              <Text style={timeCardStyle.timeCardUserDetails}>User: {jobNameId.userName}</Text>

              <SafeAreaView style={timeCardStyle.safeViewContainer}>
                    <View style={{padding:5, marginTop:30}}>
                      <Chip icon="information" mode="flat" 
                        leading={props => <Icon name="calendar-edit" {...props} />} 
                        onPress={() => {
                            setShowDatePickup(true);
                        }}>
                        <Text icon="information" mode="flat">{currentDateOnly}</Text>
                      </Chip>
                    </View>
                  
                  { showTextTimeIn ? (
                  <View style={{padding:5}}>
                      <Chip icon="information" mode="flat" 
                        leading={props => <Icon name="clock-in" {...props} />} 
                        >
                        <Text icon="information" mode="flat">{'TIME IN- '+textTimeIn}</Text>
                      </Chip>
                  </View>
                  ):null }
                  { showTextTimeOut ? (
                  <View style={{padding:2}}>
                      <Chip icon="information" mode="flat" 
                        leading={props => <Icon name="clock-out" {...props} />} 
                        >
                        <Text>{'TIME OUT- '+textTimeOut}</Text>
                      </Chip>
                  </View>
                  ):null }
                  { showTimeInOutButton ? (                                   
                  <View>
                    <Button style={timeCardStyle.startButtonStyle} onPress={displayTimepicker} title={isTimeInTimeOut ? "Time In":"Time Out"} variant="outlined" color="black"/>
                  </View>
                  ):null }

                    {showDatePickup && (
                      <DateTimePicker
                        value={pickerdate}
                        mode={'date'}
                        is24Hour={true}
                        //display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        display="default"
                        style={{width: 320, backgroundColor: "white"}}
                        onChange={changeSelectedDate}                       
                      />
                    )}

                    {isDisplayTime && (
                      <DateTimePicker
                        value={pickerdate}
                        mode={displaymode}
                        is24Hour={true}
                        //display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        display="default"
                        style={{width: 320, backgroundColor: "white"}}
                        onChange={changeSelectedTime}                        
                      />
                    )}
                    {showBreakPicker ? (
                        <View>
                 
                          <View style={timeCardStyle.breakPickerView}>
                          <Text style={timeCardStyle.breakPickerText}>Break</Text> 
                            <Picker
                              selectedValue={selectedBreak}
                              style={timeCardStyle.pickerStyle}
                              onValueChange={(itemValue, itemIndex) => setSelectedBreak(itemValue)}
                              itemStyle={timeCardStyle.pickerItem }
                            >
                              <Picker.Item label="0 m" value="0" color="blue"/>
                              <Picker.Item label="15 m" value="15" />
                              <Picker.Item label="30 m" value="30" />
                              <Picker.Item label="45 m" value="45" />
                              <Picker.Item label="60 m" value="60" />
                            </Picker>
                          </View>
                        </View>
                     ):null }

                    { showSubmitCancelInOut ? (
                        <View style={timeCardStyle.buttonsStyle}>
                            <Button style={timeCardStyle.resetButtonStyle} variant="outlined" title="SUBMIT" color="black" 
                              onPress={() => {
                                setSubmitCancelInOut(false);
                                setShowBreakPicker(false);
                                setSelectedBreak('0 min');
                                
                                let startTime = returnDateTime(textTimeIn, currentDateOnly);
                                let endTime = returnDateTime(textTimeOut, currentDateOnly);
                                createTimeInOutTimeCard(startTime, apiKey, jobId, instanceName, userId, endTime, setShowTextTimeIn, setshowTextTimeOut, setTimeInOut, selectedBreak, setCurrentDateOnly);
                              }}/>      
                            <Button style={timeCardStyle.resetButtonStyle} variant="outlined" title="CANCEL" color="black" 
                            onPress={() => {
                              setSubmitCancelInOut(false);
                              setShowTextTimeIn(false);
                              setshowTextTimeOut(false);
                              setTimeInOut(true);
                              setShowBreakPicker(false);
                              setSelectedBreak('0 min');
                              setCurrentDateOnly(getDateOnly);
                            }}/>
                        </View>
                    ):null }
                    

                    
              </SafeAreaView>
            <View style={timeCardStyle.backButtonStyle}>
              { showBackButton ? ( 
                <Button style={timeCardStyle.buttonStyle} variant="outlined" title="Back" 
                  leading={props => <Icon name="arrow-u-left-top" {...props} />}
                  onPress={() => {
                    setShowTextTimeIn(false);
                    setshowTextTimeOut(false);
                    setTimeInOut(true);
                    setShowBreakPicker(false);
                    setSelectedBreak('0 min');
                    setTimeInTimeOut(true);
                    navigation.openDrawer();
                  }}
                />
              ):null }
            </View>           
      </View>
      
      
    )
  }
  
  function createTimeInOutTimeCard(startTime, apiKey, jobId, instanceName, userId, endTime, setShowTextTimeIn, setshowTextTimeOut, setTimeInOut, selectedBreak, setCurrentDateOnly) {
    const httpsInstance='https://'+ instanceName+'.factoryworkx.com';
    if(selectedBreak>0){
      selectedBreak=selectedBreak/60;
    }
    //console.log("startTime "+startTime+ " apiKey-"+apiKey+ " jobId-"+jobId+ " userId-"+userId+ " Break- "+selectedBreak)
    fetch(httpsInstance+'/?mod=228?FuncName=DCS_CreateTimeCard_Lookup_V1&APIKey='+apiKey+'&JobID='+jobId+'&UserID='+userId+'&StatusID=263382&StartDate='+startTime +'&EndDate=' +endTime+'&Adjustment='+selectedBreak, { method: 'GET' })
      .then(response => response.json())    
      .then(data => {
        let noteMessage=''
        if(data.ErrorCode==0){
          noteMessage='Time card created successfully.'
        } else {
          noteMessage= data.ErrorMessage
        }
        Alert.alert('Note', noteMessage, [
        {text:'OK', onPress:() => {
          setShowTextTimeIn(false);
          setshowTextTimeOut(false);
          setTimeInOut(true);
          setCurrentDateOnly(getDateOnly);
        }}
      ])})
  } 
  
  function returnDateTime(hourMin, currentDateOnly){
      var dateString= currentDateOnly +' '+hourMin;
      return dateString;
  }
  function getDateOnly(){
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var dateString= year + '-' + month + '-' + date;
    return dateString;
  }
  
  
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