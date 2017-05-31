import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#ffb3d9',
  },
  text: {
    fontSize: 30,
    color: 'green'
  },
  uploadAvatar:{
    height: 150,
    width: 150,
  },
  logcontainer:{
     alignItems: 'center',
     marginBottom: 10,
   },
   logo: {
     width: 100,
     height: 100
   },
   textinput:{
     height: 50,
     padding: 4,
     marginBottom: 10,
     marginLeft: 5,
     marginRight: 5,
     fontSize: 18,
     borderWidth: 1,
     borderColor: '#48afdb',
     borderRadius: 4,
     color: '#000000'
   },
   buttoncontainer: {
     flexDirection: 'row'
   },
   buttoncolumn: {
     flex: 1,
     marginRight: 5,
     marginLeft: 5,
   },
   icon: {
    width: 26,
    height: 26,
  },
  textInputContainer: {
   flex: 8,
 },
  inputTitleStyle: {
   height: 60,
   paddingTop: 5,
   paddingLeft: 20,
   paddingRight: 20,
   paddingBottom: 0,
   fontFamily: 'Lato-Regular',
   fontSize: 20,
 },
 inputDescriptionStyle: {
   flex: 1,
   paddingLeft: 20,
   paddingRight: 20,
   marginBottom: 60,
   fontFamily: 'Lato-Regular',
   fontSize: 16,
   textAlignVertical: 'top'
 },
 camera: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 50
 }
});
