/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  ActivityIndicator,
} from 'react-native';



import {StackNavigator} from 'react-navigation';
import styles from '../styles/styles';
import firebase from '../config/firebase';
var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob';


const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const uploadImage = (uri, mine = 'img/jpg') => {
  return new Promise((resolve,reject)=>{
    const uploadUri = uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref('Images').child(`${sessionId}.jpg`);
    fs.readFile(uploadUri,'base64')
    .then((data)=>{
      return Blob.build(data,{type: `${mine}; BASE64`});
    })
    .then((blob)=>{
      uploadBlob = blob;
      return imageRef.put(blob, {contentType: mine});
    })
    .then(()=>{
      uploadBlob.close();
      return imageRef.getDownloadURL()
    })
    .then((url)=>{
      console.log(url);
      resolve(url)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

export default class MyComponent extends Component {

  constructor(props) {
      super(props)

      this.state = {
        title: this.props.navigation.state.params.title,
        desc: this.props.navigation.state.params.content,
        _key: this.props.navigation.state.params._key,
        avatarSource: this.props.navigation.state.params.image,
      }
    }
    pickImage(){
          ImagePicker.showImagePicker(options, (response) => {
              this.setState({avatarSource: ''});
              if (response.didCancel) {
              }
              else if (response.error) {
              }
              else if (response.customButton) {
              }
              else {
                uploadImage(response.uri)
                .then(url=>{
                  this.setState({avatarSource: url})
                  this.props.navigation.setParams({image: url,changed: true});
              })
                .catch(error=> console.log(error))
              }
          });
      }
  static navigationOptions = ({ navigation }) => ({
   title: `${navigation.state.params.title}`,
   headerRight: (
     <TouchableOpacity style={{marginRight: 10,}} onPress={()=> navigation.state.params.handleSave({navigation},navigation.state.params.changed)}>
      <Image
        style={styles.icon}
        source={require('../images/save.png')}
      />
    </TouchableOpacity>
    ),
  });
  btnSave({navigation},changed){
    if(!changed){
      alert("Empty");
      navigation.goBack();
    }else{
      this.itemRef = firebase.database();
      this.itemRef.ref('Notes').child(navigation.state.params.user).child(navigation.state.params._key).remove();
      var key = this.itemRef.ref('Notes').child(navigation.state.params.user).push().key;
      this.itemRef.ref('Notes').child(navigation.state.params.user).child(key).set({
        title: navigation.state.params.title,
        content: navigation.state.params.desc,
        image: navigation.state.params.image == null ? 'none': navigation.state.params.image,
      })
      DeviceEventEmitter.emit('xxx','hihi');
      navigation.goBack();
    }

    //alert("hello")
  }
  componentDidMount() {
        this.props.navigation.setParams({handleSave: this.btnSave});
  }
  onTitleChange(text){
    this.setState({ title: text});
    this.props.navigation.setParams({title: text, changed: true});
  }
  onDescChange(text){
    this.setState({desc: text});
    this.props.navigation.setParams({desc: text,changed: true});
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.textInputContainer}>
         <TextInput
           style={styles.inputTitleStyle}
           placeholder='Note Title...'
           placeholderTextColor='#000'
           returnKeyType='next'
           underlineColorAndroid="transparent"
           onChangeText={(text) => this.onTitleChange(text)}
           value={this.state.title}
         />

         <TextInput
           style={styles.inputDescriptionStyle}
           multiline={true}
           placeholder='Note Description...'
           placeholderTextColor='#000'
           returnKeyType='done'
           underlineColorAndroid="transparent"
           onChangeText={(text) => this.onDescChange(text)}
           value={this.state.desc}
         />
       </View>
       <View style={{flex: 3}}>
       {
        (()=>{
          switch (this.state.avatarSource) {
            case null:
               return null
             case '':
               return <ActivityIndicator/>
            default:
              return(
                <View>
                  <Text>
                    {this.state.avatarSource}
                  </Text>
                 <Image source={{uri: this.state.avatarSource}} style={styles.uploadAvatar} />
                 </View>
              )
            }
          })()
        }
         <TouchableOpacity style={styles.camera} onPress={()=>{this.pickImage()}}>
          <Image
            style={styles.icon}
            source={require('../images/camera.png')}
          />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
