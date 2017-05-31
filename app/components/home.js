/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity ,
  Image,
  ListView,
  DeviceEventEmitter,

} from 'react-native';

import styles from '../styles/styles';
import firebase from '../config/firebase';
import {StackNavigator} from 'react-navigation';

export default class home extends Component {
  constructor(props){
    super(props);
    this.itemRef = firebase.database();
    this.state ={
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),

    }
  }
  viewNote(rowData){
    this.props.navigation.navigate('singleNote',{title: rowData.title,content: rowData.content,_key: rowData._key, image: rowData.image, user:  this.props.navigation.state.params.username})
  }
  static navigationOptions = ({ navigation }) => ({
   title: `Home`,
   headerLeft: null,
   headerRight: (
     <TouchableOpacity style={{marginRight: 10,}} onPress={()=> navigation.navigate('newNote',{user: navigation.state.params.username})}>
      <Image
        style={styles.icon}
        source={require('../images/add.png')}
      />
    </TouchableOpacity>
    ),
  });
  listenForItems(itemRef){
    console.ignoredYellowBox = ['Setting a timer'];
    var items = [];
    this.itemRef.ref('Notes').child(this.props.navigation.state.params.username).on('child_added',(dataSnapshot)=>{
       items.push({
         content: dataSnapshot.val().content == 'none'? null : dataSnapshot.val().content,
         title: dataSnapshot.val().title == 'none'? null :dataSnapshot.val().title,
         image: dataSnapshot.val().image == 'none'? null : dataSnapshot.val().image,
         _key: dataSnapshot.key
       });
       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(items)
       })
    });
    this.itemRef.ref('Notes').child(this.props.navigation.state.params.username).on('child_removed',(dataSnapshot)=>{
       items = items.filter((x)=> x._key != dataSnapshot.key)
       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(items)
       })
    });
  }
  removeNote(rowData){
    Alert.alert(
     'Delete Note',
     'Do you want to delete this note?',
     [
       { text: 'No' },
       { text: 'YES', onPress: () => this.deleteNote(rowData._key) }
     ]
   )
  }
  deleteNote(noteID){
    this.itemRef.ref('Notes').child(this.props.navigation.state.params.username).child(noteID).remove();
    this.listenForItems(this.itemRef);
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData) =>
            <TouchableOpacity  onPress={()=>this.viewNote(rowData)} onLongPress={()=>this.removeNote(rowData)}>
              <View style={{borderWidth:1, borderColor: "#ff80bf", paddingLeft: 10,paddingRight: 10,paddingTop: 15,paddingBottom: 15}}>
                <Text style={{fontFamily: 'Lato-Regular', fontSize: 16,fontWeight: 'bold'}}>{rowData.title}</Text>
                <Text style={{fontFamily: 'Lato-Regular', fontSize: 14}}>{rowData.content}</Text>
                <Image source={{uri: rowData.image}} style={{width: 30, height: 30}}/>
              </View>
            </TouchableOpacity >
          }
        />
      </View>
    );
  }
  componentDidMount(){
    this.listenForItems(this.itemRef);
    DeviceEventEmitter.addListener('xxx', ()=> this.listenForItems(this.itemRef));
  }

}
