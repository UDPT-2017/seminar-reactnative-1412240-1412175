import {StackNavigator} from 'react-navigation';
import home from './home';
import singleNote from './singleNote';
import newNote from './newNote';


export default app = StackNavigator({
  home: {
    screen: home,
    navigationOptions: ({navigation}) => ({
       headerStyle: {
         backgroundColor: "#ff99cc",
       },
       headerTitleStyle: {
         marginLeft: 30,
         color: "#ffffff"
       },
   }),
  },
  singleNote: {
    screen: singleNote,
    navigationOptions: ({navigation}) => ({
     headerStyle: {
       backgroundColor: "#ff99cc",
     },
     headerTitleStyle: {
       marginLeft: 30,
       color: "#ffffff"
     },
   }),
  },
  newNote: {
    screen: newNote,
    navigationOptions: ({navigation}) => ({
     headerStyle: {
       backgroundColor: "#ff99cc",
     },
     headerTitleStyle: {
       marginLeft: 30,
       color: "#ffffff"
     },
   }),
  },
})
