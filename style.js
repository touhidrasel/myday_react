'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        width: 24,
        height: 24,
      },
      userIcon: {
        width: 40,
        height: 40,
      },
      userInfoSection: {
        paddingLeft: 20,
        paddingTop: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      appTitlePro: {
        textAlign: 'center',
        fontSize: 35,
        color:'#7393a7',
        fontWeight: 'bold',
        marginTop:25,
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
      bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
      },
      image: {
        padding: 5,
        width:"70%",
        height:"25%"
      },
      textInputInstance: {
        paddingTop:50,
        minWidth:300,
      },
      textInputUser: {
        paddingTop:10,
        paddingBottom:10,
        minWidth:300,
      },
      textInputPassword: {
        paddingTop:10,
        paddingBottom:10,
        minWidth:300,
      }, 
      loginResponceErr: {
        marginTop:35,
        jastifyContent: 'center',
        alignItems:'center',
        alignContent:'center',
        marginLeft:15,
      },
      body:{
        marginTop:20,
      },
      timeCardImage: {
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
      timeCardDetailsStyle: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      timeCardJobDetails: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#7393a7',
        marginTop: 0,
        marginLeft:50,
      },
      timeCardUserDetails: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#7393a7',
        marginTop: 0,
        marginLeft: 50,
        textAlign: 'right',
      },
      safeViewContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop:"10%"
     },
      body:{
        marginTop:20,    
      },
      icon: {
        width: 24,
        height: 24,
      },
      userInfoSection: {
        paddingLeft: 20,
        paddingTop:30,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
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
      },
      jobId: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#7393a7',
        marginTop: 0,
        marginLeft:30,
      },
      userDetails: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#7393a7',
        marginTop: 0,
        marginLeft: 20,
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
      pickerStyle: {
        height: 30, 
        width: 130,
      },
      pickerItem:{
        backgroundColor: "grey", 
        color: "blue", 
        fontSize:10,
      },
      breakPickerView:{
        borderWidth: .3, borderColor: 'gray', borderRadius: 5, padding:10, marginBottom:10, marginTop:10,
      },
      breakPickerText:{
        alignItems: 'center', justifyContent: 'center', marginLeft:40,
      }
});