{/*author@Touhid, date@December22 */}
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogInScreen from './login.js';
import JobList from "./joblist.js";
import JobListStopWatch from "./joblist_stopwatch.js";
import DataCollection from "./datacollection.js";
import TimeCard from "./timecard.js";
import TimeCardStopWatch from "./timecard_stopwatch.js";
import UserInfo from "./user.js";

const Drawer = createDrawerNavigator();
const appStyle = require('./style');


export default function App({ route, navigation}) {
  const [checked, setChecked] = useState(true);
  let appUser=global.appUser;
 
  return (

    <NavigationContainer>     
      <Drawer.Navigator
          //drawerContent={props => <CustomDrawerContent {...props} />}
          drawerStyle={{
            backgroundColor: '#3C38B1',
          }}
           //drawerContent={props => <CustomDrawerContent {...props} />}
          useLegacyImplementation={true}   
        >
        {/*As log in and log out is the same page in this app, therefore first drawer screen must be the log in/ log out screen. 
        Consequently, the last drawer screen is used as a log out option. Hence, the 'App Landing' drawer screen is hidden. */}
        <Drawer.Screen
          name="App Landing"
          component={LogInScreen}
          options={{
           header: () => null,
           title:"Log Out",
           drawerItemStyle: { height: 0 },
           swipeEnabled: false,
            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/log-out.png')}
                size={1}
                style={[appStyle.userIcon]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="User Info"
          options={{
            title:appUser,
            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/user.png')}
                style={[appStyle.icon, { tintColor: tintColor, marginLeft:0 }]}
              />
            ),
          }}
          component={UserInfo} 
        />
        <Drawer.Screen
          name="TimeClock"
          options={{
            title:'Time Clock',
            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/wall-clock.png')}
                style={[appStyle.icon, { tintColor: tintColor, marginLeft:0 }]}
              />
            ),
          }}
          component={JobList} 
        />
        
        <Drawer.Screen
          name="StopWatch"
          options={{
            title:'StopWatch',

            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/chronograph-watch.png')}
                style={[appStyle.icon, { tintColor: tintColor }]}
              />
            ),
          }}
          component={JobListStopWatch} 
        /> 
       
        <Drawer.Screen
          name="DataCollection"
          options={{
            title:'Data Collection',
            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/data-collection.png')}
                style={[appStyle.icon, { tintColor: tintColor }]}
              />
            ),
          }}
          component={DataCollection} 
        /> 
        <Drawer.Screen
          name="TimeCard"
          options={{
            title:'Time Card',
            drawerItemStyle: { height: 0 },
            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/data-collection.png')}
                style={[appStyle.icon, { tintColor: tintColor }]}
              />
            ),
          }}
          component={TimeCard} 
        /> 
        <Drawer.Screen
          name="TimeCardStopWatch"
          options={{
            title:'Time Card',
            drawerItemStyle: { height: 0 },
            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/data-collection.png')}
                style={[appStyle.icon, { tintColor: tintColor }]}
              />
            ),
          }}
          component={TimeCardStopWatch} 
        /> 
        
        <Drawer.Screen
          name="LogOut"
          component={LogInScreen}
          options={{
           header: () => null,
           title:"Log Out",
           swipeEnabled: false,
            drawerIcon:({ tintColor }) => (
              <Image
                source={require('./resources/log-out.png')}
                //size={1}
                //style={[styles.userIcon]}
                style={[appStyle.icon, { tintColor: tintColor }]}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  
};

