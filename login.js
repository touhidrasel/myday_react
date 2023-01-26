import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert, TouchableHighlight, SafeAreaView } from 'react-native';
import { Button, TextInput, IconButton, Chip, Stack, Switch, Surface} from "@react-native-material/core";
import 'react-native-gesture-handler'; 
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import helpers from './helpers';
import { HeaderStyleInterpolators } from "@react-navigation/stack";



export default function LogInScreen({ navigation }) {
  const loginStyle = require('./style');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [Instance, setInstance] = useState('');
  const [logInResponce, setLogInResponce] = useState('');
  const [showloginResponce, setShowloginResponce] = useState(false);
  const [jobList, setjobList] = useState('');
  const [hidePass, setHidePass] = useState(true);

    const onPressHandler = () => {
      global.appUser=user;
      global.appInstance=Instance;
      setLogInResponce('')
      setShowloginResponce(false) 
      if(!helpers.isSet(user) || !helpers.isSet(password) || !helpers.isSet(Instance)){
        setLogInResponce('Please fill up all input fields')
        setShowloginResponce(true) 
        return
      }
      validateUser(user, password, Instance, navigation, setShowloginResponce, setLogInResponce, setjobList, jobList);
    }
  
    return (
        <View style={loginStyle.container}>          
           <Image style= {loginStyle.image} source={require('./resources/factoryworkx_icon.png')}/>
              <TextInput
                  style={loginStyle.textInputInstance}
                  variant="outlined"
                  placeholder='Instance'
                  leading={props => <Icon name="server" {...props} />}
                  onChangeText={(Instance) => setInstance(Instance)}
                  defaultValue={Instance}
              />
              <TextInput
                  style={loginStyle.textInputUser}
                  variant="outlined"
                  placeholder='User Name'
                  trailing={props => (
                    <IconButton icon={props => <Icon name="account" {...props} />} {...props} />
                  )}
                  onChangeText={(user) => setUser(user)}
                  defaultValue={user}
              />
              <TextInput
                  style={loginStyle.textInputPassword}
                  //label="Password"
                  secureTextEntry={hidePass ? true : false}
                  variant="outlined"
                  placeholder='Password'
                  trailing={props => (
                    <IconButton icon={props => <Icon name="eye" onPress={() => setHidePass(!hidePass)} {...props} />} {...props} />
                  )}
                  onChangeText={(password) => setPassword(password)}
                  defaultValue={password}
              />
              <Button variant="outlined" title="Log In" onPress={onPressHandler}/>      

            {showloginResponce ? (
              <View style={loginStyle.loginResponceErr} >
                  <Chip icon="information" mode="flat" 
                    leading={props => <Icon name="information-outline" {...props} />}                   
                  >
                    <Text>{JSON.stringify(logInResponce)}</Text>
                  </Chip>
              </View>
            ):null }     
        </View>
      )
  }

  function validateUser(user, password, Instance, navigation, setShowloginResponce, setLogInResponce, setjobList, jobList){
    if(Instance.length > 10 && Instance.includes('factoryworkx') && Instance.includes('.')){
      if(Instance.split('.').length > 3){
        //console.log(Instance.split('.').length)
        setShowloginResponce(true)
        setLogInResponce('Instance name is wrong')
        return
      }else{
        let instanceArr=Instance.split('.')
        if(instanceArr[0].includes('//')){
          let tempArr=instanceArr[0].split('//')
          Instance = tempArr[1].toLowerCase()
        }else{
          Instance=instanceArr[0].toLowerCase()
        }
      }
      
    }
    const httpsInstance='https://'+ Instance.toLowerCase()+'.factoryworkx.com/'; 
    fetch('https://6s1a38qvo7.execute-api.us-east-1.amazonaws.com/prod/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'username':user,
          'password':password,
          'Instance':httpsInstance,
          'instanceName':Instance.toLowerCase()
        },
      })
      .then((response) => {
        const responseJSON = JSON.stringify(response, null, 2)
        let parsedJSON = JSON.parse(responseJSON)
        if(parsedJSON.ok == true){
          let apiKey= parsedJSON.headers.map.apiresponce;
          getJobsByUser(user, navigation, apiKey, Instance);
        } else if(parsedJSON.status == 400) {
          setShowloginResponce(true)
          setLogInResponce('Instance name is wrong! Please check the instance name.')
        } else if(parsedJSON.status == 401){
          setShowloginResponce(true)
          setLogInResponce(parsedJSON.headers.maps+'APIKey is wrong')
        }else{
          setShowloginResponce(true)
          setLogInResponce('Username or Password does not match!')
        }
      })

  }

  function getJobsByUser (user, navigation, apiKey, Instance) {
    const httpsInstance='https://'+ Instance.toLowerCase()+'.factoryworkx.com';
    fetch(httpsInstance+'/?mod=228?FuncName=DCS_GetJobsByUser_V1&+APIKey='+apiKey+'&UserName='+user, { method: 'GET' })
    .then(response => response.json())
    .then((data) => {
      navigation.navigate('TimeClock', { 
        data, user, apiKey, Instance
      });
      navigation.openDrawer();
    })
    
} 


