/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';

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
      //console.log(url);
      resolve(url)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

export default class whatever extends Component {
  constructor(props){
    super(props);
    this.state ={
     //avatarSource: null
    }
  }
  Logout(){
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center',}}>
          <Text style={styles.text}>
            1412175 Trần Hiệp
          </Text>
          <Text style={styles.text}>
            1412240 Bùi Đình Khánh
          </Text>
        </View>
      </View>
    );
  }
  /*pickImage(){
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({avatarSource: ''})
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
              uploadImage(response.uri)
              .then(url=>this.setState({avatarSource: url}))
              .catch(error=> console.log(error))
            }
        });
    }
  render() {
    return (
      <View style={styles.container}>
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
               <Image source={{uri: this.state.avatarSource}} style={{height: 100, width: 100}} />
               <Text>
                 {this.state.avatarSource}
               </Text>
               </View>
             )
         }
       })()
      }
        <TouchableHighlight onPress={()=>{this.pickImage()}}>
          <Text style={styles.text}>
            Upload file 1
          </Text>
        </TouchableHighlight>
      </View>
    );
  }*/
}
