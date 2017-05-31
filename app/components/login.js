/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from 'react-native';

import {StackNavigator} from 'react-navigation';

import styles from '../styles/styles';
import firebase from '../config/firebase';

import home from './main';

class Login extends Component {
  constructor(props){
    super(props);
    this.state ={
      username: '',
      password: '',
    }
  }
  //login
  async login() {

    try {
        await firebase.auth()
            .signInWithEmailAndPassword(this.state.username, this.state.password);
        var user = this.state.username.replace(/./g,"1");
            user = user.replace(/@/g,"1");
            user = user.replace(/_/g,"1");
        this.props.navigation.navigate('home',{username: user})

    } catch (error) {
        alert(error.toString())
    }
  }
  //signup
  async signup() {

    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(this.state.username, this.state.password);
        alert('Your account was created!');
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
        alert(error.toString())
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logcontainer}>
            <Image source={require('../images/book_logo.png')} style={styles.logo}/>
        </View>
        <TextInput style={styles.textinput}
                    onChangeText = {(text) =>this.setState({username: text})}
                    value={this.state.username}
                    placeholder={"Username"}
        />
        <TextInput style={styles.textinput}
                    onChangeText = {(text)=>this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Password"}
        />
        <View style={styles.buttoncontainer}>
          <View style={styles.buttoncolumn}>
            <Button
                  onPress= {this.login.bind(this)}
                  title="Login"
                  color="#ff66cc"
                  accessibilityLabel="Learn more about this purple button"
              />
          </View>
          <View style={styles.buttoncolumn}>
            <Button
                  onPress= {this.signup.bind(this)}
                  title="SignUp"
                  color="#ff66cc"
                  accessibilityLabel="Learn more about this purple button"
              />
          </View>
        </View>
      </View>
    );
  }
}

export default app = StackNavigator({
  login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null,
   }),
 },
home: {
    screen: home,
    navigationOptions: ({navigation}) => ({
      header: null,
   }),
 },
})
